# React Router — Data Layer APIs Quiz

### 1. What is the main purpose of a `loader` function in React Router?

**Answer:**
To fetch and provide data for a route before rendering the component.

---

### 2. When using Data Layer APIs such as loaders, you don't need `useState()` and `useEffect()` to fetch and store data for a route. True or False?

**Answer:**
**True**

---

### 3. What are the three basic steps to use a loader in React Router?

**Answer:**

1. Create a `loader` function.
2. Assign the `loader` to the `<Route>`.
3. Use `useLoaderData()` to access the loader data inside the component.

---

### 4. Which hook is used to access data returned by a loader function?

**Answer:**
`useLoaderData()`

---

### 5. What property do we pass to a `<Route>` to handle errors thrown by the route?

**Answer:**
`errorElement`

Example:

```jsx
<Route
    path="/recipes"
    element={<Recipes />}
    errorElement={<ErrorPage />}
/>
```

---

### 6. What is the benefit of using the `<Form>` component from React Router instead of a normal `<form>` tag?

**Answer:**
It submits the form without leaving the page and calls the route's `action` function.

---

### 7. When a React Router `<Form>` is submitted, which function will run?

**Answer:**
The `action` function of the route.

---

### 8. What is the main purpose of an `action` function in React Router?

**Answer:**
An `action` function handles `POST`, `PUT`, and other data-changing requests triggered by a `<Form>`.

---

### 9. When will `useActionData()` get a value?

**Answer:**
After the form is submitted and the route's `action` function returns data.

---

### 10. In a loader or action, what does `redirect("/login")` do in React Router?

**Answer:**
It immediately sends the user to `/login` before the component renders.

---

### 11. The `<Navigate>` component can be used only within the return statement of a component. True or False?

Example:

```jsx
return (
    <Navigate to="/login" />
);
```

**Answer:**
**True**

---

### 12. What is the purpose of `useNavigate()` in React Router?

**Answer:**
It provides a function that can be used to navigate programmatically.

---

### 13. What does `useRouteError()` return?

**Answer:**
The error thrown by the route's `loader` or `action`.

---

### 14. What is `<Await>` used for in React Router?

**Answer:**
To render UI after a Promise from a loader resolves.

---

### 15. Why is `<Suspense>` often used with `<Await>` in React Router?

**Answer:**
To show fallback UI, such as a loading message, while waiting for asynchronous data to resolve.
