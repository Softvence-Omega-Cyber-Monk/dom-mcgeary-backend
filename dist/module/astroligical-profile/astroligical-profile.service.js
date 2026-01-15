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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AstroligicalProfileService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AstroligicalProfileService = class AstroligicalProfileService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrUpdateAstrologicalProfile(userId, dto) {
        const existingPartner = await this.prisma.astrologicalProfile.findUnique({
            where: { userId: userId },
        });
        if (existingPartner) {
            throw new common_1.BadRequestException('astrological profile already exists for this user');
        }
        if (!userId) {
            throw new common_1.BadRequestException('Missing userId');
        }
        const data = {
            birth_date: dto.birth_date ?? dto.birth_date,
            birth_time: dto.birth_time ?? dto.birth_time,
            birth_location: dto.birth_location ?? dto.birth_location,
            western_sign: dto.western_sign ?? dto.western_sign,
            chinese_sign: dto.chinese_sign ?? dto.chinese_sign,
            result: dto.result ?? undefined,
            roadmap_overview: dto.roadmap_overview ?? dto.roadmap_overview ?? undefined,
            userId: userId,
        };
        const newAstrologicalProfile = await this.prisma.astrologicalProfile.create({
            data,
        });
        return {
            astrologicalProfile: newAstrologicalProfile,
            message: 'Astrological profile created successfully',
        };
    }
    async getAstrologicalProfile(userId) {
        const existingPartner = await this.prisma.astrologicalProfile.findUnique({
            where: { userId: userId },
        });
        if (!existingPartner) {
            throw new common_1.BadRequestException('Astrological profile does not exist for this user');
        }
        return {
            astrologicalProfile: existingPartner,
            message: 'Partner Retrieved Successfully',
        };
    }
};
exports.AstroligicalProfileService = AstroligicalProfileService;
exports.AstroligicalProfileService = AstroligicalProfileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AstroligicalProfileService);
//# sourceMappingURL=astroligical-profile.service.js.map