import { IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetRecipesDto {
  @ApiProperty({ required: false, description: 'Name search' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ required: false, description: 'ingredient filter' })
  @IsOptional()
  @IsString()
  ingredient?: string;

  @ApiPropertyOptional({ required: false, description: 'country filter' })
  @IsOptional()
  @IsString()
  country?: string;

  @ApiPropertyOptional({ required: false, description: 'category filter' })
  @IsOptional()
  @IsString()
  category?: string;
}
