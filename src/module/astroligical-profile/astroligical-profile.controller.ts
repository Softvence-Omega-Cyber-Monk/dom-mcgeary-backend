import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import {
  CreateAstrologicalProfileDto,
  UpdateAstrologicalProfileDto,
} from './dto/asroligical-profile.dto';
import type { Request, Response } from 'express';
import sendResponse from '../utils/sendResponse';
import { AstroligicalProfileService } from './astroligical-profile.service';
import { Public } from 'src/common/decorators/public.decorators';
import { rmSync } from 'fs';

@Controller('astroligical-profile')
export class AstroligicalProfileController {
  constructor(private AstroligicalProfileService: AstroligicalProfileService) {}

  @Put('create-astroligical-profile')
  @ApiOperation({ summary: 'Create  astroligical-profile' })
  @ApiBody({
    description: 'Create  astrological profile details',
    type: CreateAstrologicalProfileDto, // Default type
    examples: {
      create: {
        value: {
          westernSign: 'Leo',
          chineseSign: 'Dragon',
          corePersonality: 'Confident and Brave',
          element: 'Fire',
          strengths: ['Brave', 'Loyal'],
          challenges: ['Impulsive', 'Stubborn'],
          userId: 'user-uuid-1234',
          cosmicGreenLight: [
            {
              title: 'Cosmic Favor',
              description: 'A time for success and growth.',
            },
          ],
          optimalTiming: [
            {
              title: 'Start of New Journey',
              description: 'Best time to begin new ventures.',
            },
          ],
          avoidanceZone: [
            {
              title: 'Dangerous Period',
              description: 'Avoid making major decisions.',
            },
          ],
        },
      },
      
    },
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
  async getAastrologicanProfile(
    @Req() req: Request,
    @Res() res: Response,
  ) {
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
