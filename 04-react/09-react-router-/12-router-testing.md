# Testing React Router

`MemoryRouter` is useful for testing routing without depending on the browser URL.

```jsx
<MemoryRouter initialEntries={["/users/101"]}>
  <Routes>
    <Route path="/users/:id" element={<UserDetails />} />
  </Routes>
</MemoryRouter>
```

`initialEntries` lets a test start at a specific route. React Testing Library can then be used to render the router and verify what appears for that location.
