Now let's create the same functionality using React Router's Data APIs.

Instead of making the API request inside the component using useEffect(), we will create a loader function.

The loader will be responsible for loading the data before the route component renders.
--- 

# Creating RecipesLoader with Loader Data

## Step 1 — Create RecipesLoader.jsx

Create a new file:

```text
RecipesLoader.jsx

```
This file will contain:

The loader function
The RecipesLoader component
useLoaderData()

## Step 2 — Import useLoaderData

At the top of RecipesLoader.jsx, import useLoaderData:

```
import { useLoaderData } from "react-router";
```

### Step 3 — Create the Loader Function

Create an async function named loader.

```
export async function loader() {
  const response = await fetch("https://dummyjson.com/recipes");

  const data = await response.json();

  return data;
}
```

### Step 4 — Understand What the Loader Does

The loader performs three main steps:

#### 1. Make the API request
```
const response = await fetch("https://dummyjson.com/recipes");
```


#### 2. Convert the response to JSON
```
const data = await response.json();
```

#### 3. Return the data
```
return data;
```

The returned data will be available to the route component through useLoaderData().

### Step 5 — Create the RecipesLoader Component

Create the component:

```function RecipesLoader() {
  
}
```

### Step 6 — Get the Loader Data

Inside the component, call:

```
const recipesList = useLoaderData();
```


The data returned from the loader is available through useLoaderData().

So:

```
function RecipesLoader() {
  const recipesList = useLoaderData();
}
```

### Step 7 — Display the Recipes

The API response contains the recipes inside:

recipesList.recipes

We can use .map() to display them:
```
{recipesList.recipes.map((recipe) => (
  <div key={recipe.id}>
    <h2>{recipe.name}</h2>
    <p>Cuisine: {recipe.cuisine}</p>
    <p>Difficulty: {recipe.difficulty}</p>
    <p>Rating: {recipe.rating}</p>
  </div>
))}
```

### Step 8 — Create the Complete Component

The complete component becomes:
``` 
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
``` 

### Step 9 — Create a Data Router

To use a loader, we need to use React Router's Data Router APIs.

In App.jsx, import:
```
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router";

```

### Step 10 — Import the Loader and Component

Import both the component and the loader:
```
import RecipesLoader, {
  loader as recipesLoader
} from "./RecipesLoader";

```

We are renaming the imported loader to recipesLoader so that its purpose is clear.

### Step 11 — Create the Router

Create the router using createBrowserRouter():
```
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route
        path="recipes"
        element={<RecipesLoader />}
        loader={recipesLoader}
      />
    </Route>
  )
);

```

### Step 12 — Understand the Route

This part is important:
```
<Route
  path="recipes"
  element={<RecipesLoader />}
  loader={recipesLoader}
/>
``` 
We have three important pieces:

path
```
path="recipes"
```

This defines the URL:

/recipes
element
```
element={<RecipesLoader />}
``` 

This is the component that will render for the route.

loader
```
loader={recipesLoader}
```

This tells React Router which function should load the data for this route.

### Step 13 — Provide the Router

The router needs to be provided to the React application using RouterProvider.
```
function App() {
  return <RouterProvider router={router} />;
}
```
### Step 14 — Complete App.jsx
```
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router";

import Layout from "./Layout";
import Home from "./Home";

import RecipesLoader, {
  loader as recipesLoader
} from "./RecipesLoader";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route
        path="recipes"
        element={<RecipesLoader />}
        loader={recipesLoader}
      />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
```

### Traditional Approach vs Loader Approach
#### Traditional Approach
```
Component
    ↓
useEffect()
    ↓
Axios
    ↓
API
    ↓
setState()
    ↓
Component re-renders
```
The component is responsible for fetching the data.

#### Loader Approach
```
Route
    ↓
loader()
    ↓
API
    ↓
Data returned
    ↓
Component
    ↓
useLoaderData()
```

### Important Difference

With the traditional approach, we have:
```
useEffect()
useState()
axios
loading state
error state
```
With the basic loader example, we have:
```
loader()
useLoaderData()
```
The component no longer needs to make the API request using useEffect().

### Key Interview Point
What is a loader in React Router?

A loader is a function associated with a route that allows React Router to load data before rendering that route.

The data returned by the loader can be accessed inside the route component using useLoaderData().

Example:
```
<Route
  path="recipes"
  element={<RecipesLoader />}
  loader={recipesLoader}
/>
```
Loader:
```
export async function loader() {
  const response = await fetch("https://dummyjson.com/recipes");

  return await response.json();
}
```
Component:
```
const recipesList = useLoaderData();

```

### Key Points to Remember


- loader is part of React Router's Data APIs.
- A loader is associated with a route.
- React Router runs the loader during route navigation.
- The loader can fetch data required by the route.
- The loader returns the data.
- useLoaderData() accesses the returned data.
- The component does not need useEffect() for this data request.
- The component does not need to store the loader data in state.
- createBrowserRouter() creates the Data Router.
- createRoutesFromElements() allows routes to be defined using JSX.
- RouterProvider provides the router to the application.

#### Interview Question

What is the difference between fetching data using useEffect and using a React Router loader?

With useEffect, the component renders first and then the API request is initiated from the component.

With a React Router loader, the data request is associated with the route and React Router runs the loader during navigation. The returned data can then be accessed using useLoaderData().