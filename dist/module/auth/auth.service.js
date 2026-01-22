"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const bcrypt = __importStar(require("bcrypt"));
const crypto_1 = require("crypto");
const jwt_1 = require("@nestjs/jwt");
const auth_utils_1 = require("./auth.utils");
const mailer_1 = require("@nestjs-modules/mailer");
const client_1 = require("@prisma/client");
let AuthService = class AuthService {
    prisma;
    jwtService;
    mailerService;
    constructor(prisma, jwtService, mailerService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.mailerService = mailerService;
    }
    async handleGoogleLogin(googleProfile) {
        const { googleId, email, fullName, profileImage } = googleProfile;
        let user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    googleId,
                    email,
                    fullName,
                    profileImage,
                    password: await bcrypt.hash((0, crypto_1.randomBytes)(32).toString('hex'), 10),
                    role: 'USER',
                    isActive: false,
                    isDeleted: false,
                },
            });
        }
        else if (!user.googleId) {
            user = await this.prisma.user.update({
                where: { id: user.id },
                data: { googleId },
            });
        }
        if (profileImage && user.profileImage !== profileImage) {
            user = await this.prisma.user.update({
                where: { id: user.id },
                data: { profileImage },
            });
        }
        return user;
    }
    async register(dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (existingUser) {
            throw new common_1.BadRequestException('Email is already registered!');
        }
        if (!dto.fullName || !dto.email || !dto.password) {
            throw new common_1.BadRequestException('Invalid Credentials!');
        }
        const hashedPassword = await bcrypt.hash(dto.password, parseInt(process.env.SALT_ROUND));
        const newUser = await this.prisma.user.create({
            data: {
                fullName: dto.fullName,
                email: dto.email,
                password: hashedPassword,
                isActive: true,
                role: client_1.userRole.PRO_USER
            },
        });
        const tokens = await (0, auth_utils_1.getTokens)(this.jwtService, newUser.id, newUser.email, newUser.role);
        return { user: newUser, ...tokens };
    }
    async login(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user || !dto.password) {
            throw new common_1.ForbiddenException('Invalid credentials');
        }
        if (!user.isActive) {
            throw new common_1.ForbiddenException('Your account is not Active yet!');
        }
        if (user.isDeleted) {
            throw new common_1.BadRequestException('User is deleted!');
        }
        const isMatch = await bcrypt.compare(dto.password, user.password);
        if (!isMatch) {
            throw new common_1.ForbiddenException('Invalid credentials');
        }
        const tokens = await (0, auth_utils_1.getTokens)(this.jwtService, user.id, user.email, user.role);
        return { user, ...tokens };
    }
    async refreshTokens(token) {
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: process.env.REFRESH_TOKEN_SECRET,
            });
            const user = await this.prisma.user.findUnique({ where: { email: payload.email } });
            if (!user)
                throw new common_1.UnauthorizedException('Invalid refresh token');
            return (0, auth_utils_1.getTokens)(this.jwtService, user.id, user.email, user.role);
        }
        catch {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
    }
    async changePassword(id, dto) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user || !user.password) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.isDeleted) {
            throw new common_1.BadRequestException('The account is deleted!');
        }
        const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
        if (!isMatch) {
            throw new common_1.BadRequestException('Old password is incorrect');
        }
        const hashed = await bcrypt.hash(dto.newPassword, parseInt(process.env.SALT_ROUND));
        await this.prisma.user.update({
            where: { id },
            data: { password: hashed },
        });
        return { message: 'Password changed successfully' };
    }
    async getAllUsers() {
        const users = await this.prisma.user.findMany({
            select: {
                fullName: true,
                email: true,
                role: true,
                isActive: true,
            },
        });
        return users;
    }
    async updateAccount(id, dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { id: id },
        });
        if (!existingUser) {
            throw new common_1.BadRequestException('User not Found');
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: id },
            data: {
                ...dto,
            },
        });
        return { user: updatedUser };
    }
    async currentUser(id) {
        const existingUser = await this.prisma.user.findUnique({
            where: { id: id },
        });
        if (!existingUser) {
            throw new common_1.BadRequestException('User not Found');
        }
        return { user: existingUser };
    }
    async updateBirthInfo(id, dto) {
        const existingUser = await this.prisma.user.findUnique({
            where: { id: id },
        });
        if (!existingUser) {
            throw new common_1.BadRequestException('User not Found');
        }
        if (!dto.birthDate || !dto.birthLocation || !dto.birthTime) {
            throw new common_1.BadRequestException('Invalid Credintials');
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: id },
            data: {
                ...dto,
            },
        });
        return { user: updatedUser };
    }
    async requestResetCode(dto) {
        const user = await this.prisma.user.findUnique({
            where: { email: dto.email },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        if (user.isDeleted) {
            throw new common_1.BadRequestException('The account is deleted!');
        }
        const code = (0, auth_utils_1.generateOtpCode)();
        const hashedCode = await (0, auth_utils_1.hashOtpCode)(code);
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        await this.prisma.otpCode.create({
            data: { email: dto.email, code: hashedCode, expiresAt },
        });
        await this.mailerService.sendMail({
            to: dto.email,
            subject: 'Reset Password Code',
            text: `Your OTP code is ${code}. It will expire in 5 minutes.`,
        });
        return { message: 'Reset code sent' };
    }
    async verifyResetCode(dto) {
        return (0, auth_utils_1.verifyOtp)(this.prisma, dto.email, dto.code);
    }
    async resetPassword(dto) {
        if (dto.password !== dto.confirmPassword) {
            throw new common_1.BadRequestException("Passwords don't match");
        }
        const verified = await this.prisma.otpCode.findFirst({
            where: { email: dto.email, verified: true },
            orderBy: { createdAt: 'desc' },
        });
        if (!verified) {
            throw new common_1.BadRequestException('OTP not verified');
        }
        const hashed = await bcrypt.hash(dto.password, parseInt(process.env.SALT_ROUND));
        await this.prisma.user.update({
            where: { email: dto.email },
            data: { password: hashed },
        });
        await this.prisma.otpCode.deleteMany({ where: { email: dto.email } });
        return { message: 'Password reset successful' };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        mailer_1.MailerService])
], AuthService);
//# sourceMappingURL=auth.service.js.map