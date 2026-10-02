import { Await, useLoaderData } from "react-router";
import { Suspense } from "react";
import { getRecipes } from "./utils";

export function loader() {
    // Do NOT use await here.
    // We return the Promise so the UI does not have to wait.
    const recipesPromise = getRecipes();

    return {
        recipes: recipesPromise
    };
}

export default function Recipes() {

    const { recipes } = useLoaderData();

    return (
        <div>
            <h1>Recipes</h1>

            <Suspense fallback={<h2>Loading recipes...</h2>}>

                <Await resolve={recipes}>
                    {(list) => (
                        <div>
                            {list.map((recipe) => (
                                <div key={recipe.id}>
                                    <h3>{recipe.name}</h3>
                                </div>
                            ))}
                        </div>
                    )}
                </Await>

            </Suspense>
        </div>
    );
}