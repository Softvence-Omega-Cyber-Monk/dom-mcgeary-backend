import { IsString, IsEnum, IsOptional } from 'class-validator';
import { relationType } from '@prisma/client'; // Import enum from Prisma if defined there
import { ApiProperty } from '@nestjs/swagger';




export class PartnerInfoCreateDto {
  @ApiProperty({
    description: 'The name of the partner',
    example: 'John Doe',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The birthdate of the partner',
    example: '1990-01-01',
  })
  @IsString()
  birthDate: string;

  @ApiProperty({
    description: 'The birth time of the partner',
    example: '08:00',
  })
  @IsString()
  birthTime: string;

  @ApiProperty({
    description: 'The birth location of the partner',
    example: 'New York',
  })
  @IsString()
  birthLocation: string;

  @ApiProperty({
    description: 'The relationship type with the partner',
    example: 'WIFE',
    enum: relationType,
  })
  @IsEnum(relationType)
  relationType: relationType;

}





export class PartnerInfoUpdateDto {
  @ApiProperty({
    description: 'The name of the partner',
    example: 'Jane Doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The birthdate of the partner',
    example: '1991-05-15',
    required: false,
  })
  @IsString()
  @IsOptional()
  birthDate?: string;

  @ApiProperty({
    description: 'The birth time of the partner',
    example: '10:30',
    required: false,
  })
  @IsString()
  @IsOptional()
  birthTime?: string;

  @ApiProperty({
    description: 'The birth location of the partner',
    example: 'Los Angeles',
    required: false,
  })
  @IsString()
  @IsOptional()
  birthLocation?: string;

  @ApiProperty({
    description: 'The relationship type with the partner',
    example: 'GIRL_FRIEND',
    enum: relationType,
    required: false,
  })
  @IsEnum(relationType)
  @IsOptional()
  relationType?: relationType;
}
