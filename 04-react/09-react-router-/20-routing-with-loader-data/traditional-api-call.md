# Routing with Loader Data

React Router provides Data APIs that allow us to load data as part of route navigation.

One of the important Data APIs is the `loader`.

In this example, we will first implement API fetching using the traditional React approach and then refactor it to use a React Router loader.

---

# Part 1 — Traditional API Fetching

Before using a React Router loader, let's first understand the traditional approach.

We will:

1. Create a `Recipes` component.
2. Use Axios to make the API call.
3. Store the recipes in state.
4. Maintain a loading state.
5. Maintain an error state.
6. Fetch the data inside `useEffect()`.

---

## Step 1 — Install Axios

Axios is a third-party JavaScript library.

Install it using:

```bash
npm install axios

```
## Step 2 — Create Recipes.jsx
Create Recipes.jsx
Import React hooks and Axios:
```
import { useEffect, useState } from "react";
import axios from "axios";
```
## Step 3 — Create State

We need state for:

Recipes
Loading
Error
```
const [recipes, setRecipes] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
```

## Step 4 — Make the API Call

Use useEffect() to make the API request when the component mounts.
```
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
```

## Step 5 — Handle Loading

Before displaying the recipes, check whether the API request is still in progress.
```
 if (loading) {
  return <p>Loading recipes...</p>;
}
```

## Step 6 — Handle Errors

If the API request fails, display an error message.

```
if (error) {
  return <p>{error}</p>;
}
```

### Step 7 — Display the Recipes
```
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
```

### Complete Traditional Recipes.jsx

```
User navigates to /recipes
        ↓
Recipes component renders
        ↓
useEffect() runs
        ↓
Axios API request
        ↓
Loading state is displayed
        ↓
API response
        ↓
setRecipes()
        ↓
Component re-renders
        ↓
Recipes are displayed

```

