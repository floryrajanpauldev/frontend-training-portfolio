# Index Routes

An index route is the default child route displayed when the parent URL is matched.

```jsx
<Route path="dashboard" element={<Dashboard />}>
  <Route index element={<DashboardHome />} />
  <Route path="profile" element={<Profile />} />
  <Route path="settings" element={<Settings />} />
</Route>
```

When the URL is `/dashboard`, the index route renders inside the parent's `<Outlet />`.
