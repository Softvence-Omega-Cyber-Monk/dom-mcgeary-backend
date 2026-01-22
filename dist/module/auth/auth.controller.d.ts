import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RequestResetCodeDto, ResetPasswordDto, VerifyResetCodeDto } from './dto/forget-reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import type { Request, Response } from 'express';
import { RegisterDto } from './dto/register.dto';
import { UserBirthUpdateDto, UserUpdateDto } from './dto/update-account.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private authService;
    private jwtService;
    private prisma;
    constructor(authService: AuthService, jwtService: JwtService, prisma: PrismaService);
    googleAuth(): void;
    googleAuthCallback(req: Request, res: Response): Promise<void>;
    refreshToken(token: string, res: Response): Promise<void>;
    register(dto: RegisterDto, res: Response): Promise<void>;
    login(dto: LoginDto, res: Response): Promise<void>;
    updateAccount(dto: UserUpdateDto, req: Request, res: Response): Promise<void>;
    updateBirthInfo(dto: UserBirthUpdateDto, req: Request, res: Response): Promise<void>;
    getAllUsers(res: Response): Promise<void>;
    currentUser(req: Request, res: Response): Promise<void>;
    changePassword(dto: ChangePasswordDto, req: Request, res: Response): Promise<void>;
    requestResetCode(dto: RequestResetCodeDto, res: Response): Promise<void>;
    verifyResetCode(dto: VerifyResetCodeDto, res: Response): Promise<void>;
    resetPassword(dto: ResetPasswordDto, res: Response): Promise<void>;
}
