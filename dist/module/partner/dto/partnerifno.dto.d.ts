import { relationType } from '@prisma/client';
export declare class PartnerInfoCreateDto {
    name: string;
    birthDate: string;
    birthTime: string;
    birthLocation: string;
    relationType: relationType;
}
export declare class PartnerInfoUpdateDto {
    name?: string;
    birthDate?: string;
    birthTime?: string;
    birthLocation?: string;
    relationType?: relationType;
}
