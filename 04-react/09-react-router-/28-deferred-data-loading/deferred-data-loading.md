# Deferred Data Loading with `<Await>` and `<Suspense>`

## Why do we need this?

In the previous example, the `loader()` function waited for the API call to finish before rendering the page.

For example:

```jsx
export async function loader() {
    const recipes = await getRecipes();

    return { recipes };
}
```

If the API takes 5 seconds to respond, React Router waits for those 5 seconds before rendering the route.

The user may see a completely blank page during that time.

This is not a good user experience.

Instead of blocking the entire page, we can allow the page to render immediately and display a loading message while the API request is still in progress.

React Router provides:

* `defer`/promise-based loader data
* `<Await>` from React Router
* `<Suspense>` from React

In this example, we will use a Promise directly with `<Await>`.

---

# 1. The problem with `await` in the loader

Our original loader looked like this:

```jsx
export async function loader() {
    const recipes = await getRecipes();

    return {
        recipes
    };
}
```

The important part is:

```jsx
await getRecipes();
```

The loader waits for `getRecipes()` to finish.

### Flow

```text
Recipes route requested
        ↓
loader() executes
        ↓
getRecipes()
        ↓
API request
        ↓
WAIT...
        ↓
API response
        ↓
loader returns data
        ↓
Recipes component renders
```

If the API takes 5 seconds:

```text
User clicks Recipes
        ↓
Loader starts
        ↓
5 second delay
        ↓
Recipes page finally appears
```

The user doesn't get any useful UI during those 5 seconds.

---

# 2. Move the API call into `utils.js`

Instead of keeping the API logic directly inside `Recipes.jsx`, create a reusable function in `utils.js`.

```jsx
export const delay = (ms) =>
    new Promise((resolve) => setTimeout(resolve, ms));


export const getRecipes = async () => {

    await delay(5000);

    const response = await fetch(
        "https://dummyjson.com/recipes"
    );

    if (!response.ok) {
        throw new Error("Failed to fetch recipes");
    }

    const data = await response.json();

    return data.recipes;
};
```

Notice that `getRecipes()` returns:

```jsx
data.recipes
```

instead of returning the entire API response.

Therefore, the function gives us:

```jsx
[
    { id: 1, name: "Pizza" },
    { id: 2, name: "Pasta" },
    ...
]
```

---

# 3. Import `getRecipes` into `Recipes.jsx`

```jsx
import { getRecipes } from "./utils";
```

Now the loader can call the reusable function.

---

# 4. The blocking version

Initially we had:

```jsx
export async function loader() {

    const recipes = await getRecipes();

    console.log(recipes);

    return {
        recipes
    };
}
```

The problem is:

```jsx
await getRecipes();
```

The loader waits for the Promise.

---

# 5. Remove `await`

Instead of waiting for the Promise to resolve, we can return the Promise itself.

```jsx
export function loader() {

    const recipesPromise = getRecipes();

    return {
        recipes: recipesPromise
    };
}
```

Notice the difference.

### Before

```jsx
const recipes = await getRecipes();
```

We get the actual data.

### Now

```jsx
const recipesPromise = getRecipes();
```

We get a Promise.

The Promise is still in progress.

---

# 6. What does the loader return now?

The loader returns:

```jsx
{
    recipes: recipesPromise
}
```

Conceptually:

```text
loader()
   ↓
{
    recipes: Promise
}
```

The API request continues in the background.

The route does not have to wait for the recipes before the component can start rendering.

---

# 7. Read the loader data

In `Recipes.jsx`:

```jsx
const { recipes } = useLoaderData();
```

The important thing to understand is that:

```jsx
recipes
```

is currently a Promise.

It is not the final recipe array yet.

For example:

```text
recipes
   ↓
Promise
   ↓
waiting...
   ↓
API response
   ↓
recipe array
```

---

# 8. Import `<Await>`

`Await` is a React Router component.

```jsx
import { Await } from "react-router";
```

Remember:

```jsx
Await
```

starts with a capital letter because it is a React component.

---

# 9. Import `<Suspense>`

`Suspense` is provided by React.

```jsx
import { Suspense } from "react";
```

We can use it to display fallback UI while the Promise is still pending.

For example:

```jsx
<Suspense fallback={<h2>Loading...</h2>}>
```

The fallback is displayed while the Promise has not resolved.

---

# 10. Use `<Suspense>`

Our component can now look like:

```jsx
function Recipes() {

    const { recipes } = useLoaderData();

    return (
        <Suspense fallback={<h2>Loading...</h2>}>

            {/* Await goes here */}

        </Suspense>
    );
}
```

Now the user immediately sees:

```text
Loading...
```

instead of a blank page.

---

# 11. Use `<Await>`

Inside `<Suspense>`:

```jsx
<Await resolve={recipes}>
```

The `resolve` prop tells `<Await>` which Promise it should wait for.

```jsx
<Await resolve={recipes}>
```

Here:

```jsx
recipes
```

is the Promise returned by:

```jsx
getRecipes()
```

---

# 12. Get the resolved data

`<Await>` provides the resolved value to its child function.

```jsx
<Await resolve={recipes}>
    {(list) => (
        ...
    )}
</Await>
```

Once the Promise resolves:

```jsx
list
```

contains the actual recipe array.

So:

```text
recipes
   ↓
Promise
   ↓
Await waits
   ↓
Promise resolves
   ↓
list = recipe array
```

---

# 13. Display the recipes

Now we can map over the resolved data:

```jsx
<Await resolve={recipes}>
    {(list) => (
        list.map((recipe) => (
            <div key={recipe.id}>
                {recipe.name}
            </div>
        ))
    )}
</Await>
```

Notice that we can safely use:

```jsx
list.map(...)
```

because `list` is now the resolved array.

---

# 14. Complete `Recipes.jsx`

```jsx
import { Await, useLoaderData } from "react-router";
import { Suspense } from "react";
import { getRecipes } from "./utils";

export function loader() {

    const recipesPromise = getRecipes();

    return {
        recipes: recipesPromise
    };
}

export default function Recipes() {

    const { recipes } = useLoaderData();

    return (
        <Suspense fallback={<h2>Loading...</h2>}>

            <Await resolve={recipes}>
                {(list) => (
                    list.map((recipe) => (
                        <div key={recipe.id}>
                            {recipe.name}
                        </div>
                    ))
                )}
            </Await>

        </Suspense>
    );
}
```

---

# 15. Complete flow

The entire process now works like this:

```text
User navigates to /recipes
          ↓
React Router calls loader()
          ↓
loader() calls getRecipes()
          ↓
getRecipes() starts API request
          ↓
Promise returned
          ↓
loader returns:
{
    recipes: Promise
}
          ↓
Recipes component renders
          ↓
<Suspense> sees Promise is pending
          ↓
Displays:
"Loading..."
          ↓
API request finishes
          ↓
Promise resolves
          ↓
<Await resolve={recipes}>
          ↓
Resolved recipe array
          ↓
(list) => ...
          ↓
list.map(...)
          ↓
Recipes displayed
```

---

# 16. Before vs. After

## Before — blocking loader

```jsx
export async function loader() {

    const recipes = await getRecipes();

    return { recipes };
}
```

Flow:

```text
Loader
  ↓
WAIT for API
  ↓
Data received
  ↓
Page renders
```

User experience:

```text
[ Blank Page ]

     ↓

[ Blank Page ]

     ↓

[ Recipes ]
```

---

## After — Promise + `<Await>`

```jsx
export function loader() {

    const recipesPromise = getRecipes();

    return {
        recipes: recipesPromise
    };
}
```

Then:

```jsx
<Suspense fallback={<h2>Loading...</h2>}>
    <Await resolve={recipes}>
        {(list) => (
            list.map(...)
        )}
    </Await>
</Suspense>
```

Flow:

```text
Loader
  ↓
Start API request
  ↓
Return Promise
  ↓
Page renders immediately
  ↓
<Suspense>
  ↓
"Loading..."
  ↓
API completes
  ↓
<Await>
  ↓
Resolved data
  ↓
Recipes displayed
```

This gives the user immediate feedback instead of showing a blank page.

---

# 17. Important concepts to remember

### `await`

```jsx
const recipes = await getRecipes();
```

Means:

> Wait for the Promise to resolve before continuing.

---

### Promise

```jsx
const recipesPromise = getRecipes();
```

Means:

> Start the asynchronous operation and keep the Promise.

---

### `Suspense`

```jsx
<Suspense fallback={<h2>Loading...</h2>}>
```

Means:

> Show fallback UI while the asynchronous content is not ready.

---

### `<Await>`

```jsx
<Await resolve={recipes}>
```

Means:

> Wait for this Promise and provide its resolved value to the child function.

---

### `resolve`

```jsx
resolve={recipes}
```

The value passed to `resolve` should be the Promise that `<Await>` needs to wait for.

---

### Resolved value

```jsx
{(list) => (
    ...
)}
```

`list` is the resolved value of the Promise.

In our example:

```jsx
list
```

is the recipes array.

---

# 18. Key interview explanation

If asked:

**"How can you prevent a slow loader API request from blocking the entire UI?"**

A simple answer:

> Instead of awaiting the API request inside the loader, I can return the Promise from the loader. Then I can use React's `Suspense` to show fallback UI while the Promise is pending and React Router's `<Await>` component to render the data once the Promise resolves.

Example:

```jsx
export function loader() {
    return {
        recipes: getRecipes()
    };
}
```

Then:

```jsx
<Suspense fallback={<h2>Loading...</h2>}>
    <Await resolve={recipes}>
        {(list) => (
            list.map((recipe) => (
                <div key={recipe.id}>
                    {recipe.name}
                </div>
            ))
        )}
    </Await>
</Suspense>
```

---

# 19. One important distinction

This approach does **not** mean that the API call becomes synchronous.

The API call is still asynchronous.

The difference is **when the UI is allowed to render**.

### Blocking approach

```text
API must finish
      ↓
then UI renders
```

### Deferred approach

```text
API starts
      ↓
UI renders Loading...
      ↓
API finishes
      ↓
Recipes render
```

That is the main reason we use `<Suspense>` and `<Await>` here.

---

# 20. Mental model

Think of it like ordering food at a restaurant.

### Without deferred loading

```text
You order food
     ↓
Wait at the counter
     ↓
Food is ready
     ↓
You are allowed to sit down
```

### With deferred loading

```text
You order food
     ↓
You sit down immediately
     ↓
"Your food is being prepared..."
     ↓
Food is ready
     ↓
Your food is served
```

`<Suspense>` is essentially your:

```text
"Your food is being prepared..."
```

and `<Await>` is responsible for rendering the food when the Promise resolves.
