# Relative Navigation: `.` and `..`

Relative links are useful when navigating within nested routes.

```jsx
<Link to=".." relative="path">Back to UserList</Link>
```

`..` means **go one level up**. With `/users/101`, path-relative navigation takes the URL to `/users`.

- `relative="route"` resolves relative navigation against the route hierarchy. This is the default for `Link`.
- `relative="path"` resolves relative navigation against the URL path.
- `.` means the current route/location.

For example:

```jsx
<Link to=".">Clear</Link>
```

keeps the user on the current route. When used from `/users?username=kamren`, it can navigate to `/users` and remove the query string.
