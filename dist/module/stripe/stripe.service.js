"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const stripe_1 = __importDefault(require("stripe"));
const prisma_service_1 = require("../prisma/prisma.service");
let StripeService = class StripeService {
    prisma;
    stripeClient;
    constructor(prisma) {
        this.prisma = prisma;
        const secretKey = process.env.STRIPE_SECRET_KEY;
        if (!secretKey) {
            throw new Error('STRIPE_SECRET_KEY is not defined in environment variables');
        }
        this.stripeClient = new stripe_1.default(secretKey, {
            apiVersion: '2025-12-15.clover',
        });
    }
    async createSubscriptionProductAndPrice(productName, amount, currency = 'usd', interval = 'month', description, features = [], isPopular = false) {
        try {
            const product = await this.stripeClient.products.create({
                name: productName,
                description: description || undefined,
                metadata: {
                    created_by: 'your-app',
                    internal_plan_name: productName,
                },
            });
            const price = await this.stripeClient.prices.create({
                product: product.id,
                unit_amount: amount * 100,
                currency,
                recurring: { interval },
            });
            const plan = await this.prisma.plan.create({
                data: {
                    name: productName,
                    description: description || '',
                    priceCents: amount,
                    currency,
                    interval,
                    features: features,
                    isPopular,
                    stripeProductId: product.id,
                    stripePriceId: price.id,
                },
            });
            return {
                productId: product.id,
                priceId: price.id,
                planId: plan.id,
                plan,
            };
        }
        catch (error) {
            console.error('Error creating product/price/plan:', error);
            throw new Error('Failed to create plan and sync with Stripe');
        }
    }
    async createCheckoutSession(userId, priceId, successUrl, cancelUrl) {
        const session = await this.stripeClient.checkout.sessions.create({
            mode: 'subscription',
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            client_reference_id: userId,
            success_url: successUrl,
            cancel_url: cancelUrl,
            allow_promotion_codes: true,
        });
        return session;
    }
    async findAllPlans() {
        return this.prisma.plan.findMany({
            orderBy: { createdAt: 'asc' },
        });
    }
    async updatePlan(id, updateData) {
        const existingPlan = await this.prisma.plan.findUnique({
            where: { id },
        });
        if (!existingPlan) {
            throw new common_1.HttpException('Plan not found', common_1.HttpStatus.NOT_FOUND);
        }
        const priceChanged = (updateData.priceCents !== undefined && updateData.priceCents !== existingPlan.priceCents) ||
            (updateData.currency !== undefined && updateData.currency !== existingPlan.currency);
        let newStripePriceId = existingPlan.stripePriceId;
        if (priceChanged) {
            if (!existingPlan.stripeProductId) {
                throw new Error('Cannot update price: missing stripeProductId');
            }
            const newPrice = await this.stripeClient.prices.create({
                product: existingPlan.stripeProductId,
                unit_amount: updateData.priceCents ?? existingPlan.priceCents,
                currency: updateData.currency ?? existingPlan.currency,
                recurring: {
                    interval: existingPlan.interval,
                },
            });
            if (existingPlan.stripePriceId) {
                await this.stripeClient.prices.update(existingPlan.stripePriceId, {
                    active: false,
                });
            }
            newStripePriceId = newPrice.id;
        }
        const updatedPlan = await this.prisma.plan.update({
            where: { id },
            data: {
                name: updateData.name,
                description: updateData.description,
                priceCents: updateData.priceCents,
                currency: updateData.currency,
                features: updateData.features,
                isPopular: updateData.isPopular,
                stripePriceId: newStripePriceId,
                updatedAt: new Date(),
            },
        });
        return updatedPlan;
    }
    async handleWebhookEvent(signature, payload) {
        let event;
        try {
            const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
            if (!webhookSecret) {
                throw new Error('STRIPE_WEBHOOK_SECRET is not defined in environment variables');
            }
            event = this.stripeClient.webhooks.constructEvent(payload.toString(), signature, webhookSecret);
        }
        catch (err) {
            throw new Error(`Webhook signature verification failed: ${err.message}`);
        }
        switch (event.type) {
            case 'checkout.session.completed':
                await this.handleCheckoutSessionCompleted(event.data.object);
                break;
            case 'customer.subscription.created':
            case 'customer.subscription.updated':
            case 'customer.subscription.deleted':
                await this.handleSubscriptionEvent(event.data.object);
                break;
            default:
                console.log(`Unhandled event type: ${event.type}`);
        }
        return { received: true };
    }
    async handleCheckoutSessionCompleted(session) {
        const userId = session.client_reference_id;
        const customerId = session.customer;
        const subscriptionId = session.subscription;
        console.log('Checkout completed for user:', userId);
    }
    async handleSubscriptionEvent(subscription) {
        const customerId = subscription.customer;
        const status = subscription.status;
        const planId = subscription.items.data[0].price.product;
        console.log('Subscription updated:', subscription.id, status);
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StripeService);
//# sourceMappingURL=stripe.service.js.map