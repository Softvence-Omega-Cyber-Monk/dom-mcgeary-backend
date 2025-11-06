import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import sendResponse from '../utils/sendResponse';
import { Public } from 'src/common/decorators/public.decorators';
import {
  RequestResetCodeDto,
  ResetPasswordDto,
  VerifyResetCodeDto,
} from './dto/forget-reset-password.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import type { Request, Response } from 'express';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { UserBirthUpdateDto, UserUpdateDto } from './dto/update-account.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { userRole } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // register
  //   @Public()
  //   @Post('request-register-otp')
  //   async requestRegisterOtp(@Body('email') email: string, @Res() res: Response) {
  //     const result = await this.authService.requestRegisterOtp(email);
  //     return sendResponse(res, {
  //       statusCode: HttpStatus.OK,
  //       success: true,
  //       message: 'OTP sent for registration',
  //       data: result,
  //     });
  //   }

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    const result = await this.authService.register(dto);
    console.log(result);
    res.cookie('access_token', result.access_token, {
      httpOnly: true, // important for security (prevents client-side access to the cookie)
      secure: false, // Only send the cookie over HTTPS in production
      maxAge: 3600000, // Optional: set expiration time for the cookie (1 hour in this example)
    });
    return sendResponse(res, {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'Registration successful',
      data: result,
    });
  }

  // login
  @Public()
  @Post('login')
  async login(@Body() dto: LoginDto, @Res() res: Response) {
    const result = await this.authService.login(dto);
    //  res.cookie('access_token', result.access_token, {
    //   httpOnly: true, // important for security (prevents client-side access to the cookie)
    //   secure: false,  // Only send the cookie over HTTPS in production
    //   maxAge: process.env.ACCESS_TOKEN_EXPIREIN as any // Optional: set expiration time for the cookie (1 hour in this example)
    // });
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Login successful',
      data: result,
    });
  }

  // update user account
  @Put('update-account')
  async updateAccount(
    @Body() dto: UserUpdateDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.authService.updateAccount(req.user!.id, dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Account Updated successful',
      data: result,
    });
  }

  // update birth info
  @Put('update-birthinfo')
  async updateBirthInfo(
    @Body() dto: UserBirthUpdateDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.authService.updateBirthInfo(req.user!.id, dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Birt Information Updated successful',
      data: result,
    });
  }

  // Endpoint to get all users with specific fields
  @Get('all')
  @Roles(userRole.ADMIN)
  async getAllUsers(@Res() res: Response) {
    const users = await this.authService.getAllUsers();
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Users fetched successfully',
      data: users,
    });
  }

  // change password
  @Patch('change-password')
  async changePassword(
    @Body() dto: ChangePasswordDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.authService.changePassword(req.user!.email, dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Password changed',
      data: result,
    });
  }

  // forget and reset password
  @Public()
  @Post('request-reset-code')
  async requestResetCode(
    @Body() dto: RequestResetCodeDto,
    @Res() res: Response,
  ) {
    const result = await this.authService.requestResetCode(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Reset code sent',
      data: result,
    });
  }

  @Public()
  @Post('verify-reset-code')
  async verifyResetCode(@Body() dto: VerifyResetCodeDto, @Res() res: Response) {
    const result = await this.authService.verifyResetCode(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'OTP verified',
      data: result,
    });
  }

  @Public()
  @Post('reset-password')
  async resetPassword(@Body() dto: ResetPasswordDto, @Res() res: Response) {
    const result = await this.authService.resetPassword(dto);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Password reset successful',
      data: result,
    });
  }
}
