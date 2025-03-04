'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Recipe } from '@/types/recipe';

interface RecipeListProps {
  recipes: Recipe[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  const router = useRouter();

  const handleRecipeClick = (id: string) => {
    router.push(`/${id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="border p-4 rounded shadow cursor-pointer hover:bg-gray-800"
          onClick={() => handleRecipeClick(recipe.id)}
        >
          <h2 className="text-xl font-bold">{recipe.name}</h2>

          <p> {recipe.category ? `Category: ${recipe.category}` : ''}</p>
          <p> {recipe.area ? `Area: ${recipe.area}` : ''}</p>
          <Image
            width={400}
            height={400}
            src={recipe.thumbnail}
            alt={recipe.name}
            className="w-full h-48 object-cover mt-2"
          />
          <p className="mt-2">
            {recipe.instructions ? `${recipe.instructions.substring(0, 100)} ...` : ''}
            
          </p>
        </div>
      ))}
    </div>
  );
}
