import { useEffect, useState } from "react";
import axios from "axios";

function Recipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("https://dummyjson.com/recipes")
      .then((response) => {
        setRecipes(response.data.recipes);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load recipes");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading recipes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Recipes</h1>

      {recipes.map((recipe) => (
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

export default Recipes;