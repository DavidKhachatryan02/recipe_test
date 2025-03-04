import { Controller, Query, Get, Param } from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetRecipesDto } from './dto/recipes.dto';
import {
  GetRecipeResponse,
  RecipesResponse,
} from './response/recipes.response';

@ApiTags('recipes')
@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Get()
  @ApiOperation({ summary: 'Get available recipes with optional filters' })
  @ApiResponse({
    status: 200,
    description: 'List of recipes',
    type: RecipesResponse,
  })
  async getRecipes(
    @Query() getRecipesDto: GetRecipesDto,
  ): Promise<RecipesResponse> {
    return this.recipesService.getRecipes(getRecipesDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get detailed recipe information by ID' })
  @ApiResponse({
    status: 200,
    description: 'Recipe details',
    type: GetRecipeResponse,
  })
  @ApiParam({ name: 'id', type: String, description: 'Recipe ID' })
  async getRecipeDetails(@Param('id') id: string): Promise<GetRecipeResponse> {
    return this.recipesService.getRecipeDetails(id);
  }
}
