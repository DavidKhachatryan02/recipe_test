'use client';

import { useState } from 'react';
import apiClient from '@/apiClient';
import { RecipesResponse } from '@/types/recipe';

interface RecipeFilterProps {
  onRecipesFetched: (recipes: RecipesResponse) => void;
}

export default function RecipeFilter({ onRecipesFetched }: RecipeFilterProps) {
  const [name, setName] = useState('');
  const [ingredient, setIngredient] = useState('');
  const [country, setCountry] = useState('');
  const [category, setCategory] = useState('');

  const fetchRecipes = async () => {
    try {
      const response = await apiClient.get<RecipesResponse>('/recipes', {
        params: {
          name,
          ingredient,
          country,
          category,
        },
      });
      onRecipesFetched(response.data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Search by name"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Filter by ingredient"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Filter by country"
          className="border p-2 rounded"
        />
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Filter by category"
          className="border p-2 rounded"
        />
      </div>
      <div className="flex space-x-2">
        <button
          onClick={fetchRecipes}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Get Recipes
        </button>
      </div>
    </div>
  );
}
