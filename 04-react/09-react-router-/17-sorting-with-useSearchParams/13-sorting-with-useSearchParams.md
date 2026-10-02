# React Router - Sorting with `useSearchParams`

We can use query parameters to store sorting information in the URL.

For example:

```text
/users?sort=asc
```

We can also combine sorting with filtering:

```text
/users?username=bret&sort=asc
```

## Reading the sort value

```jsx
const sort = searchParams.get("sort") || "asc";
```

If the URL contains:

```text
?sort=asc
```

then:

```jsx
searchParams.get("sort");
```

returns:

```text
asc
```

## Updating the sort value

We can update the query parameter:

```jsx
const params = new URLSearchParams(searchParams);

params.set("sort", "desc");

setSearchParams(params);
```

The URL becomes:

```text
/users?username=bret&sort=desc
```

Notice that the existing `username` parameter is preserved.

## Why create a new `URLSearchParams`?

If we want to change only one query parameter while keeping the others, we can create a copy:

```jsx
const params = new URLSearchParams(searchParams);
```

Then change only the parameter we need:

```jsx
params.set("sort", "desc");
```

Finally:

```jsx
setSearchParams(params);
```

## Sorting the users

After filtering the users, we can sort them:

```jsx
const sortedUsers = [...filteredUsers].sort((a, b) => {
  return sort === "asc"
    ? a.username.localeCompare(b.username)
    : b.username.localeCompare(a.username);
});
```

We use the spread operator:

```jsx
[...filteredUsers]
```

so that we don't directly mutate the original filtered array.

## Combining filtering and sorting

The URL can represent both pieces of UI state:

```text
/users?username=bret&sort=asc
```

This gives us a shareable and bookmarkable representation of the current view.

## Key Interview Point

> Query parameters can represent UI state such as filtering and sorting. When updating one parameter, we can preserve the existing parameters by creating a `URLSearchParams` copy and changing only the required value.
