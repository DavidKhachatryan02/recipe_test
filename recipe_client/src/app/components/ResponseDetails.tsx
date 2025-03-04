'use client';

import Image from 'next/image';
import { Recipe } from '@/types/recipe';

interface RecipeDetailProps {
  recipe: Recipe | null;
  error?: string | null;
}

export default function RecipeDetail({ recipe, error }: RecipeDetailProps) {
  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  if (!recipe) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{recipe.name}</h1>
      <Image
        width={400}
        height={400}
        src={recipe.thumbnail}
        alt={recipe.name}
        className="w-full h-64 object-cover mb-4 rounded"
      />
      <p className="text-lg">
        <strong>Category:</strong> {recipe.category}
      </p>
      <p className="text-lg">
        <strong>Area:</strong> {recipe.area}
      </p>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Instructions</h2>
        <p className="mt-2 whitespace-pre-wrap">{recipe.instructions}</p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Ingredients</h2>
        <ul className="list-disc pl-5 mt-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
