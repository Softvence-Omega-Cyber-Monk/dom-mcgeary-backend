import { JwtService } from '@nestjs/jwt';
import { PrismaClient, userRole } from '@prisma/client';
export declare function getTokens(jwtService: JwtService, userId: string, email: string, role: userRole): Promise<{
    access_token: string;
    refresh_token: string;
}>;
export declare function generateOtpCode(): string;
export declare function hashOtpCode(code: string): Promise<any>;
export declare function verifyOtp(prisma: PrismaClient, email: string, code: string): Promise<{
    message: string;
}>;
