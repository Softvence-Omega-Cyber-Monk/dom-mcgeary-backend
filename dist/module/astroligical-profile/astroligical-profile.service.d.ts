import { PrismaService } from '../prisma/prisma.service';
import { CreateAstrologicalProfileDto } from './dto/asroligical-profile.dto';
export declare class AstroligicalProfileService {
    private prisma;
    constructor(prisma: PrismaService);
    createOrUpdateAstrologicalProfile(userId: string, dto: CreateAstrologicalProfileDto): Promise<{
        astrologicalProfile: {
            id: string;
            result: import("@prisma/client/runtime/library").JsonValue | null;
            userId: string | null;
            birth_date: string | null;
            birth_time: string | null;
            birth_location: string | null;
            western_sign: string | null;
            chinese_sign: string | null;
            roadmap_overview: import("@prisma/client/runtime/library").JsonValue | null;
        };
        message: string;
    }>;
    getAstrologicalProfile(userId: string): Promise<{
        astrologicalProfile: {
            id: string;
            result: import("@prisma/client/runtime/library").JsonValue | null;
            userId: string | null;
            birth_date: string | null;
            birth_time: string | null;
            birth_location: string | null;
            western_sign: string | null;
            chinese_sign: string | null;
            roadmap_overview: import("@prisma/client/runtime/library").JsonValue | null;
        };
        message: string;
    }>;
}
