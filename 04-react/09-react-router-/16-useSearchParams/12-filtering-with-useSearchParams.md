# React Router - Filtering with `useSearchParams`

Query parameters allow us to keep filter information in the URL.

For example:

```text
/users?username=bret
```

React Router provides the `useSearchParams` hook to read and update query parameters.

## Reading the query parameter

```jsx
const [searchParams, setSearchParams] = useSearchParams();

const username = searchParams.get("username") || "";
```

The `get()` method reads the value of a query parameter.

For:

```text
/users?username=bret
```

```jsx
searchParams.get("username");
```

returns:

```text
bret
```

## Updating the query parameter

We can update the URL using `setSearchParams()`:

```jsx
setSearchParams({ username: "bret" });
```

The URL becomes:

```text
/users?username=bret
```

If the input is cleared:

```jsx
setSearchParams({});
```

the query parameter is removed.

## Filtering the user list

We can use the value from the URL to filter our users:

```jsx
const filteredUsers = users.filter((user) =>
  user.username.toLowerCase().includes(username.toLowerCase())
);
```

## Why use query parameters for filtering?

Instead of keeping the filter only in React state, putting it in the URL means that the current filtered view can be:

* Bookmarked
* Refreshed without losing the filter
* Shared with another user

For example:

```text
/users?username=bret
```

Anyone opening this URL can see the same filter.

## Real-world example

The user enters `bret` in the search input.

The URL becomes:

```text
/users?username=bret
```

The application reads:

```jsx
searchParams.get("username");
```

and gets:

```text
bret
```

The user list is then filtered based on that value.

## Key Interview Point

> `useSearchParams` is used to read and update query parameters in the URL. Query parameters are useful for representing UI state such as filtering, sorting, and pagination.
