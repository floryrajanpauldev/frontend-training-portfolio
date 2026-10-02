# useOutletContext

`useOutletContext` allows a parent route to pass values to its child routes through `<Outlet context={...} />`.

## Why use it?

If `UserList` and `UserDetails` are both children of `ResourceLayout`, the parent can make the users API call once and share the result with both child routes.

Parent:

```jsx
<Outlet context={userList} />
```

Child:

```jsx
const userList = useOutletContext();
```

The context can contain any value, including an array, object, state value, or function.

Multiple values can be passed as an object:

```jsx
<Outlet context={{ userList, isLoading, refreshUsers }} />
```

Then:

```jsx
const { userList, isLoading, refreshUsers } = useOutletContext();
```
