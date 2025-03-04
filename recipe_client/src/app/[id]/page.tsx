import { Recipe } from '@/types/recipe';
import RecipeDetail from '@/app/components/ResponseDetails';
import apiClient from '@/apiClient';
import BackButton from '@/app/components/BackButton';

interface RecipePageParams {
  params: { id: string };
}

export default async function RecipePage({ params }: RecipePageParams) {
  const { id } = params;

  let recipe = null;
  let error = null;

  try {
    const response = await apiClient.get<Recipe>(`/recipes/${id}`);
    recipe = response.data || null;
    if (!recipe) {
      error = `No recipe found with ID: ${id}`;
    }
  } catch (err) {
    error = 'Error fetching recipe. Please try again later.';
    console.error('Fetch error:', err);
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-4 text-center">Recipe Details</h1>
        <div className="mb-4">
          <BackButton />
        </div>
        <RecipeDetail recipe={recipe} error={error} />
      </div>
    </main>
  );
}
