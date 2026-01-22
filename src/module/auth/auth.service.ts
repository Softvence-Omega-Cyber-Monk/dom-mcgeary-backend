import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/module/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
// import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import {
  RequestResetCodeDto,
  ResetPasswordDto,
  VerifyResetCodeDto,
} from './dto/forget-reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import {
  generateOtpCode,
  getTokens,
  hashOtpCode,
  verifyOtp,
  // verifyOtp,
} from './auth.utils';
import { MailerService } from '@nestjs-modules/mailer';
// import { SystemRole } from '@prisma/client';
import { RegisterDto } from './dto/register.dto';
import { UserBirthUpdateDto, UserUpdateDto } from './dto/update-account.dto';
import { userRole } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) { }


  async handleGoogleLogin(googleProfile: { googleId: string; email: string; fullName: string; profileImage: string | null }) {
    const { googleId, email, fullName, profileImage } = googleProfile;

    // 🔍 First: try to find by email (primary lookup since googleId is optional in schema)
    let user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // ✅ Create new OAuth user
      user = await this.prisma.user.create({
        data: {
          googleId,
          email,
          fullName,
          profileImage,
          password: await bcrypt.hash(randomBytes(32).toString('hex'), 10), // dummy hash
          role: 'USER',
          isActive: false, // per your model
          isDeleted: false,
        },
      });
    } else if (!user.googleId) {
      // 🔄 Link existing email account to Google
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: { googleId },
      });
    }

    // Even if user exists, update profile image if changed
    if (profileImage && user.profileImage !== profileImage) {
      user = await this.prisma.user.update({
        where: { id: user.id },
        data: { profileImage },
      });
    }

    return user;
  }
  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email is already registered!');
    }
    if (!dto.fullName || !dto.email || !dto.password) {
      throw new BadRequestException('Invalid Credentials!');
    }

    const hashedPassword = await bcrypt.hash(
      dto.password,
      parseInt(process.env.SALT_ROUND!),
    );

    const newUser = await this.prisma.user.create({
      data: {
        fullName: dto.fullName,
        email: dto.email,
        password: hashedPassword,
        isActive: true,
        role: userRole.PRO_USER
      },
    });

    const tokens = await getTokens(
      this.jwtService,
      newUser.id,
      newUser.email,
      newUser.role,
    );
    return { user: newUser, ...tokens };
  }

  // login
  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user || !dto.password) {
      throw new ForbiddenException('Invalid credentials');
    }

    if (!user.isActive) {
      throw new ForbiddenException('Your account is not Active yet!');
    }

    if (user.isDeleted) {
      throw new BadRequestException('User is deleted!');
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) {
      throw new ForbiddenException('Invalid credentials');
    }

    const tokens = await getTokens(
      this.jwtService,
      user.id,
      user.email,
      user.role,
    );

    return { user, ...tokens };
  }

  // refresh token
  async refreshTokens(token: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });

      const user = await this.prisma.user.findUnique({ where: { email: payload.email } });
      if (!user) throw new UnauthorizedException('Invalid refresh token');
      // if(!user.isDeleted){
      //  throw new BadRequestException('User is blocked!');
      // }
      return getTokens(this.jwtService, user.id, user.email, user.role);
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  // change password
  async changePassword(id: string, dto: ChangePasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user || !user.password) {
      throw new NotFoundException('User not found');
    }
    if (user.isDeleted) {
      throw new BadRequestException('The account is deleted!');
    }
    const isMatch = await bcrypt.compare(dto.oldPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Old password is incorrect');
    }

    const hashed = await bcrypt.hash(
      dto.newPassword,
      parseInt(process.env.SALT_ROUND!),
    );
    await this.prisma.user.update({
      where: { id },
      data: { password: hashed },
    });

    return { message: 'Password changed successfully' };
  }

  // Method to get all users with specific fields
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
  async updateAccount(id: string, dto: UserUpdateDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!existingUser) {
      throw new BadRequestException('User not Found');
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: id },
      data: {
        ...dto,
      },
    });

    return { user: updatedUser };
  }

  // get current user
  async currentUser(id: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!existingUser) {
      throw new BadRequestException('User not Found');
    }



    return { user: existingUser };
  }

  //  udpated birthinfo

  async updateBirthInfo(id: string, dto: UserBirthUpdateDto) {
    // Step 1: Check if the partner exists
    const existingUser = await this.prisma.user.findUnique({
      where: { id: id },
    });

    if (!existingUser) {
      throw new BadRequestException('User not Found');
    }

    if (!dto.birthDate || !dto.birthLocation || !dto.birthTime) {
      throw new BadRequestException('Invalid Credintials');
    }
    const updatedUser = await this.prisma.user.update({
      where: { id: id }, // Find by userId
      data: {
        ...dto,
      },
    });

    return { user: updatedUser };
  }
  // forget and reset password
  async requestResetCode(dto: RequestResetCodeDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) throw new NotFoundException('User not found');
    if (user.isDeleted) {
      throw new BadRequestException('The account is deleted!');
    }

    const code = generateOtpCode();
    const hashedCode = await hashOtpCode(code);
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

  async verifyResetCode(dto: VerifyResetCodeDto) {
    return verifyOtp(this.prisma, dto.email, dto.code);
  }

  async resetPassword(dto: ResetPasswordDto) {
    if (dto.password !== dto.confirmPassword) {
      throw new BadRequestException("Passwords don't match");
    }

    const verified = await this.prisma.otpCode.findFirst({
      where: { email: dto.email, verified: true },
      orderBy: { createdAt: 'desc' },
    });

    if (!verified) {
      throw new BadRequestException('OTP not verified');
    }

    const hashed = await bcrypt.hash(
      dto.password,
      parseInt(process.env.SALT_ROUND!),
    );
    await this.prisma.user.update({
      where: { email: dto.email },
      data: { password: hashed },
    });

    await this.prisma.otpCode.deleteMany({ where: { email: dto.email } });

    return { message: 'Password reset successful' };
  }
}
