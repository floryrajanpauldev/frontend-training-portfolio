# Page Not Found / Catch-All Route

React Router allows us to create a **catch-all route** to handle URLs that do not match any of the routes defined in our application.

This is commonly used to display a **404 Page Not Found** message.

## Why do we need a Page Not Found route?

A user may:

* Enter an incorrect URL manually.
* Click an outdated bookmark.
* Use a URL that existed previously but has since been removed or changed.
* Follow an old link from another website.

Instead of showing a blank page, we can display a friendly Page Not Found component.

## Using `path="*"`

React Router uses `*` as a catch-all path.

```jsx
<Route path="*" element={<PageNotFound />} />
```

The `*` route is used when none of the other routes match the current URL.

## Example

### `App.jsx`

```jsx
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router";

import Home from "./components/Home";
import UsersList from "./components/UsersList";
import UserDetails from "./components/UserDetails";
import About from "./components/About";
import PageNotFound from "./components/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/users" element={<UsersList />} />

        <Route path="/users/:id" element={<UserDetails />} />

        <Route path="/about" element={<About />} />

        {/* Catch-all route */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

## `PageNotFound.jsx`

```jsx
import { Link } from "react-router";

function PageNotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>

      <p>
        Sorry, the page you are looking for does not exist.
      </p>

      <Link to="/">
        Go back to Home
      </Link>
    </div>
  );
}

export default PageNotFound;
```

## How it works

If the user visits:

```text
/users
```

React Router finds:

```jsx
<Route path="/users" element={<UsersList />} />
```

and displays the Users List.

If the user visits:

```text
/users/10
```

React Router finds:

```jsx
<Route path="/users/:id" element={<UserDetails />} />
```

and displays the User Details page.

But if the user visits:

```text
/abcxyz
```

and no route matches `/abcxyz`, React Router uses:

```jsx
<Route path="*" element={<PageNotFound />} />
```

and displays the Page Not Found component.

## Interview Explanation

**Question: How do you handle a 404 Page Not Found in React Router?**

**Answer:**

> We create a catch-all route using `path="*"`. If none of the defined routes match the current URL, React Router renders the component specified in this route, usually a Page Not Found or 404 component.

```jsx
<Route path="*" element={<PageNotFound />} />
```

## Key Point

`path="*"` acts as the **fallback route** for URLs that don't match any other defined route.
