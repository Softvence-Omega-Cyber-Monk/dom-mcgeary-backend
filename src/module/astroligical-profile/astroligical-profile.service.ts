import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAstrologicalProfileDto,
  UpdateAstrologicalProfileDto,
} from './dto/asroligical-profile.dto';

@Injectable()
export class AstroligicalProfileService {
  constructor(private prisma: PrismaService) {}

  // create or update partner
  async createOrUpdateAstrologicalProfile(
    userId: string,
    dto: CreateAstrologicalProfileDto | UpdateAstrologicalProfileDto,
  ) {

    const existingPartner = await this.prisma.astrologicalProfile.findUnique({
      where: { userId: userId },
    });

    if (existingPartner) {
      throw new BadRequestException(
        'astrological profile already exists for this user',
      );
    }
    if (
      !dto.westernSign ||
      !dto.chineseSign ||
      !dto.corePersonality ||
      !dto.element ||
      !dto.strengths ||
      !dto.challenges ||
      !dto.userId
    ) {
      throw new BadRequestException('Invalid Credentials!');
    }

    // Create Astrological Profile
    const newAstrologicalProfile = await this.prisma.astrologicalProfile.create(
      {
        data: {
          westernSign: dto.westernSign,
          chineseSign: dto.chineseSign,
          corePersonality: dto.corePersonality,
          element: dto.element,
          strengths: dto.strengths,
          challenges: dto.challenges,
          userId: userId,
          cosmicGreenLight: dto.cosmicGreenLight
            ? {
                create: dto.cosmicGreenLight.map((item) => ({
                  title: item.title,
                  description: item.description,
                })),
              }
            : undefined,
          optimalTiming: dto.optimalTiming
            ? {
                create: dto.optimalTiming.map((item) => ({
                  title: item.title,
                  description: item.description,
                })),
              }
            : undefined,
          avoidanceZone: dto.avoidanceZone
            ? {
                create: dto.avoidanceZone.map((item) => ({
                  title: item.title,
                  description: item.description,
                })),
              }
            : undefined,
        },
      },
    );
    return {
      astrologicalProfile: newAstrologicalProfile,
      message: 'Partner Created Successfully',
    };
  }

async getAstrologicalProfile(userId: string) {
  // Step 1: Check if the partner already exists
  const existingPartner = await this.prisma.astrologicalProfile.findUnique({
    where: { userId: userId },
    include: {
      cosmicGreenLight: true,  // Include related cosmicGreenLight data
      optimalTiming: true,     // Include related optimalTiming data
      avoidanceZone: true,     // Include related avoidanceZone data
    },
  });

  if (!existingPartner) {
    throw new BadRequestException('Astrological profile does not exist for this user');
  }

  return {
    astrologicalProfile: existingPartner,
    message: 'Partner Retrieved Successfully',
  };
}

}
