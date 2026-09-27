# Protected Routes

## What are Protected Routes?

Protected routes are routes that should only be accessible to authenticated users.

For example, an application may have:

```text
/login          → Public
/               → Public or Protected depending on the application
/users          → Protected
/recipes        → Protected
/benefits       → Protected
/profile        → Protected
```

If a user who is not logged in tries to access a protected route, we redirect the user to the `/login` page.

The basic flow is:

```text
User requests protected route
            ↓
      Check authentication
            ↓
      Is user logged in?
        ↙          ↘
      No            Yes
       ↓             ↓
  /login         Protected page
```

### Important Security Note

Frontend route protection should not be considered a replacement for backend security.

A user can potentially bypass the React application and make an API request directly.

Therefore:

* The frontend should protect the UI/routes.
* The backend/API must independently authenticate and authorize requests.
* Sensitive data must be protected on the server.

---

# Two Approaches to Protected Routes

There are two approaches we can demonstrate:

1. Traditional approach using an authentication layout
2. Loader approach using React Router's data APIs

---

# 1. Traditional Approach

In the traditional approach, we create an authentication layout.

The authentication layout:

1. Checks whether the user is logged in.
2. If the user is not logged in, redirects to `/login`.
3. If the user is logged in, renders the child route using `<Outlet />`.

## AuthenticateLayout.jsx

```jsx
import { Outlet, Navigate } from "react-router";

function AuthenticateLayout() {
  // In a real application, make an API call
  // or check authentication state here.
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default AuthenticateLayout;
```

## Understanding `<Outlet />`

`AuthenticateLayout` is a parent route.

The child routes are rendered where `<Outlet />` appears.

For example:

```jsx
<Route path="/" element={<AuthenticateLayout />}>
  <Route index element={<Home />} />
  <Route path="users" element={<UserList />} />
</Route>
```

If the user is authenticated:

```text
AuthenticateLayout
       ↓
    <Outlet />
       ↓
     UserList
```

If the user is not authenticated:

```text
AuthenticateLayout
       ↓
   isLoggedIn = false
       ↓
Navigate to /login
```

---

# Why is Login Outside AuthenticateLayout?

The login route must NOT be wrapped inside the authentication layout.

```jsx
<Route path="/" element={<AuthenticateLayout />}>
  <Route index element={<Home />} />
  <Route path="users" element={<UserList />} />
</Route>

<Route path="/login" element={<Login />} />
```

The `/login` route is outside `AuthenticateLayout` because the user must be able to access the login page without already being authenticated.

If `/login` were placed inside the authentication layout:

```text
/login
   ↓
AuthenticateLayout
   ↓
User is not logged in
   ↓
Navigate to /login
   ↓
AuthenticateLayout
   ↓
User is not logged in
   ↓
Navigate to /login
   ↓
...
```

This would create a redirect loop.

---

# Traditional Approach Flow

```text
User requests /users
        ↓
AuthenticateLayout
        ↓
Check authentication
        ↓
   ┌────┴────┐
   ↓         ↓
 false      true
   ↓         ↓
 /login    Outlet
             ↓
          UserList
```

This approach is useful when several routes should share the same authentication requirement.

---

# 2. Loader Approach

React Router also provides data APIs such as loaders.

A loader runs as part of the route navigation process.

Instead of checking authentication inside the component, we can check authentication in the route's loader.

For example:

```jsx
<Route
  path="/users"
  element={<UserList />}
  loader={userLoader}
/>
```

The loader can check authentication before loading the protected route's data.

---

# Loader Protected Route Flow

```text
User requests /users
        ↓
    userLoader
        ↓
 Check authentication
        ↓
   ┌────┴────┐
   ↓         ↓
 false      true
   ↓         ↓
 /login    Fetch data
             ↓
          UserList
```

If authentication fails, we redirect to `/login`.

---

# `redirect()` vs `<Navigate />`

The traditional approach uses:

```jsx
<Navigate to="/login" />
```

`Navigate` is a React component.

It can be used when rendering a component and we want to navigate as part of the existing component flow.

The loader approach uses:

```jsx
throw redirect("/login");
```

`redirect()` is used inside data-router functions such as loaders.

Example:

```jsx
export async function loader() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    throw redirect("/login");
  }
}
```

We use `throw` so that React Router stops the current loader/navigation and performs the redirect.

---

# Protecting a Single Route

If only `/users` needs authentication, we can add a loader to that route.

```jsx
<Route
  path="/users"
  element={<UserList />}
  loader={userLoader}
/>
```

This allows authentication to be applied only to the route that requires it.

---

# 3. Reusing the Authentication Check

If multiple routes need authentication, we do not want to duplicate this code:

```jsx
const isLoggedIn = false;

if (!isLoggedIn) {
  throw redirect("/login");
}
```

in every loader.

Instead, we create a reusable utility function.

## utils.js

```jsx
import { redirect } from "react-router";

export async function requireAuth() {
  // In a real application, make an API call
  // or check the authentication/session state.
  const isLoggedIn = false;

  if (!isLoggedIn) {
    throw redirect("/login");
  }
}
```

The name `requireAuth()` clearly communicates what the function does:

> Require the user to be authenticated. Otherwise redirect to `/login`.

---

# 4. Protecting a Route That Does Not Have Its Own API Call

Suppose the `Benefits` component does not need to fetch any data.

We still want to protect the route.

We can create a loader just for authentication:

```jsx
<Route
  path="/benefits"
  element={<Benefits />}
  loader={async () => {
    await requireAuth();
    return null;
  }}
/>
```

The flow is:

```text
/benefits
   ↓
loader
   ↓
requireAuth()
   ↓
Is user authenticated?
   ↓
Yes → Benefits
No  → /login
```

---

# 5. Protected Route With Its Own Data Loader

Now consider the `/users` route.

It has two responsibilities:

1. Check authentication.
2. Fetch user data.

We can do both inside the loader.

## UserList.jsx

```jsx
import { useLoaderData } from "react-router";
import { requireAuth } from "./utils";

export async function loader() {
  await requireAuth();

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}

function UserList() {
  const users = useLoaderData();

  return (
    <div>
      <h2>User List</h2>

      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
    </div>
  );
}

export default UserList;
```

The important sequence is:

```text
loader()
   ↓
requireAuth()
   ↓
Authentication successful?
   ↓
Fetch users
   ↓
Return users
   ↓
UserList renders
```

If authentication fails, the fetch does not happen because `requireAuth()` redirects first.

---

# 6. Another Protected Route With Its Own Loader

The `/recipes` route can have its own loader.

## Recipes.jsx

```jsx
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

  return (
    <div>
      <h2>Recipes</h2>

      {data.recipes.map((recipe) => (
        <p key={recipe.id}>{recipe.name}</p>
      ))}
    </div>
  );
}

export default Recipes;
```

Again:

```text
loader()
   ↓
requireAuth()
   ↓
Authentication successful?
   ↓
Fetch recipes
   ↓
Return recipes
   ↓
Recipes renders
```

---

# 7. Multiple Protected Routes

Now we can have multiple routes with different loaders while sharing the same authentication function.

```jsx
<Route
  path="/benefits"
  element={<Benefits />}
  loader={async () => {
    await requireAuth();
    return null;
  }}
/>

<Route
  path="/users"
  element={<UserList />}
  loader={userLoader}
/>

<Route
  path="/recipes"
  element={<Recipes />}
  loader={recipesLoader}
/>
```

The important idea is:

```text
                   requireAuth()
                        ↑
          ┌─────────────┼─────────────┐
          │             │             │
       Benefits        Users        Recipes
          │             │             │
       no API         API call      API call
```

We have one common authentication implementation, but each route can have its own loader.

---

# 8. Exporting Loaders From Components

We can export the loader directly from the component file.

For example, in `UserList.jsx`:

```jsx
export async function loader() {
  await requireAuth();

  // Fetch users...
}
```

Then in `App.jsx`:

```jsx
import UserList, {
  loader as userLoader
} from "./UserList";
```

And:

```jsx
<Route
  path="/users"
  element={<UserList />}
  loader={userLoader}
/>
```

Similarly, for recipes:

```jsx
import Recipes, {
  loader as recipesLoader
} from "./Recipes";
```

Then:

```jsx
<Route
  path="/recipes"
  element={<Recipes />}
  loader={recipesLoader}
/>
```

The alias makes the purpose clear:

```jsx
loader as userLoader
loader as recipesLoader
```

---

# 9. Traditional vs Loader Approach

## Traditional Authentication Layout

```jsx
<Route path="/" element={<AuthenticateLayout />}>
  <Route index element={<Home />} />
  <Route path="users" element={<UserList />} />
</Route>
```

Authentication happens in:

```jsx
<AuthenticateLayout />
```

The child route is rendered through:

```jsx
<Outlet />
```

### Flow

```text
Route
 ↓
AuthenticateLayout
 ↓
Check authentication
 ↓
Outlet
 ↓
Child component
```

---

## Loader Approach

```jsx
<Route
  path="/users"
  element={<UserList />}
  loader={userLoader}
/>
```

Authentication happens in:

```jsx
userLoader
```

### Flow

```text
Route requested
 ↓
Loader
 ↓
Check authentication
 ↓
Fetch data
 ↓
Component renders
```

---

# 10. Why Loaders Are Useful for Data Loading

One of the ideas behind React Router's data APIs is that routing and data loading can be coordinated by the router.

With a traditional component-based fetch, we might have:

```text
Route
 ↓
Component renders
 ↓
useEffect()
 ↓
API request
 ↓
Data arrives
 ↓
Component updates
```

With a loader:

```text
Route requested
 ↓
Loader runs
 ↓
Data requested
 ↓
Component receives loader data
 ↓
Component renders with data
```

The router can also coordinate loaders for multiple matched routes, which is one of the advantages of the data-router model.

This is related to the concepts demonstrated by Remix, which was built by the team behind React Router and influenced React Router's data APIs.

The important idea is that routing, authentication checks, and data loading can be coordinated instead of putting all data-fetching logic inside components.

---

# 11. Authentication + Data Loading

A loader can perform both authentication and data loading.

For example:

```jsx
export async function loader() {
  await requireAuth();

  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  return response.json();
}
```

The sequence is:

```text
Authenticate
     ↓
If not authenticated
     ↓
Redirect to /login

If authenticated
     ↓
Fetch protected data
     ↓
Return data
     ↓
Render component
```

This makes the loader a good place for route-specific authorization checks and data requirements.

---

# 12. Important Security Reminder

A React Router protected route does NOT make an API secure by itself.

For example, even if `/users` is protected:

```jsx
<Route
  path="/users"
  element={<UserList />}
  loader={userLoader}
/>
```

a user could potentially make a request directly to:

```text
https://example.com/api/users
```

without going through the React route.

Therefore, the backend must also verify:

* Is the user authenticated?
* Is the user's session/token valid?
* Is the user authorized to access this resource?

Frontend route protection improves the application flow and prevents unauthorized users from seeing protected UI, but **server-side authentication and authorization are what actually protect sensitive data**.

---

# Summary

### Traditional approach

Use an authentication layout:

```jsx
<AuthenticateLayout>
  <Outlet />
</AuthenticateLayout>
```

The layout checks authentication and either:

```text
Not authenticated → /login
Authenticated → <Outlet />
```

This is useful when many routes share the same authentication requirement.

### Loader approach

Use a loader:

```jsx
<Route
  path="/users"
  element={<UserList />}
  loader={userLoader}
/>
```

The loader can:

1. Check authentication.
2. Redirect if necessary.
3. Fetch route-specific data.
4. Return the data to the component.

### Reusable authentication function

```jsx
export async function requireAuth() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    throw redirect("/login");
  }
}
```

Then individual loaders can reuse it:

```jsx
export async function loader() {
  await requireAuth();

  // Route-specific API call
}
```

### Main difference

```text
Traditional:

Route
 ↓
Authentication Layout
 ↓
Outlet
 ↓
Component


Loader:

Route
 ↓
Loader
 ↓
Authentication
 ↓
Data loading
 ↓
Component
```

The main advantage of the loader approach is that authentication and route-specific data requirements can be handled as part of React Router's data-loading/navigation process rather than placing the logic inside the rendered component.
