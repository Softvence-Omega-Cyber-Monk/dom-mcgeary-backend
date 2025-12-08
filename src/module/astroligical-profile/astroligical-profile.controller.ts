import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAstrologicalProfileDto } from './dto/asroligical-profile.dto';
import type { Request, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import { AstroligicalProfileService } from './astroligical-profile.service';

@Controller('astroligical-profile')
export class AstroligicalProfileController {
  constructor(private AstroligicalProfileService: AstroligicalProfileService) {}

  @Post('create-astroligical-profile')
  @ApiOperation({ summary: 'Create  astroligical-profile' })
  @ApiBody({
    description: 'Create an astrological profile with optional fields.',
    type: CreateAstrologicalProfileDto,
  })
  async createAstroligicalProfile(
    @Body() dto: CreateAstrologicalProfileDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result =
      await this.AstroligicalProfileService.createOrUpdateAstrologicalProfile(
        req.user!.id,
        dto,
      );
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: result.message,
      data: result.astrologicalProfile,
    });
  }

  @Get('get-astroloigical-profile')
  @ApiOperation({ summary: 'get astrologicalProfile  information' })
  async getAastrologicanProfile(@Req() req: Request, @Res() res: Response) {
    const result = await this.AstroligicalProfileService.getAstrologicalProfile(
      req.user!.id,
    );
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: result.message,
      data: result.astrologicalProfile,
    });
  }
}
