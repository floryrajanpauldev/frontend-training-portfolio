# NavLink

`NavLink` is useful for navigation links where the application needs to know whether the link is currently active.

```jsx
<NavLink
  to="/products"
  className={({ isActive }) =>
    isActive ? "nav-link active" : "nav-link"
  }
>
  Products
</NavLink>
```

## isActive and destructuring

React Router provides `isActive` to the `className` function. Destructuring lets us write:

```jsx
({ isActive }) =>
  isActive ? "nav-link active" : "nav-link"
```

## aria-current

An active `NavLink` automatically receives an appropriate `aria-current` value, helping assistive technologies identify the current page.

## end

For a link to `/`, use `end` when it should be active only at the exact root route:

```jsx
<NavLink to="/" end>
  Home
</NavLink>
```
