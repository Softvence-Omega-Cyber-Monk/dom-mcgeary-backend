import Stripe from 'stripe';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePlanDto } from './dto/strpe.dto';
export declare class StripeService {
    private readonly prisma;
    private stripeClient;
    constructor(prisma: PrismaService);
    createSubscriptionProductAndPrice(productName: string, amount: number, currency?: string, interval?: 'month' | 'year', description?: string, features?: string[], isPopular?: boolean): Promise<{
        productId: string;
        priceId: string;
        planId: string;
        plan: {
            description: string | null;
            id: string;
            createdAt: Date;
            name: string;
            updatedAt: Date;
            currency: string;
            interval: string;
            features: import("@prisma/client/runtime/library").JsonValue;
            isPopular: boolean;
            priceCents: number;
            stripeProductId: string | null;
            stripePriceId: string | null;
        };
    }>;
    createCheckoutSession(userId: string, priceId: string, successUrl: string, cancelUrl: string): Promise<Stripe.Response<Stripe.Checkout.Session>>;
    findAllPlans(): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        currency: string;
        interval: string;
        features: import("@prisma/client/runtime/library").JsonValue;
        isPopular: boolean;
        priceCents: number;
        stripeProductId: string | null;
        stripePriceId: string | null;
    }[]>;
    updatePlan(id: string, updateData: UpdatePlanDto): Promise<{
        description: string | null;
        id: string;
        createdAt: Date;
        name: string;
        updatedAt: Date;
        currency: string;
        interval: string;
        features: import("@prisma/client/runtime/library").JsonValue;
        isPopular: boolean;
        priceCents: number;
        stripeProductId: string | null;
        stripePriceId: string | null;
    }>;
    handleWebhookEvent(signature: string, payload: Buffer): Promise<{
        received: boolean;
    }>;
    private handleCheckoutSessionCompleted;
    private handleSubscriptionEvent;
    findAllSubscriptions(): Promise<({
        user: {
            email: string;
            id: string;
            fullName: string;
        };
    } & {
        id: string;
        userId: string;
        status: string;
        stripeSubscriptionId: string | null;
        startedAt: Date;
        endedAt: Date | null;
        planId: string;
    })[]>;
    findSubscriptionById(subscriptionId: string): Promise<({
        user: {
            email: string;
            id: string;
            fullName: string;
        };
    } & {
        id: string;
        userId: string;
        status: string;
        stripeSubscriptionId: string | null;
        startedAt: Date;
        endedAt: Date | null;
        planId: string;
    }) | null>;
}
