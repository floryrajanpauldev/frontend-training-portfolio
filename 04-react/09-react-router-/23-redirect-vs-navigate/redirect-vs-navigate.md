# React Router - `redirect()` vs `<Navigate>`

## Overview

React Router provides two common ways to redirect a user:

1. `redirect()`
2. `<Navigate />`

Although both can send the user to another route, they are used in different situations.

### Basic difference

```text
redirect()
    ↓
Router/data level
    ↓
Used in loaders/actions

<Navigate />
    ↓
React component level
    ↓
Used inside a component
```

---

# 1. `redirect()`

`redirect()` is a React Router utility function.

It is commonly used inside:

* Loaders
* Actions
* React Router data APIs

It allows the router to redirect the user before the route is rendered.

## Syntax

```jsx
return redirect("/");
```

Import:

```jsx
import { redirect } from "react-router";
```

---

## Example: Redirect from a loader

### `RedirectLoader.jsx`

```jsx
import { redirect } from "react-router";

const authLoader = () => {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return redirect("/");
  }

  return null;
};

export default authLoader;
```

Here, `authLoader` is not a React component.

The loader checks whether the user is logged in.

If the user is not logged in:

```jsx
return redirect("/");
```

React Router redirects the user to `/`.

The `Profile` component does not need to render first.

---

# 2. `<Navigate />`

`<Navigate />` is a React Router component.

It is used inside a React component when the component needs to navigate the user to another route.

## Syntax

```jsx
<Navigate to="/" />
```

Import:

```jsx
import { Navigate } from "react-router";
```

---

## Example: Redirect from a component

### `NavigateComponent.jsx`

```jsx
import { Navigate } from "react-router";

function Profile() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <h1>Profile</h1>;
}

export default Profile;
```

Here, `Profile` is a React component.

The component checks the state/value of `isLoggedIn`.

If the user is not logged in:

```jsx
return <Navigate to="/" />;
```

The user is navigated to `/`.

---

# 3. Main difference

| `redirect()`                                    | `<Navigate />`                                   |
| ----------------------------------------------- | ------------------------------------------------ |
| Function                                        | React component                                  |
| Used at the router/data level                   | Used at the component level                      |
| Commonly used in loaders/actions                | Used inside React components                     |
| Can redirect before the route component renders | Component renders and returns `<Navigate />`     |
| Example: authentication check in a loader       | Example: authentication check inside a component |

---

# 4. Loader-level redirect

Consider a protected route:

```jsx
const authLoader = () => {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return redirect("/");
  }

  return null;
};
```

Route:

```jsx
<Route
  path="/profile"
  element={<Profile />}
  loader={authLoader}
/>
```

The flow is:

```text
User visits /profile
        ↓
authLoader runs
        ↓
Is user logged in?
        ↓
      No
        ↓
redirect("/")
        ↓
User goes to /
```

The `Profile` component does not need to handle the redirect itself.

---

# 5. Component-level redirect

The same idea can be handled inside the component:

```jsx
function Profile() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <h1>Profile</h1>;
}
```

The flow is:

```text
User visits /profile
        ↓
Profile component renders
        ↓
Is user logged in?
        ↓
      No
        ↓
<Navigate to="/" />
        ↓
User goes to /
```

---

# 6. When should I use each one?

## Use `redirect()` when:

The redirect belongs to the **routing/data-loading process**.

Common examples:

* Authentication checks in loaders
* Authorization checks in loaders
* Redirecting after an action
* Redirecting based on loader data
* Redirecting before a route is rendered

Example:

```jsx
const loader = () => {
  if (!isAuthenticated()) {
    return redirect("/login");
  }

  return null;
};
```

---

## Use `<Navigate />` when:

The redirect decision belongs to a **React component**.

Common examples:

* Component-level authentication checks
* Conditional rendering
* Redirecting based on component state
* Redirecting when a component determines the user should go somewhere else

Example:

```jsx
function Dashboard() {
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <h1>Dashboard</h1>;
}
```

---

# 7. `redirect()` is NOT limited to utility functions

It is better to describe `redirect()` as a **React Router utility used with the router's data APIs**, rather than simply saying it is used in utility functions.

For example:

```jsx
import { redirect } from "react-router";

export async function action() {
  // perform some operation

  return redirect("/success");
}
```

This is an action, not a general utility function.

---

# 8. Important interview point

### Question:

**What is the difference between `redirect()` and `<Navigate />`?**

### Answer:

> `redirect()` is a React Router utility function commonly used in loaders, actions, and other router data APIs to redirect during the routing/data-processing phase. `<Navigate />` is a React component used inside a React component when the component needs to navigate the user to another route.

---

# 9. Quick memory trick

Think:

```text
redirect()
    → Router
    → Loader / Action
    → Data level
```

and:

```text
<Navigate />
    → React
    → Component
    → UI level
```

### Simple rule

**If the router is making the decision → `redirect()`**

**If the React component is making the decision → `<Navigate />`**

---

# 10. Summary

```text
redirect()
```

* Function
* Imported from `react-router`
* Commonly used in loaders/actions
* Works at the router/data level
* Useful for redirects before rendering the route

```text
<Navigate />
```

* React component
* Imported from `react-router`
* Used inside React components
* Works at the component level
* Useful when component logic determines navigation

Both ultimately navigate the user, but they operate at different levels of the application.
