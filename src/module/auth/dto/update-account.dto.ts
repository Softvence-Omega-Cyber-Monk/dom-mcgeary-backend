import { IsString, IsOptional, IsEmail, IsEnum, IsBoolean } from 'class-validator';
import { userRole } from '@prisma/client'; // Assuming your userRole is from Prisma's generated types

export class UserUpdateDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;


  @IsString()
  @IsOptional()
  birthDate?: string;

  @IsString()
  @IsOptional()
  birthTime?: string;

  @IsString()
  @IsOptional()
  birthLocation?: string;

  @IsString()
  @IsOptional()
  timeZone?: string;

}




export class UserBirthUpdateDto {
  

  @IsString()
  birthDate?: string;

  @IsString()
  birthTime?: string;

  @IsString()
  birthLocation?: string;

}
