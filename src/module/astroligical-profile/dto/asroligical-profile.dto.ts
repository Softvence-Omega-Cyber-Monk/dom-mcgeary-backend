import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsObject } from 'class-validator';

export class CreateAstrologicalProfileDto {
  // accept both camelCase and snake_case variants
  

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: '1990-10-15',
    description: 'Birth date (snake_case)',
  })
  @IsOptional()
  @IsString()
  birth_date?: string;

 

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: '07:30',
    description: 'Birth time (snake_case)',
  })
  @IsOptional()
  @IsString()
  birth_time?: string;

  

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    example: 'New York, USA',
    description: 'Birth location (snake_case)',
  })
  @IsOptional()
  @IsString()
  birth_location?: string;

  

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Scorpio' })
  @IsOptional()
  @IsString()
  western_sign?: string;

 

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ example: 'Snake' })
  @IsOptional()
  @IsString()
  chinese_sign?: string;

  // accept either an object or a parsed JSON structure for result and roadmap_overview
  @IsOptional()
  @IsObject()
  @ApiPropertyOptional({ description: 'snake_case alias for roadmap_overview' })
  @IsOptional()
  @IsObject()
  result?: Record<string, any>;


  @IsOptional()
  @IsObject()
  @ApiPropertyOptional({ description: 'snake_case alias for roadmap_overview' })
  @IsOptional()
  @IsObject()
  roadmap_overview?: Record<string, any>;

  @IsOptional()
  @IsString()
  userId?: string;
}
