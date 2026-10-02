import { useLoaderData } from "react-router";

export async function loader() {
  const response = await fetch("https://dummyjson.com/recipes9");//incorrect url given 
  if (!response.ok) { 
    throw new Response("Failed to load the recipes", 
      { status: response.status, }); 
    }

  const data = await response.json();
  return data;
}

function RecipesLoader() {
  const recipesList = useLoaderData();

  return (
    <div>
      <h1>Recipes</h1>

      {recipesList.recipes.map((recipe) => (
        <div key={recipe.id}>
          <h2>{recipe.name}</h2>

          <p>Cuisine: {recipe.cuisine}</p>

          <p>Difficulty: {recipe.difficulty}</p>

          <p>Rating: {recipe.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default RecipesLoader;