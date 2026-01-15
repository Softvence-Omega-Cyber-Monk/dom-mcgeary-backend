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
exports.AstroligicalProfileController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const asroligical_profile_dto_1 = require("./dto/asroligical-profile.dto");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const astroligical_profile_service_1 = require("./astroligical-profile.service");
let AstroligicalProfileController = class AstroligicalProfileController {
    AstroligicalProfileService;
    constructor(AstroligicalProfileService) {
        this.AstroligicalProfileService = AstroligicalProfileService;
    }
    async createAstroligicalProfile(dto, req, res) {
        const result = await this.AstroligicalProfileService.createOrUpdateAstrologicalProfile(req.user.id, dto);
        return (0, sendResponse_1.default)(res, {
            statusCode: common_1.HttpStatus.OK,
            success: true,
            message: result.message,
            data: result.astrologicalProfile,
        });
    }
    async getAastrologicanProfile(req, res) {
        const result = await this.AstroligicalProfileService.getAstrologicalProfile(req.user.id);
        return (0, sendResponse_1.default)(res, {
            statusCode: common_1.HttpStatus.OK,
            success: true,
            message: result.message,
            data: result.astrologicalProfile,
        });
    }
};
exports.AstroligicalProfileController = AstroligicalProfileController;
__decorate([
    (0, common_1.Post)('create-astroligical-profile'),
    (0, swagger_1.ApiOperation)({ summary: 'Create  astroligical-profile' }),
    (0, swagger_1.ApiBody)({
        description: 'Create an astrological profile with optional fields.',
        type: asroligical_profile_dto_1.CreateAstrologicalProfileDto,
    }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [asroligical_profile_dto_1.CreateAstrologicalProfileDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AstroligicalProfileController.prototype, "createAstroligicalProfile", null);
__decorate([
    (0, common_1.Get)('get-astroloigical-profile'),
    (0, swagger_1.ApiOperation)({ summary: 'get astrologicalProfile  information' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AstroligicalProfileController.prototype, "getAastrologicanProfile", null);
exports.AstroligicalProfileController = AstroligicalProfileController = __decorate([
    (0, common_1.Controller)('astroligical-profile'),
    __metadata("design:paramtypes", [astroligical_profile_service_1.AstroligicalProfileService])
], AstroligicalProfileController);
//# sourceMappingURL=astroligical-profile.controller.js.map