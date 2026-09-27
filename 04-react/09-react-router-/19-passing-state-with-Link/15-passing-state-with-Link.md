# React Router - Passing State with `Link`

React Router's `Link` component allows us to pass additional information during navigation using the `state` prop.

This is useful when navigating from a list page to a details page and we want the details page to remember information about the page we came from.

## Example Scenario

Suppose the user has filtered and sorted the user list.

The URL is:

```text
/users?username=bret&sort=asc
```

The user clicks **Bret** and navigates to the User Details page.

We can pass the current search information through the `state` attribute of `Link`.

```jsx
<Link
  to={`${user.id}`}
  state={{
    searchFilter: `?${searchParams}`,
    username: user.username
  }}
>
  {user.username}
</Link>
```

The details page URL might be:

```text
/users/1
```

while the navigation state contains:

```jsx
{
  searchFilter: "?username=bret&sort=asc",
  username: "Bret"
}
```

## Reading the navigation state

On the User Details page, we can use `useLocation()`:

```jsx
import { useLocation } from "react-router";

const location = useLocation();

const backLink = location?.state?.searchFilter || "";

const username = location?.state?.username || "";
```

We can determine what text should be displayed for the Back link:

```jsx
const isUsername = location.state?.searchFilter?.includes("username")
  ? username
  : "User List";
```

Notice the optional chaining:

```jsx
?.includes()
```

This prevents an error if `searchFilter` does not exist.

## Creating the Back Link

```jsx
<Link to={`..${backLink}`} relative="path">
  Back to {isUsername}
</Link>
```

If the user originally came from:

```text
/users?username=bret&sort=asc
```

the Back link takes the user back to:

```text
/users?username=bret&sort=asc
```

and displays:

```text
Back to Bret
```

## Complete Flow

```text
/users?username=bret&sort=asc
          |
          | Click Bret
          v
/users/1
          +
navigation state:
{
  searchFilter: "?username=bret&sort=asc",
  username: "Bret"
}
          |
          | Click Back to Bret
          v
/users?username=bret&sort=asc
```

## Query Parameters vs Navigation State

These two concepts are different.

### Query parameters

```text
/users?username=bret&sort=asc
```

They are part of the URL and can be bookmarked, refreshed and shared.

### Navigation state

```jsx
state={{
  searchFilter: "...",
  username: "Bret"
}}
```

It is additional information passed along with the navigation.

Navigation state is useful for temporary navigation context. It should not replace query parameters when information needs to be represented in a shareable URL.

## Key Interview Point

> The `state` prop of `Link` allows us to pass additional navigation state to the destination route. The destination component can access that state using `useLocation()`.
