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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_dto_1 = require("./dto/login.dto");
const sendResponse_1 = __importDefault(require("../utils/sendResponse"));
const public_decorators_1 = require("../../common/decorators/public.decorators");
const forget_reset_password_dto_1 = require("./dto/forget-reset-password.dto");
const change_password_dto_1 = require("./dto/change-password.dto");
const swagger_1 = require("@nestjs/swagger");
const register_dto_1 = require("./dto/register.dto");
const update_account_dto_1 = require("./dto/update-account.dto");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
const client_1 = require("@prisma/client");
const refresh_token_dto_1 = require("./dto/refresh-token.dto");
const passport_1 = require("@nestjs/passport");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const auth_utils_1 = require("./auth.utils");
let AuthController = class AuthController {
    authService;
    jwtService;
    prisma;
    constructor(authService, jwtService, prisma) {
        this.authService = authService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    googleAuth() { }
    async googleAuthCallback(req, res) {
        try {
            const { user: googleProfile } = req;
            const user = await this.authService.handleGoogleLogin(googleProfile);
            const payload = {
                sub: user.id,
                email: user.email,
                role: user.role,
            };
            const tokens = await (0, auth_utils_1.getTokens)(this.jwtService, user.id, user.email, user.role);
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
            return res.redirect(`${frontendUrl}/auth/callback?token=${tokens.access_token}`);
        }
        catch (error) {
            console.error('Google login error:', error);
            const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3001';
            return res.redirect(`${frontendUrl}/login?error=google_login_failed`);
        }
    }
    async refreshToken(token, res) {
        const result = await this.authService.refreshTokens(token);
        res.cookie('accessToken', result.access_token, {
            httpOnly: false,
            secure: false,
            maxAge: 86400000,
            sameSite: 'none',
        });
        res.cookie('refreshToken', result.refresh_token, {
            httpOnly: false,
            secure: false,
            maxAge: 604800000,
            sameSite: 'none',
        });
        return (0, sendResponse_1.default)(res, {
            statusCode: common_1.HttpStatus.OK,
            success: true,
            message: 'Token refreshed',
            data: result,
        });
    }
    async register(dto, res) {
        const result = await this.authService.register(dto);
        res.cookie('accessToken', result.access_token, {
            httpOnly: false,
            secure: false,
            maxAge: 86400000,
            sameSite: 'none',
        });
        res.cookie('refreshToken', result.refresh_token, {
            httpOnly: false,
            secure: false,
            maxAge: 604800000,
            sameSite: 'none',
        });
        return (0, sendResponse_1.default)(res, {
            statusCode: common_1.HttpStatus.CREATED,
            success: true,
            message: 'Registration successful',
            data: result,
        });
    }
    async login(dto, res) {
        const result = await this.authService.login(dto);
        res.cookie('accessToken', result.access_token, {
            httpOnly: false,
            secure: false,
            maxAge: 86400000,
            sameSite: 'none',
        });
        res.cookie('refreshToken', result.refresh_token, {
            httpOnly: false,
            secure: false,
            maxAge: 604800000,
            sameSite: 'none',
        });
        return (0, sendResponse_1.default)(res, {
            statusCode: common_1.HttpStatus.OK,
            success: true,
            message: 'Login successful',
            data: result,
        });
    }
    async updateAccount(dto, req, res) {
        const result = await this.authService.updateAccount(req.user.id, dto);
        return (0, sendResponse_1.default)(res, {
            statusCode: common_1.HttpStatus.OK,
            success: true,
            message: 'Account Updated successful',
            data: result,
        });
    }
    async updateBirthInfo(dto, req, res) {
        const result = await this.authService.updateBirthInfo(req.user.id, dto);
        return (0, sendResponse_1.default)(res, {
            statusCode: common_1.HttpStatus.OK,
            success: true,
            message: 'Birt Information Updated successful',
            data: result,
        });
    }
    async getAllUsers(res) {
        const users = await this.authService.getAllUsers();
        return (0, sendResponse_1.default)(res, {
            statusCode: common_1.HttpStatus.OK,
            success: true,
            message: 'Users fetched successfully',
            data: users,
        });
    }
    async currentUser(req, res) {
        const users = await this.authService.currentUser(req.user.id);
        return (0, sendResponse_1.default)(res, {
            statusCode: common_1.HttpStatus.OK,
            success: true,
            message: 'User fetched successfully',
            data: users,
        });
    }
    async changePassword(dto, req, res) {
        const result = await this.authService.changePassword(req.user.id, dto);
        return (0, sendResponse_1.default)(res, {
            statusCode: common_1.HttpStatus.OK,
            success: true,
            message: 'Password changed',
            data: result,
        });
    }
    async requestResetCode(dto, res) {
        const result = await this.authService.requestResetCode(dto);
        return (0, sendResponse_1.default)(res, {
            statusCode: common_1.HttpStatus.OK,
            success: true,
            message: 'Reset code sent',
            data: result,
        });
    }
    async verifyResetCode(dto, res) {
        const result = await this.authService.verifyResetCode(dto);
        return (0, sendResponse_1.default)(res, {
            statusCode: common_1.HttpStatus.OK,
            success: true,
            message: 'OTP verified',
            data: result,
        });
    }
    async resetPassword(dto, res) {
        const result = await this.authService.resetPassword(dto);
        return (0, sendResponse_1.default)(res, {
            statusCode: common_1.HttpStatus.OK,
            success: true,
            message: 'Password reset successful',
            data: result,
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorators_1.Public)(),
    (0, common_1.Get)('google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleAuth", null);
__decorate([
    (0, public_decorators_1.Public)(),
    (0, common_1.Get)('google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleAuthCallback", null);
__decorate([
    (0, public_decorators_1.Public)(),
    (0, common_1.Post)('refresh-token'),
    (0, swagger_1.ApiOperation)({
        summary: 'Refresh JWT tokens',
        description: 'Refreshes the access token using the provided refresh token.',
    }),
    (0, swagger_1.ApiBody)({
        description: 'Refresh token for refreshing access token',
        type: refresh_token_dto_1.RefreshTokenDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Token refreshed successfully.',
    }),
    __param(0, (0, common_1.Body)('refreshToken')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, public_decorators_1.Public)(),
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, public_decorators_1.Public)(),
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Put)('update-account'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_account_dto_1.UserUpdateDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateAccount", null);
__decorate([
    (0, common_1.Put)('update-birthinfo'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_account_dto_1.UserBirthUpdateDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateBirthInfo", null);
__decorate([
    (0, common_1.Get)('all'),
    (0, roles_decorator_1.Roles)(client_1.userRole.ADMIN),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getAllUsers", null);
__decorate([
    (0, common_1.Get)('current-user'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "currentUser", null);
__decorate([
    (0, common_1.Patch)('change-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.ChangePasswordDto, Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, public_decorators_1.Public)(),
    (0, common_1.Post)('request-reset-code'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forget_reset_password_dto_1.RequestResetCodeDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "requestResetCode", null);
__decorate([
    (0, public_decorators_1.Public)(),
    (0, common_1.Post)('verify-reset-code'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forget_reset_password_dto_1.VerifyResetCodeDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyResetCode", null);
__decorate([
    (0, public_decorators_1.Public)(),
    (0, common_1.Post)('reset-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forget_reset_password_dto_1.ResetPasswordDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService, jwt_1.JwtService, prisma_service_1.PrismaService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map