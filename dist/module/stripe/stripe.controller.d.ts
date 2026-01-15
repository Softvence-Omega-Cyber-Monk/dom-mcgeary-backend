import type { Request, Response } from 'express';
import { StripeService } from './stripe.service';
import { CreateCheckoutSessionDto, CreateProductDto, UpdatePlanDto } from './dto/strpe.dto';
export declare class StripeController {
    private readonly stripeService;
    constructor(stripeService: StripeService);
    createProductAndPrice(dto: CreateProductDto): Promise<{
        success: boolean;
        message: string;
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
        stripe: {
            productId: string;
            priceId: string;
        };
    }>;
    createCheckoutSession(req: Request, dto: CreateCheckoutSessionDto): Promise<{
        success: boolean;
        url: string | null;
    }>;
    findAllPlans(): Promise<{
        success: boolean;
        data: {
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
        }[];
    }>;
    updatePlan(id: string, dto: UpdatePlanDto): Promise<{
        success: boolean;
        message: string;
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
    webhook(req: Request, res: Response): Promise<void>;
}
