import { useLoaderData } from "react-router";
import { requireAuth } from "./utils";

export async function loader() {
await requireAuth();

const response = await fetch(
"https://dummyjson.com/recipes"
);

if (!response.ok) {
throw new Error("Failed to fetch recipes");
}

return response.json();
}

function Recipes() {
const data = useLoaderData();

return ( <div> <h2>Recipes</h2>


  {data.recipes.map((recipe) => (
    <p key={recipe.id}>{recipe.name}</p>
  ))}
</div>


);
}

export default Recipes;
