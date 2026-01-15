import { HttpStatus } from '@nestjs/common';
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
    getAllSubscriptions(req: Request): Promise<{
        statusCode: HttpStatus;
        data: ({
            user: {
                email: string;
                id: string;
            };
        } & {
            id: string;
            userId: string;
            status: string;
            stripeSubscriptionId: string | null;
            startedAt: Date;
            endedAt: Date | null;
            planId: string;
        })[];
        count: number;
    }>;
    getUserSubscriptions(req: Request): Promise<{
        statusCode: HttpStatus;
        data: {
            id: string;
            userId: string;
            status: string;
            stripeSubscriptionId: string | null;
            startedAt: Date;
            endedAt: Date | null;
            planId: string;
        }[];
        count: number;
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
