# Basic Routing

React Router lets a React application display different components for different URL paths.

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<Contact />} />
  </Routes>
</BrowserRouter>
```

- `BrowserRouter` provides routing context.
- `Routes` contains the route definitions.
- `Route` connects a URL path to a React element.
