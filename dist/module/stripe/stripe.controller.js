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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StripeController = void 0;
const common_1 = require("@nestjs/common");
const stripe_service_1 = require("./stripe.service");
const swagger_1 = require("@nestjs/swagger");
const strpe_dto_1 = require("./dto/strpe.dto");
const public_decorators_1 = require("../../common/decorators/public.decorators");
let StripeController = class StripeController {
    stripeService;
    constructor(stripeService) {
        this.stripeService = stripeService;
    }
    async createProductAndPrice(dto) {
        try {
            const { name, description, amount, currency = 'usd', interval = 'month', features = [], isPopular = false, } = dto;
            if (!name || amount <= 0) {
                throw new common_1.HttpException('Name and valid amount (in cents) are required', common_1.HttpStatus.BAD_REQUEST);
            }
            const result = await this.stripeService.createSubscriptionProductAndPrice(name, amount, currency, interval, description, features, isPopular);
            return {
                success: true,
                message: 'Plan created successfully',
                plan: result.plan,
                stripe: {
                    productId: result.productId,
                    priceId: result.priceId,
                },
            };
        }
        catch (error) {
            console.error('Error creating plan:', error);
            throw new common_1.HttpException(error.message || 'Failed to create plan and sync with Stripe', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createCheckoutSession(req) {
        const userId = req.user.id;
        const successUrl = `${process.env.FRONTEND_URL}/subscription-success`;
        const cancelUrl = `${process.env.FRONTEND_URL}/subscription-cancel`;
        const priceId = process.env.STRIPE_MONTHLY_PRICE_ID;
        console.log('fds', userId, successUrl, cancelUrl, priceId);
        const session = await this.stripeService.createCheckoutSession(userId, priceId, successUrl, cancelUrl);
        console.log(session);
        return { sessionId: session.id };
    }
    async findAllPlans() {
        try {
            const plans = await this.stripeService.findAllPlans();
            return {
                success: true,
                data: plans,
            };
        }
        catch (error) {
            console.error('Error fetching plans:', error);
            throw new common_1.HttpException('Failed to fetch plans', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async updatePlan(id, dto) {
        try {
            const updatedPlan = await this.stripeService.updatePlan(id, dto);
            return {
                success: true,
                message: 'Plan updated successfully',
                plan: updatedPlan,
            };
        }
        catch (error) {
            console.error('Error updating plan:', error);
            if (error instanceof common_1.HttpException)
                throw error;
            throw new common_1.HttpException(error.message || 'Failed to update plan', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async webhook(req, res) {
        const sig = req.headers['stripe-signature'];
        const rawBody = req.body;
        console.log(rawBody, 'fasdfasdfsdaf');
        try {
            await this.stripeService.handleWebhookEvent(sig, rawBody);
            res.status(200).json({ received: true });
        }
        catch (err) {
            console.error('Webhook error:', err.message);
            res.status(400).send(`Webhook Error: ${err.message}`);
        }
    }
};
exports.StripeController = StripeController;
__decorate([
    (0, public_decorators_1.Public)(),
    (0, common_1.Post)('product-and-price'),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Plan created and synced with Stripe' }),
    (0, swagger_1.ApiBody)({ type: strpe_dto_1.CreateProductDto }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [strpe_dto_1.CreateProductDto]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createProductAndPrice", null);
__decorate([
    (0, common_1.Post)('create-checkout-session'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "createCheckoutSession", null);
__decorate([
    (0, public_decorators_1.Public)(),
    (0, common_1.Get)('plans'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all subscription plans' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "findAllPlans", null);
__decorate([
    (0, public_decorators_1.Public)(),
    (0, common_1.Patch)('plans/:id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Plan updated successfully' }),
    (0, swagger_1.ApiBody)({ type: strpe_dto_1.UpdatePlanDto }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, strpe_dto_1.UpdatePlanDto]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "updatePlan", null);
__decorate([
    (0, public_decorators_1.Public)(),
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], StripeController.prototype, "webhook", null);
exports.StripeController = StripeController = __decorate([
    (0, common_1.Controller)('stripe'),
    __metadata("design:paramtypes", [stripe_service_1.StripeService])
], StripeController);
//# sourceMappingURL=stripe.controller.js.map