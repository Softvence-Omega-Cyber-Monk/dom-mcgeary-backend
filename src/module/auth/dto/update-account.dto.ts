import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UserUpdateDto {
  
  @ApiProperty({
    description: 'User full name',
    type: String,
    required: false, // Optional field
  })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    description: 'User email address',
    type: String,
    required: false, // Optional field
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'User birth date',
    type: String,
    required: false, // Optional field
  })
  @IsString()
  @IsOptional()
  birthDate?: string;

  @ApiProperty({
    description: 'User birth time',
    type: String,
    required: false, // Optional field
  })
  @IsString()
  @IsOptional()
  birthTime?: string;

  @ApiProperty({
    description: 'User birth location',
    type: String,
    required: false, // Optional field
  })
  @IsString()
  @IsOptional()
  birthLocation?: string;

  @ApiProperty({
    description: 'User timezone',
    type: String,
    required: false, // Optional field
  })
  @IsString()
  @IsOptional()
  timeZone?: string;

}

export class UserBirthUpdateDto {

  @ApiProperty({
    description: 'User birth date',
    type: String,
    required: false, // Optional field
  })
  @IsString()
  @IsOptional()
  birthDate?: string;

  @ApiProperty({
    description: 'User birth time',
    type: String,
    required: false, // Optional field
  })
  @IsString()
  @IsOptional()
  birthTime?: string;

  @ApiProperty({
    description: 'User birth location',
    type: String,
    required: false, // Optional field
  })
  @IsString()
  @IsOptional()
  birthLocation?: string;
}
