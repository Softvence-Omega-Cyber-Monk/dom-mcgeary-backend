import { PrismaService } from 'src/module/prisma/prisma.service';
import { PartnerInfoCreateDto, PartnerInfoUpdateDto } from './dto/partnerifno.dto';
export declare class PartnerService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrUpdatePartner(userId: string, dto: PartnerInfoCreateDto | PartnerInfoUpdateDto): Promise<{
        partner: {
            id: string;
            createdAt: Date;
            name: string;
            birthDate: string;
            birthTime: string;
            birthLocation: string;
            updatedAt: Date;
            relationType: import("@prisma/client").$Enums.relationType;
            userId: string;
        };
        message: string;
    }>;
}
