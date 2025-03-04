import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class GetRecipeResponse {
  @ApiProperty({
    description: 'Unique identifier of the recipe',
    example: '53086',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Name of the recipe',
    example: 'Migas',
    type: String,
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Category of the recipe',
    example: 'Miscellaneous',
    type: String,
  })
  category?: string;

  @ApiPropertyOptional({
    description: 'Cuisine area of the recipe',
    example: 'Spanish',
    type: String,
  })
  area?: string;

  @ApiPropertyOptional({
    description: 'Cooking instructions',
    example: 'Crumble the bread into small pieces...',
    type: String,
  })
  instructions?: string;

  @ApiProperty({
    description: 'URL to recipe thumbnail image',
    example:
      'https://www.themealdb.com/images/media/meals/xd9aj21740432378.jpg',
    type: String,
  })
  thumbnail: string;

  @ApiProperty({
    description: 'List of ingredients',
    type: [String],
    example: [
      '2 large Potatoes',
      '2 tbs Butter',
      '150g Cheese',
      '1 large Onion',
      '1 large Red Pepper',
      'Pinch Red Chilli Flakes',
    ],
  })
  ingredients: string[];
}

export class RecipesResponse {
  @ApiProperty({
    description: 'Array of recipes',
    type: [GetRecipeResponse],
  })
  meals: GetRecipeResponse[];
}
