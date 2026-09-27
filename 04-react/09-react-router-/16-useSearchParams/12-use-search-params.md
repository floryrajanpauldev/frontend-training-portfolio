# useSearchParams

`useSearchParams` is useful when search, filtering, sorting, pagination, or other criteria should be represented in the URL.

## Query parameters

For this URL:

```text
/users?username=kamren&sort=asc&page=2
```

- `username=kamren` is a query parameter used for filtering.
- `sort=asc` is a query parameter used for sorting.
- `page=2` is a query parameter used for pagination.

The query string begins after `?`. A URL can also contain a fragment after `#`, such as `#card-container`; that fragment is not a search parameter.

## Reading parameters

```jsx
const [searchParams, setSearchParams] = useSearchParams();

const usernameFilter = searchParams.get("username") || "";
const sort = searchParams.get("sort") || "asc";
const page = Number(searchParams.get("page")) || 1;
```

## Updating parameters

```jsx
setSearchParams({ username: "kamren" });
```

Updating search parameters changes the URL and causes navigation.

Buttons can also update them:

```jsx
<button onClick={() => setSearchParams({ username: "bret" })}>
  Bret
</button>

<button onClick={() => setSearchParams({ username: "kamren" })}>
  Kamren
</button>

<button onClick={() => setSearchParams({})}>
  Clear
</button>
```

## Input-driven search

The input can be connected to React state, and the state can update the URL:

```jsx
const usernameFilter = searchParams.get("username") || "";
const [username, setUsername] = useState(usernameFilter);

useEffect(() => {
  const params = {};

  if (username) params.username = username;
  setSearchParams(params);
}, [username, setSearchParams]);
```

## Sorting

```jsx
const sortedUserList = [...filteredUserList].sort((a, b) =>
  sort === "asc"
    ? a.username.localeCompare(b.username)
    : b.username.localeCompare(a.username)
);
```

The spread creates a copy because `sort()` mutates an array.

## Pagination

A page number can also live in the URL:

```text
/users?page=2
```

For three users per page:

```jsx
const usersPerPage = 3;
const startIndex = (page - 1) * usersPerPage;

const paginatedUsers = userList.slice(
  startIndex,
  startIndex + usersPerPage
);
```

The Next button can update the URL:

```jsx
setSearchParams({ page: page + 1 });
```

## Real-world combined example

An e-commerce product page could use:

```text
/products?search=laptop&category=electronics&brand=Apple&sort=price-asc&page=2
```

This lets the URL represent the current search, filters, sorting, and page. The URL can then be refreshed, bookmarked, or shared and used to recreate that view.
