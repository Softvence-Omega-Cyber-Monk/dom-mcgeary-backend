import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  PartnerInfoCreateDto,
  PartnerInfoUpdateDto,
} from './dto/partnerifno.dto';

@Injectable()
export class PartnerService {
  constructor(private prisma: PrismaService) {}


  // create or update partner
async createOrUpdatePartner(userId: string, dto: PartnerInfoCreateDto | PartnerInfoUpdateDto) {
  // Step 1: Check if the partner already exists
  const existingPartner = await this.prisma.partnerInfo.findUnique({
    where: { userId: userId },
  });
  // Step 2: If the partner exists, update it
  if (existingPartner) {
    const updatedPartner = await this.prisma.partnerInfo.update({
      where: { userId: userId },
      data: { ...dto }, // Use the provided DTO data to update the partner
    });
    return { partner: updatedPartner , message : "Partner Updated Successfully"};
  }

  if (
      !dto.birthDate ||
      !dto.birthLocation ||
      !dto.birthTime ||
      !dto.name ||
      !dto.relationType
    ) {
      throw new BadRequestException('Invalid Credentials!');
    }

  // Step 3: If the partner doesn't exist, create a new one
  const newPartner = await this.prisma.partnerInfo.create({
    data: {
      name: dto.name,
      userId: userId,
      birthDate: dto.birthDate,
      birthTime: dto.birthTime,
      birthLocation: dto.birthLocation,
      relationType: dto.relationType,
    },
  });



  return { partner: newPartner , message : "Partner Created Successfully" };
}

}
