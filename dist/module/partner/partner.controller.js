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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartnerController = void 0;
const common_1 = require("@nestjs/common");
const partner_service_1 = require("./partner.service");
const partnerifno_dto_1 = require("./dto/partnerifno.dto");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const swagger_1 = require("@nestjs/swagger");
let PartnerController = class PartnerController {
    partnerService;
    constructor(partnerService) {
        this.partnerService = partnerService;
    }
    async updatePartner(dto, req, res) {
        const result = await this.partnerService.createOrUpdatePartner(req.user.id, dto);
        return (0, sendResponse_1.default)(res, {
            statusCode: common_1.HttpStatus.OK,
            success: true,
            message: result.message,
            data: result.partner,
        });
    }
};
exports.PartnerController = PartnerController;
__decorate([
    (0, common_1.Put)('create-or-update-partner'),
    (0, swagger_1.ApiOperation)({ summary: 'Create or update partner information' }),
    (0, swagger_1.ApiBody)({
        description: 'Create or update partner details',
        type: partnerifno_dto_1.PartnerInfoCreateDto,
        examples: {
            create: {
                value: {
                    name: 'John Doe',
                    birthDate: '1990-01-01',
                    birthTime: '08:00',
                    birthLocation: 'New York',
                    relationType: 'WIFE',
                    userId: 'user-uuid-1234',
                },
            },
            update: {
                value: {
                    name: 'Jane Doe',
                    birthDate: '1991-05-15',
                    birthTime: '10:30',
                    birthLocation: 'Los Angeles',
                    relationType: 'GIRL_FRIEND',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], PartnerController.prototype, "updatePartner", null);
exports.PartnerController = PartnerController = __decorate([
    (0, common_1.Controller)('partner'),
    __metadata("design:paramtypes", [partner_service_1.PartnerService])
], PartnerController);
//# sourceMappingURL=partner.controller.js.map