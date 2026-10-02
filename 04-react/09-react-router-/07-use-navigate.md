# useNavigate

`useNavigate` is used for programmatic navigation.

```jsx
const navigate = useNavigate();

navigate("/dashboard");
```

It is useful when navigation should happen as the result of an action, such as submitting a form or completing a login.

You can also move through browser history:

```jsx
navigate(-1);
```
