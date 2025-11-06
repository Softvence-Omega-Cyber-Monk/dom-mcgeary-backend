import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { PartnerService } from './partner.service';
import {
  PartnerInfoCreateDto,
  PartnerInfoUpdateDto,
} from './dto/partnerifno.dto';
import type { Request, Response } from 'express';
import sendResponse from 'src/module/utils/sendResponse';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('partner')
export class PartnerController {
  constructor(private partnerService: PartnerService) {}

  @Put('create-or-update-partner')
  @ApiOperation({ summary: 'Create or update partner information' })
  @ApiBody({
    description: 'Create or update partner details',
    type: PartnerInfoCreateDto, // Default type
    examples: {
      create: {
        value: {
          name: 'John Doe',
          birthDate: '1990-01-01',
          birthTime: '08:00',
          birthLocation: 'New York',
          relationType: 'WIFE',
          userId: 'user-uuid-1234',
        },
      },
      update: {
        value: {
          name: 'Jane Doe',
          birthDate: '1991-05-15',
          birthTime: '10:30',
          birthLocation: 'Los Angeles',
          relationType: 'GIRL_FRIEND',
        },
      },
    },
  })
  async updatePartner(
    @Body() dto: PartnerInfoUpdateDto | PartnerInfoCreateDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.partnerService.createOrUpdatePartner(
      req.user!.id,
      dto,
    );
    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: result.message,
      data: result.partner,
    });
  }
}
