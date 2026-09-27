# React Router - Pagination with `useSearchParams`

Query parameters can also be used to represent pagination.

For example:

```text
/users?page=1
```

## Reading the page number

```jsx
const page = Number(searchParams.get("page")) || 1;
```

For:

```text
/users?page=2
```

```jsx
searchParams.get("page");
```

returns:

```text
2
```

Since the value returned from `get()` is a string, we convert it to a number using `Number()`.

## Calculating which users to display

Suppose we want to display 3 users per page:

```jsx
const usersPerPage = 3;
```

We calculate the starting index:

```jsx
const startIndex = (page - 1) * usersPerPage;
```

and the ending index:

```jsx
const endIndex = startIndex + usersPerPage;
```

Then:

```jsx
const currentUsers = users.slice(startIndex, endIndex);
```

### Page 1

```text
page = 1
startIndex = 0
endIndex = 3
```

Users 0, 1 and 2 are displayed.

### Page 2

```text
page = 2
startIndex = 3
endIndex = 6
```

Users 3, 4 and 5 are displayed.

## Updating the page

We can update the page while preserving other query parameters:

```jsx
const params = new URLSearchParams(searchParams);

params.set("page", "2");

setSearchParams(params);
```

For example:

```text
/users?username=kamren&sort=asc&page=2
```

## Combining filtering, sorting and pagination

A real-world URL can contain all three:

```text
/users?username=kamren&sort=asc&page=2
```

This URL represents:

* `username=kamren` → filter
* `sort=asc` → sorting
* `page=2` → pagination

## Resetting pagination

When the filter or sort changes, it is usually appropriate to reset the page back to `1`.

For example:

```jsx
params.set("page", "1");
```

Otherwise, the user might remain on a page number that no longer exists after applying a new filter.

## Key Interview Point

> `useSearchParams` can be used to keep pagination state in the URL. This makes the current page bookmarkable, shareable and restorable after a refresh.
