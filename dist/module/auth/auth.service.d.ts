import { PrismaService } from 'src/module/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RequestResetCodeDto, ResetPasswordDto, VerifyResetCodeDto } from './dto/forget-reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { RegisterDto } from './dto/register.dto';
import { UserBirthUpdateDto, UserUpdateDto } from './dto/update-account.dto';
export declare class AuthService {
    private prisma;
    private jwtService;
    private mailerService;
    constructor(prisma: PrismaService, jwtService: JwtService, mailerService: MailerService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            email: string;
            password: string;
            id: string;
            role: import("@prisma/client").$Enums.userRole;
            createdAt: Date;
            fullName: string;
            birthDate: string | null;
            birthTime: string | null;
            birthLocation: string | null;
            timeZone: string | null;
            phone: string | null;
            profileImage: string | null;
            stripeCustomerId: string | null;
            isActive: boolean;
            isDeleted: boolean;
            updatedAt: Date;
        };
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        refresh_token: string;
        user: {
            email: string;
            password: string;
            id: string;
            role: import("@prisma/client").$Enums.userRole;
            createdAt: Date;
            fullName: string;
            birthDate: string | null;
            birthTime: string | null;
            birthLocation: string | null;
            timeZone: string | null;
            phone: string | null;
            profileImage: string | null;
            stripeCustomerId: string | null;
            isActive: boolean;
            isDeleted: boolean;
            updatedAt: Date;
        };
    }>;
    refreshTokens(token: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    changePassword(id: string, dto: ChangePasswordDto): Promise<{
        message: string;
    }>;
    getAllUsers(): Promise<{
        email: string;
        role: import("@prisma/client").$Enums.userRole;
        fullName: string;
        isActive: boolean;
    }[]>;
    updateAccount(id: string, dto: UserUpdateDto): Promise<{
        user: {
            email: string;
            password: string;
            id: string;
            role: import("@prisma/client").$Enums.userRole;
            createdAt: Date;
            fullName: string;
            birthDate: string | null;
            birthTime: string | null;
            birthLocation: string | null;
            timeZone: string | null;
            phone: string | null;
            profileImage: string | null;
            stripeCustomerId: string | null;
            isActive: boolean;
            isDeleted: boolean;
            updatedAt: Date;
        };
    }>;
    currentUser(id: string): Promise<{
        user: {
            email: string;
            password: string;
            id: string;
            role: import("@prisma/client").$Enums.userRole;
            createdAt: Date;
            fullName: string;
            birthDate: string | null;
            birthTime: string | null;
            birthLocation: string | null;
            timeZone: string | null;
            phone: string | null;
            profileImage: string | null;
            stripeCustomerId: string | null;
            isActive: boolean;
            isDeleted: boolean;
            updatedAt: Date;
        };
    }>;
    updateBirthInfo(id: string, dto: UserBirthUpdateDto): Promise<{
        user: {
            email: string;
            password: string;
            id: string;
            role: import("@prisma/client").$Enums.userRole;
            createdAt: Date;
            fullName: string;
            birthDate: string | null;
            birthTime: string | null;
            birthLocation: string | null;
            timeZone: string | null;
            phone: string | null;
            profileImage: string | null;
            stripeCustomerId: string | null;
            isActive: boolean;
            isDeleted: boolean;
            updatedAt: Date;
        };
    }>;
    requestResetCode(dto: RequestResetCodeDto): Promise<{
        message: string;
    }>;
    verifyResetCode(dto: VerifyResetCodeDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
}
