// app/components/RecipeSearch.tsx
'use client';

import { useState, useEffect } from 'react';
import { RecipesResponse } from '@/types/recipe';
import RecipeList from './RecipeList';
import RecipeFilter from './RecipeFilter';
import apiClient from '@/apiClient';

export default function RecipeSearch() {
  const [recipes, setRecipes] = useState<RecipesResponse>({ meals: [] });

  useEffect(() => {
    const fetchAllRecipes = async () => {
      try {
        const response = await apiClient.get<RecipesResponse>('/recipes', {});
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchAllRecipes();
  }, []);

  // Callback to update recipes from RecipeFilter
  const handleRecipesFetched = (newRecipes: RecipesResponse) => {
    setRecipes(newRecipes);
  };

  return (
    <div className="space-y-4">
      <RecipeFilter onRecipesFetched={handleRecipesFetched} />
      <RecipeList recipes={recipes.meals} />
    </div>
  );
}