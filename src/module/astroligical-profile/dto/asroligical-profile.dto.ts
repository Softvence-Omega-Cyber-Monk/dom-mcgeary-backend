import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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


// dto/astrological-profile.dto.ts
import { Type } from 'class-transformer';

export class UpdateAstrologicalProfileDto {
  @ApiProperty({
    description: 'User\'s birth date in YYYY-MM-DD format',
    example: '1990-05-15',
    required: false,
  })
  @IsOptional()
  @IsString()
  birth_date?: string;

  @ApiProperty({
    description: 'User\'s birth time in HH:mm format (24-hour)',
    example: '14:30',
    required: false,
  })
  @IsOptional()
  @IsString()
  birth_time?: string;

  @ApiProperty({
    description: 'User\'s birth location (city, country)',
    example: 'New York, USA',
    required: false,
  })
  @IsOptional()
  @IsString()
  birth_location?: string;

  @ApiProperty({
    description: 'Western zodiac sign (e.g., Taurus, Leo)',
    example: 'Taurus',
    required: false,
  })
  @IsOptional()
  @IsString()
  western_sign?: string;

  @ApiProperty({
    description: 'Chinese zodiac sign (e.g., Dragon, Rabbit)',
    example: 'Dragon',
    required: false,
  })
  @IsOptional()
  @IsString()
  chinese_sign?: string;

  @ApiProperty({
    description: 'Detailed astrological calculation result object',
    type: Object,
    required: false,
    example: {
      sun_sign: 'Taurus',
      moon_sign: 'Cancer',
      rising_sign: 'Virgo',
      elements: { fire: 2, earth: 3, air: 1, water: 2 },
    },
  })
  @IsOptional()
  @IsObject()
  @Type(() => Object)
  result?: Record<string, any>;

  @ApiProperty({
    description: 'Roadmap overview containing personalized insights',
    type: Object,
    required: false,
    example: {
      career: 'Strong potential in creative fields...',
      relationships: 'Harmonious connections expected...',
      health: 'Focus on stress management...',
    },
  })
  @IsOptional()
  @IsObject()
  @Type(() => Object)
  roadmap_overview?: Record<string, any>;
}