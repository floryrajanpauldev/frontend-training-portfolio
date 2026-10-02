# React Router — `navigate()` with `replace: true`

## Overview

When we navigate programmatically using React Router's `useNavigate()`, the navigation normally adds a new entry to the browser's history.

```jsx
navigate("/users");
```

Sometimes, however, we don't want the current page to remain in the browser history.

For example, after a successful login, we usually don't want the user to press the browser **Back** button and return to the Login page.

React Router provides:

```jsx
navigate("/users", { replace: true });
```

The `replace: true` option replaces the current history entry instead of adding a new one.

---

# 1. The Problem

Consider this scenario:

```text
Home
  ↓
User clicks "Users"
  ↓
Login
  ↓
Successful Login
  ↓
Users
```

Without `replace: true`, the browser history can look like:

```text
Home → Login → Users
```

Now the user is on the Users page.

If they click the browser Back button:

```text
Users
  ↓ Back
Login
```

This is not a good user experience because the user has already successfully logged in.

They may wonder:

> "Why am I seeing the Login page again?"

---

# 2. The Solution

Use:

```jsx
navigate("/users", { replace: true });
```

Now the Login history entry is replaced.

The history effectively becomes:

```text
Home → Users
```

So when the user clicks Back:

```text
Users
  ↓ Back
Home
```

This is usually the desired behavior.

---

# 3. `push` vs `replace`

### Normal navigation

```jsx
navigate("/users");
```

This adds a new entry to the browser history.

```text
Home → Login → Users
```

### Navigation with `replace`

```jsx
navigate("/users", { replace: true });
```

This replaces the current history entry.

```text
Home → Users
```

---

# 4. Important Concept

Think of browser history as a stack of pages.

### Without `replace`

```text
Home
Login
Users  ← current
```

`navigate("/users")` adds another entry.

### With `replace`

```text
Home
Users  ← current
```

The Login entry is replaced.

---

# 5. Login Example

In the Login component:

```jsx
const handleSubmit = (event) => {
  event.preventDefault();

  // Login/API logic...

  navigate("/users", { replace: true });
};
```

The important part is:

```jsx
{ replace: true }
```

---

# 6. Complete Flow

Our example application has three pages:

```text
Home
  |
  | Click Users
  ↓
Login
  |
  | Successful login
  ↓
Users
```

The Login page uses:

```jsx
navigate("/users", { replace: true });
```

Therefore:

```text
Browser History

Before login:
Home → Login

After successful login:
Home → Users
```

Clicking Back from Users takes the user to:

```text
Users → Home
```

instead of:

```text
Users → Login
```

---

# 7. When Should We Use `replace: true`?

`replace: true` is useful when the current route is an **intermediate step** and should not remain in the user's navigation history.

Common examples include:

### After Login

```jsx
navigate("/dashboard", { replace: true });
```

### After Logout

```jsx
navigate("/login", { replace: true });
```

### After Completing a Form

```jsx
navigate("/success", { replace: true });
```

### After Redirecting From an Invalid Route

```jsx
navigate("/home", { replace: true });
```

The exact choice depends on the desired browser Back-button behavior.

---

# 8. `navigate()` Syntax

The basic syntax is:

```jsx
navigate("/path");
```

With options:

```jsx
navigate("/path", {
  replace: true,
});
```

`replace` is an option provided to the navigation function.

---

# 9. Interview Question

### What is the difference between `navigate("/users")` and `navigate("/users", { replace: true })`?

**Answer:**

`navigate("/users")` adds `/users` as a new entry in the browser history.

```jsx
navigate("/users");
```

`navigate("/users", { replace: true })` replaces the current history entry with `/users`.

```jsx
navigate("/users", { replace: true });
```

This is useful when we don't want the user to return to the previous route using the browser Back button, such as after a successful login.

---

# 10. Important Correction

It is common to say:

> "`replace: true` skips the previous page."

A more technically accurate explanation is:

> **"`replace: true` replaces the current history entry instead of adding a new history entry."**

In the Login example, this has the effect of preventing Login from remaining as the previous history entry.

---

# 11. Files in This Example

```text
24-navigate-replace/
│
├── 24-navigate-replace.md
├── Login.jsx
├── Home.jsx
├── Users.jsx
└── App.jsx
```

---

# Key Takeaway

```jsx
navigate("/users");
```

➡️ Add a new history entry.

```jsx
navigate("/users", { replace: true });
```

➡️ Replace the current history entry.

### Authentication example

```text
Home → Login → Users
              ↑
       replace: true
```

After replacement:

```text
Home → Users
```

Therefore:

```text
Users
  ↓ Back
Home
```

instead of:

```text
Users
  ↓ Back
Login
```

This provides a better navigation experience after successful authentication.
