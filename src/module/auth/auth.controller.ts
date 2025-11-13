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
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { UserBirthUpdateDto, UserUpdateDto } from './dto/update-account.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { userRole } from '@prisma/client';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // refresh token
  @Public()
  @Post('refresh-token')
  @ApiOperation({
    summary: 'Refresh JWT tokens',
    description: 'Refreshes the access token using the provided refresh token.',
  })
  @ApiBody({
    description: 'Refresh token for refreshing access token',
    type: RefreshTokenDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully.',
  })
  async refreshToken(
    @Body('refreshToken') token: string,
    @Res() res: Response,
  ) {
    const result = await this.authService.refreshTokens(token);
    res.cookie('accessToken', result.access_token, {
      httpOnly: false, // Prevents client-side access to the cookie
      secure: false, // Only true for HTTPS
      maxAge: 86400000, // 1 day expiration
      sameSite: 'none', // Allow cross-origin requests to send the cookie
    });

    res.cookie('refreshToken', result.refresh_token, {
      httpOnly: false,
      secure: false, // Only true for HTTPS
      maxAge: 604800000, // 7 days expiration
      sameSite: 'none', // Allow cross-origin requests to send the cookie
    });
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'Token refreshed',
      data: result,
    });
  }

  @Public()
  @Post('register')
  async register(@Body() dto: RegisterDto, @Res() res: Response) {
    const result = await this.authService.register(dto);

     res.cookie('accessToken', result.access_token, {
      httpOnly: false, // Prevents client-side access to the cookie
      secure: false, // Only true for HTTPS
      maxAge: 86400000, // 1 day expiration
      sameSite: 'none', // Allow cross-origin requests to send the cookie
    });

    res.cookie('refreshToken', result.refresh_token, {
      httpOnly: false,
      secure: false, // Only true for HTTPS
      maxAge: 604800000, // 7 days expiration
      sameSite: 'none', // Allow cross-origin requests to send the cookie
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
    res.cookie('accessToken', result.access_token, {
      httpOnly: false, // Prevents client-side access to the cookie
      secure: false, // Only true for HTTPS
      maxAge: 86400000, // 1 day expiration
      sameSite: 'none', // Allow cross-origin requests to send the cookie
    });

    res.cookie('refreshToken', result.refresh_token, {
      httpOnly: false,
      secure: false, // Only true for HTTPS
      maxAge: 604800000, // 7 days expiration
      sameSite: 'none', // Allow cross-origin requests to send the cookie
    });
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


  @Get('current-user')
  async currentUser(@Req() req: Request,@Res() res: Response) {
    const users = await this.authService.currentUser(req.user!.id);
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: 'User fetched successfully',
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
    const result = await this.authService.changePassword(req.user!.id, dto);
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
