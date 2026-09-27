# Nested Routes and Outlet

Nested routes allow child routes to render inside a parent layout.

```jsx
<Route path="dashboard" element={<Dashboard />}>
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

The parent renders the child route through `<Outlet />`:

```jsx
function Dashboard() {
  return (
    <>
      <h1>Dashboard</h1>
      <Outlet />
    </>
  );
}
```
