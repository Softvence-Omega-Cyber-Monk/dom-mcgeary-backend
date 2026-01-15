export declare class CreateProductDto {
    name: string;
    description?: string;
    amount: number;
    currency?: string;
    interval?: 'month' | 'year';
    features?: string[];
    isPopular?: boolean;
}
export declare class UpdatePlanDto {
    name?: string;
    description?: string;
    priceCents?: number;
    currency?: string;
    features?: string[];
    isPopular?: boolean;
}
export declare class CreateCheckoutSessionDto {
    priceId: string;
}
