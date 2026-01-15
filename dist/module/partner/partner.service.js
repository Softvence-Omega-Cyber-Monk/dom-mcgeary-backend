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
exports.PartnerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let PartnerService = class PartnerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createOrUpdatePartner(userId, dto) {
        const existingPartner = await this.prisma.partnerInfo.findUnique({
            where: { userId: userId },
        });
        if (existingPartner) {
            const updatedPartner = await this.prisma.partnerInfo.update({
                where: { userId: userId },
                data: { ...dto },
            });
            return { partner: updatedPartner, message: "Partner Updated Successfully" };
        }
        if (!dto.birthDate ||
            !dto.birthLocation ||
            !dto.birthTime ||
            !dto.name ||
            !dto.relationType) {
            throw new common_1.BadRequestException('Invalid Credentials!');
        }
        const newPartner = await this.prisma.partnerInfo.create({
            data: {
                name: dto.name,
                userId: userId,
                birthDate: dto.birthDate,
                birthTime: dto.birthTime,
                birthLocation: dto.birthLocation,
                relationType: dto.relationType,
            },
        });
        return { partner: newPartner, message: "Partner Created Successfully" };
    }
};
exports.PartnerService = PartnerService;
exports.PartnerService = PartnerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PartnerService);
//# sourceMappingURL=partner.service.js.map