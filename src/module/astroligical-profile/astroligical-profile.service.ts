import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAstrologicalProfileDto, UpdateAstrologicalProfileDto } from './dto/asroligical-profile.dto';

@Injectable()
export class AstroligicalProfileService {
  constructor(private prisma: PrismaService) {}

  // create or update partner
  async createOrUpdateAstrologicalProfile(
    userId: string,
    dto: CreateAstrologicalProfileDto,
  ) {
    const existingPartner = await this.prisma.astrologicalProfile.findUnique({
      where: { userId: userId },
    });

    if (existingPartner) {
      throw new BadRequestException(
        'astrological profile already exists for this user',
      );
    }
    // Minimal implementation: use DTO fields matching the Prisma model
    if (!userId) {
      throw new BadRequestException('Missing userId');
    }

    const data: any = {
      birth_date: (dto as any).birth_date ?? (dto as any).birth_date,
      birth_time: (dto as any).birth_time ?? (dto as any).birth_time,
      birth_location:
        (dto as any).birth_location ?? (dto as any).birth_location,
      western_sign: (dto as any).western_sign ?? (dto as any).western_sign,
      chinese_sign: (dto as any).chinese_sign ?? (dto as any).chinese_sign,
      result: (dto as any).result ?? undefined,
      roadmap_overview:
        (dto as any).roadmap_overview ??
        (dto as any).roadmap_overview ??
        undefined,
      userId: userId,
    };

    const newAstrologicalProfile = await this.prisma.astrologicalProfile.create(
      {
        data,
      },
    );

    return {
      astrologicalProfile: newAstrologicalProfile,
      message: 'Astrological profile created successfully',
    };
  }

  async getAstrologicalProfile(userId: string) {
    // Step 1: Check if the partner already exists
    const existingPartner = await this.prisma.astrologicalProfile.findUnique({
      where: { userId: userId },
    });

    if (!existingPartner) {
      throw new BadRequestException(
        'Astrological profile does not exist for this user',
      );
    }

    return {
      astrologicalProfile: existingPartner,
      message: 'Partner Retrieved Successfully',
    };
  }

  async updateAstrologicalProfile(
    userId: string,
    dto: UpdateAstrologicalProfileDto,
  ) {
    const existingProfile = await this.prisma.astrologicalProfile.findUnique({
      where: { userId },
    });

    if (!existingProfile) {
      throw new BadRequestException(
        'Astrological profile does not exist for this user. Please create one first.',
      );
    }

    // Only include fields that are present in the DTO
    const data: any = {};
    if (dto.birth_date !== undefined) data.birth_date = dto.birth_date;
    if (dto.birth_time !== undefined) data.birth_time = dto.birth_time;
    if (dto.birth_location !== undefined)
      data.birth_location = dto.birth_location;
    if (dto.western_sign !== undefined) data.western_sign = dto.western_sign;
    if (dto.chinese_sign !== undefined) data.chinese_sign = dto.chinese_sign;
    if (dto.result !== undefined) data.result = dto.result;
    if (dto.roadmap_overview !== undefined)
      data.roadmap_overview = dto.roadmap_overview;

    const updatedProfile = await this.prisma.astrologicalProfile.update({
      where: { userId },
      data,
    });

    return {
      astrologicalProfile: updatedProfile,
      message: 'Astrological profile updated successfully',
    };
  }
}
