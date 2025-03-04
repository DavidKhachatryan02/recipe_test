import { HttpService } from '@nestjs/axios';
import { Injectable, BadRequestException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { GetRecipesDto } from './dto/recipes.dto';
import {
  GetRecipeResponse,
  RecipesResponse,
} from './response/recipes.response';
import {
  MealApiResponseSingle,
  MealsApiResponse,
} from './interface/mealApi.response';

@Injectable()
export class RecipesService {
  constructor(private readonly httpService: HttpService) {}

  async getRecipes(filters: GetRecipesDto): Promise<RecipesResponse> {
    const { ingredient, country, category, name = '' } = filters;
    try {
      let url = `/search.php?s=${name}`;

      if (ingredient || country || category) {
        const params = new URLSearchParams();
        if (ingredient) params.append('i', ingredient);
        if (country) params.append('a', country);
        if (category) params.append('c', category);

        url = `/filter.php?${params.toString()}`;
      }

      const response = await firstValueFrom(
        this.httpService.get<MealsApiResponse>(url),
      );

      return this.formatResponse(response);
    } catch (error) {
      throw new BadRequestException('Failed to fetch recipes: ' + error);
    }
  }

  async getRecipeDetails(id: string): Promise<GetRecipeResponse> {
    if (!id) {
      throw new BadRequestException('Recipe ID is required');
    }

    try {
      const response = await firstValueFrom(
        this.httpService.get<MealsApiResponse>(`/lookup.php?i=${id}`),
      );

      const formatResponse = this.formatResponse(response);
      if (formatResponse.meals.length === 0) {
        throw new BadRequestException('Recipe not found');
      }

      return formatResponse.meals[0];
    } catch (error) {
      throw new BadRequestException('Failed to fetch recipe details: ' + error);
    }
  }

  private formatResponse(
    response: AxiosResponse<MealsApiResponse>,
  ): RecipesResponse {
    const data = response.data;
    if (!data.meals) {
      return { meals: [] };
    }
    return {
      meals: data.meals.map((meal) => ({
        id: meal.idMeal,
        name: meal.strMeal,
        category: meal.strCategory,
        area: meal.strArea,
        instructions: meal.strInstructions,
        thumbnail: meal.strMealThumb,
        ingredients: this.extractIngredients(meal),
      })),
    };
  }

  private extractIngredients(meal: MealApiResponseSingle): string[] {
    const ingredients: string[] = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}`] as string;
      const measure = meal[`strMeasure${i}`] as string;
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${measure} ${ingredient}`.trim());
      }
    }
    return ingredients;
  }
}
