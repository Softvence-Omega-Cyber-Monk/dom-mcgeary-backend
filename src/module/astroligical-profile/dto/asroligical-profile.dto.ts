import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// Define the structure for the array objects
class TimingOrZone {
  @IsString()
  title: string;

  @IsString()
  description: string;
}

export class CreateAstrologicalProfileDto {
  @IsString()
  westernSign: string;

  @IsString()
  chineseSign: string;

  @IsString()
  corePersonality: string;

  @IsString()
  element: string;

  @IsArray()
  @IsString({ each: true })
  strengths: string[];

  @IsArray()
  @IsString({ each: true })
  challenges: string[];

  @IsString()
  userId: string; // Reference to User

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimingOrZone)
  cosmicGreenLight?: TimingOrZone[]; // Array of objects with title and description

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimingOrZone)
  optimalTiming?: TimingOrZone[]; // Array of objects with title and description

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimingOrZone)
  avoidanceZone?: TimingOrZone[]; // Array of objects with title and description
}


export class UpdateAstrologicalProfileDto {
  @IsOptional()
  @IsString()
  westernSign?: string;

  @IsOptional()
  @IsString()
  chineseSign?: string;

  @IsOptional()
  @IsString()
  corePersonality?: string;

  @IsOptional()
  @IsString()
  element?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  strengths?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  challenges?: string[];

  @IsOptional()
  @IsString()
  userId?: string; // Reference to User

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimingOrZone)
  cosmicGreenLight?: TimingOrZone[]; // Array of objects with title and description

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimingOrZone)
  optimalTiming?: TimingOrZone[]; // Array of objects with title and description

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TimingOrZone)
  avoidanceZone?: TimingOrZone[]; // Array of objects with title and description
}
