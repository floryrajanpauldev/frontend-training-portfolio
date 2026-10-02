# Link vs Anchor

Use React Router's `Link` for client-side navigation:

```jsx
<Link to="/about">About</Link>
```

A normal anchor uses the browser's normal document navigation:

```jsx
<a href="/about">About</a>
```

For routes inside a React SPA, `Link` is generally used so React Router can handle the navigation without a full document reload.
