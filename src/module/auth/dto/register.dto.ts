import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { userRole } from '@prisma/client';

export class RegisterDto {
   @ApiPropertyOptional({
    example: 'John Doe',
    description: 'required full name of the user',
  })
  @IsNotEmpty({ message: 'name is required!' })
  @IsString({ message: 'full name must be a string' })
  fullName: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'User email address',
  })
  @IsNotEmpty({ message: 'Email is required!' })
  @IsEmail({}, { message: 'Email must be valid!' })
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'Password with at least 6 characters',
  })
  @IsNotEmpty({ message: 'Password is required!' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;
}
