# 21 - Handling Errors with `useRouteError()`

React Router provides a way to handle errors that occur while processing a route.

We can use the `errorElement` attribute on a `<Route>` to tell React Router which component should be displayed when an error occurs.

The `useRouteError()` hook allows the error component to access information about the error.

---

## 1. Create an Error Page

Create `ErrorPage.jsx`.

```jsx
import { useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <h1>Technical Difficulties</h1>
      <p>Something went wrong while loading the recipes.</p>
      <p>{error.data}</p>
    </>
  );
}

export default ErrorPage;
```

---

## 2. Add `errorElement` to the Route

In our route configuration, we can add the `errorElement` attribute.

```jsx
<Route
  path="recipes"
  element={<Recipes />}
  loader={recipesLoader}
  errorElement={<ErrorPage />}
/>
```

### What does `errorElement` do?

`errorElement` tells React Router which component to render when an error occurs while processing the route.

In our example:

```jsx
errorElement={<ErrorPage />}
```

React Router will render `ErrorPage` when an error occurs.

---

## 3. Throw an Error from the Loader

Suppose the API URL is incorrect.

In `RecipesLoader.jsx`:

```jsx
export const recipesLoader = async () => {
  const response = await fetch("incorrect-api-url");

  if (!response.ok) {
    throw new Response("Failed to load the recipes");
  }

  return response.json();
};
```

The important part is:

```jsx
if (!response.ok) {
  throw new Response("Failed to load the recipes");
}
```

Instead of continuing with a failed response, we throw an error.

React Router catches the error and renders the component specified by `errorElement`.

---

## 4. Access the Error Using `useRouteError()`

Inside `ErrorPage.jsx`:

```jsx
const error = useRouteError();
```

`useRouteError()` gives us access to the error caught by React Router.

We can then display the error message:

```jsx
<p>{error.data}</p>
```

Because our loader throws:

```jsx
throw new Response("Failed to load the recipes");
```

`error.data` contains:

```text
Failed to load the recipes
```

---

## 5. Passing a Status Code

We can also include a status code when creating the `Response`.

```jsx
if (!response.ok) {
  throw new Response("Failed to load the recipes", {
    status: response.status,
  });
}
```

Then we can access the status in `ErrorPage.jsx`:

```jsx
const error = useRouteError();

return (
  <>
    <h1>Technical Difficulties</h1>
    <p>Something went wrong while loading the recipes.</p>
    <p>Status: {error.status}</p>
    <p>{error.data}</p>
  </>
);
```

---

## 6. Complete Example

### `RecipesLoader.jsx`

```jsx
export const recipesLoader = async () => {
  const response = await fetch("incorrect-api-url");

  if (!response.ok) {
    throw new Response("Failed to load the recipes", {
      status: response.status,
    });
  }

  return response.json();
};
```

### `ErrorPage.jsx`

```jsx
import { useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <h1>Technical Difficulties</h1>
      <p>Something went wrong while loading the recipes.</p>
      <p>Status: {error.status}</p>
      <p>{error.data}</p>
    </>
  );
}

export default ErrorPage;
```

---

## 7. Error Handling Flow

```text
User visits /recipes
        ↓
React Router runs recipesLoader
        ↓
API request fails
        ↓
response.ok === false
        ↓
throw new Response(...)
        ↓
React Router catches the error
        ↓
errorElement renders <ErrorPage />
        ↓
useRouteError() gets the error
        ↓
error.data displays the error message
```

---

## 8. Important Points

### `errorElement`

Specifies the component React Router should render when an error occurs for that route.

```jsx
errorElement={<ErrorPage />}
```

### `useRouteError()`

A React Router hook that provides access to the error caught by the router.

```jsx
const error = useRouteError();
```

### `error.data`

Can contain the data/message from a thrown `Response`.

```jsx
<p>{error.data}</p>
```

### `error.status`

Can contain the HTTP status code when a status was supplied with the thrown `Response`.

```jsx
<p>Status: {error.status}</p>
```

---

## 9. Interview Question

### How do you handle errors in React Router?

We can use the `errorElement` attribute on a route to specify an error UI component.

When an error occurs, React Router renders the `errorElement`.

Inside the error component, we can use `useRouteError()` to access information about the error.

For example:

```jsx
<Route
  path="recipes"
  element={<Recipes />}
  loader={recipesLoader}
  errorElement={<ErrorPage />}
/>
```

And inside `ErrorPage`:

```jsx
const error = useRouteError();
```

This allows us to display useful error information to the user.

---

## 10. Important Note

`useRouteError()` is not limited to errors from loaders.

React Router's route error handling can also handle errors from other route processing, including actions and route rendering.

The basic concept is:

**Throw the error → React Router catches it → `errorElement` renders → `useRouteError()` provides the error details.**
