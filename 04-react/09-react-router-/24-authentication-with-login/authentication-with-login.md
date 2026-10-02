# React Router - Authentication with Login, Access Token and Protected Routes

## Overview

A common authentication flow in a React application looks like this:

```text
Login Form
    ↓
Send username + password
    ↓
Login API
    ↓
Receive access token
    ↓
Store access token
    ↓
Navigate to protected page
    ↓
Protected route loader
    ↓
Call /auth/me with access token
    ↓
Verify authenticated user
    ↓
Allow page OR redirect to Login
```

This example uses the DummyJSON authentication API.

---

# 1. Login Form

The Login component maintains the username and password in one state object.

```jsx
const [formValue, setFormValue] = useState({
  username: "emilys",
  password: "emilyspass",
});
```

For this example, we use the DummyJSON test credentials as the default values:

```text
Username: emilys
Password: emilyspass
```

We can use one `handleChange` function for both inputs.

```jsx
const handleChange = (event) => {
  const { name, value } = event.target;

  setFormValue((prevValue) => ({
    ...prevValue,
    [name]: value,
  }));
};
```

The `name` attribute of each input determines which property is updated.

For example:

```jsx
<input
  type="text"
  name="username"
  value={formValue.username}
  onChange={handleChange}
/>
```

When the username changes:

```text
name = "username"
value = "emilys"
```

the state becomes:

```jsx
{
  username: "emilys",
  password: ""
}
```

Similarly, the password input updates the `password` property.

---

# 2. Login API

The Login component calls a function from `utils.js`.

```jsx
loginUser(formValue)
```

The form data is passed to the API function.

### `utils.js`

```jsx
export async function loginUser(formData) {
  const response = await fetch(
    "https://dummyjson.com/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
}
```

The request sends:

```jsx
body: JSON.stringify(formData)
```

The API receives the username and password.

When authentication succeeds, the API returns information including an access token.

---

# 3. Why Do We Need `data` in `.then()`?

In the Login component:

```jsx
loginUser(formValue)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
```

The `data` represents the successful response returned by `loginUser()`.

The response contains authentication information, including the access token.

We need the returned data because we want to save the access token:

```jsx
localStorage.setItem(
  "accessToken",
  data.accessToken
);
```

We can verify this in the browser:

```text
Developer Tools
    ↓
Application
    ↓
Local Storage
    ↓
accessToken
```

---

# 4. Login Submit Flow

The submit handler calls the login API.

```jsx
const handleLoginSubmit = (event) => {
  event.preventDefault();

  setIsError(false);

  loginUser(formValue)
    .then((data) => {
      console.log(data);

      localStorage.setItem(
        "accessToken",
        data.accessToken
      );

      navigate("/home");
    })
    .catch((error) => {
      console.log(error);
      setIsError(true);
    });
};
```

The important sequence is:

```text
Submit Login Form
       ↓
loginUser(formValue)
       ↓
Login API
       ↓
Successful response
       ↓
Get accessToken
       ↓
localStorage.setItem()
       ↓
navigate("/home")
```

---

# 5. Using `useNavigate()` After Successful Login

We can use the `useNavigate()` hook inside the Login component.

```jsx
import { useNavigate } from "react-router";
```

Then:

```jsx
const navigate = useNavigate();
```

After the access token is successfully saved:

```jsx
localStorage.setItem(
  "accessToken",
  data.accessToken
);

navigate("/home");
```

This means:

> After successful authentication, navigate the user to the Home page.

### Important

`useNavigate()` is appropriate here because we are inside a React component and responding to a successful user action.

This is different from using `redirect()` in a loader.

---

# 6. Why Do We Need `/auth/me`?

Logging in successfully gives us an access token.

But when the user accesses a protected page, we need to verify that the token is valid.

The `/auth/me` endpoint can be used for this purpose.

The flow is:

```text
Username + Password
       ↓
Login API
       ↓
Access Token
       ↓
Store Token
       ↓
/auth/me
       ↓
Send Access Token
       ↓
Server verifies token
       ↓
Authenticated User
```

The `/auth/me` request is **not another username/password login**.

Instead, it asks the server:

> "Here is my access token. Is this token valid, and which authenticated user does it represent?"

---

# 7. The Two API Calls During Authentication

There are two important API calls in this example.

## API Call 1 - Login

The first API call sends the user's credentials:

```text
username
password
```

The server authenticates the credentials and returns an access token.

```text
POST /auth/login

username + password
        ↓
     Server
        ↓
   accessToken
```

The application stores the token.

---

## API Call 2 - Verify User

The second API call uses the access token:

```text
GET /auth/me

Authorization: Bearer <accessToken>
```

The server checks the token and returns the authenticated user's information if the token is valid.

```text
accessToken
      ↓
   /auth/me
      ↓
Server verifies token
      ↓
Valid → user information
Invalid/expired → error
```

### Important distinction

```text
Login API
→ Authenticates credentials
→ Returns access token

/auth/me
→ Verifies the access token
→ Returns authenticated user information
```

---

# 8. Sending the Access Token

In `userLoggedIn()`, we first retrieve the token from localStorage:

```jsx
const token = localStorage.getItem("accessToken");
```

If there is no token, we redirect to the Login page:

```jsx
if (!token) {
  throw redirect("/login");
}
```

Then we send the token in the request headers:

```jsx
headers: {
  Authorization: `Bearer ${token}`,
}
```

The `Bearer` scheme tells the server that the value following it is an access token.

The resulting header looks conceptually like:

```text
Authorization: Bearer eyJhbGciOi...
```

---

# 9. `userLoggedIn()` Function

```jsx
export async function userLoggedIn() {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    throw redirect("/login");
  }

  try {
    const response = await fetch(
      "https://dummyjson.com/auth/me",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);

    if (!response.ok) {
      throw new Error("Invalid or expired token");
    }

    return response.json();
  } catch (error) {
    throw redirect("/login");
  }
}
```

The function:

1. Gets the access token.
2. Checks whether a token exists.
3. Calls `/auth/me`.
4. Sends the token in the `Authorization` header.
5. Checks the response.
6. Throws an error if the token is invalid or expired.
7. Redirects to `/login` if authentication fails.
8. Returns the authenticated user data when successful.

---

# 10. Using `userLoggedIn()` as a Route Loader

We can use `userLoggedIn()` as the loader for a protected route.

```jsx
<Route
  path="/benefits"
  element={<Benefits />}
  loader={userLoggedIn}
  errorElement={<ErrorPage />}
/>
```

The flow is:

```text
User visits /benefits
        ↓
Route loader runs
        ↓
userLoggedIn()
        ↓
Get accessToken
        ↓
Call /auth/me
        ↓
      Valid?
      ↙   ↘
    Yes    No
     ↓      ↓
 Benefits   Redirect
             /login
```

---

# 11. Why Use a Loader for Authentication?

A loader allows authentication to be handled at the **routing level** instead of repeating the same authentication logic inside every protected component.

For example:

```jsx
<Route
  path="/benefits"
  element={<Benefits />}
  loader={userLoggedIn}
/>

<Route
  path="/resources"
  element={<Resources />}
  loader={userLoggedIn}
/>
```

Both routes can use the same authentication function.

This keeps authentication logic separate from the UI components.

---

# 12. `errorElement`

We can provide an `errorElement` for a route:

```jsx
<Route
  path="/benefits"
  element={<Benefits />}
  loader={userLoggedIn}
  errorElement={<ErrorPage />}
/>
```

If the loader throws a normal error, React Router can render the `ErrorPage` component.

Example:

```jsx
function ErrorPage() {
  const error = useRouteError();

  return (
    <>
      <h1>Something went wrong</h1>
      <p>{error?.message}</p>
    </>
  );
}
```

### Important distinction

If `userLoggedIn()` does:

```jsx
throw redirect("/login");
```

the user is redirected to `/login`.

If it throws a normal error:

```jsx
throw new Error("Invalid or expired token");
```

the route's `errorElement` can handle that error.

---

# 13. Testing the Negative Scenario

We can test what happens when there is no access token.

Open:

```text
Developer Tools
    ↓
Application
    ↓
Local Storage
```

Remove:

```text
accessToken
```

Or use:

```jsx
localStorage.removeItem("accessToken");
```

Then visit the protected route.

The flow becomes:

```text
Visit /benefits
      ↓
userLoggedIn()
      ↓
getItem("accessToken")
      ↓
No token
      ↓
redirect("/login")
```

This is a useful way to test protected-route behavior.

---

# 14. When Does `/auth/me` Run?

The `/auth/me` call is made when a route using the `userLoggedIn` loader is loaded or the loader is revalidated.

For example:

```jsx
<Route
  path="/benefits"
  element={<Benefits />}
  loader={userLoggedIn}
/>
```

When the user navigates to `/benefits`, the loader runs and calls `/auth/me`.

If multiple protected routes use the same loader, authentication can be checked as those routes are loaded/revalidated.

It is more accurate to say:

> `/auth/me` is called for protected routes that use the authentication loader when that loader runs or revalidates.

It does **not** automatically mean that `/auth/me` is called on every click anywhere in the application.

---

# 15. Complete Authentication Flow

```text
                    LOGIN
                      ↓
              username/password
                      ↓
                POST /login
                      ↓
                accessToken
                      ↓
             Save to localStorage
                      ↓
              navigate("/home")
                      ↓
             User visits protected
                    route
                      ↓
               Route loader
                      ↓
               userLoggedIn()
                      ↓
          Get accessToken from storage
                      ↓
               GET /auth/me
                      ↓
          Authorization: Bearer token
                      ↓
               Token valid?
                 ↙       ↘
               Yes        No
                ↓          ↓
          Show protected   redirect
             page          /login
```

---

# 16. `localStorage.removeItem()` for Testing

To simulate a logged-out state:

```jsx
localStorage.removeItem("accessToken");
```

This removes the stored token.

The next authentication check will find:

```jsx
const token = localStorage.getItem("accessToken");
```

which returns:

```text
null
```

The application can then redirect the user to `/login`.

---

# 17. Login vs Authentication Check

It is important to understand the difference between the two API calls.

### Login

```text
POST /auth/login
```

Purpose:

> Authenticate username/password and obtain an access token.

### Authentication check

```text
GET /auth/me
```

Purpose:

> Use the access token to verify the current authenticated user.

Think of it as:

```text
Login
Credentials → Token

Auth check
Token → User
```

---

# 18. `useNavigate()` vs `redirect()` in This Example

This example also demonstrates the difference from the previous topic.

### `useNavigate()`

Used inside the Login component:

```jsx
navigate("/home");
```

The component decides where to navigate after successful login.

### `redirect()`

Used inside `userLoggedIn()`:

```jsx
throw redirect("/login");
```

The loader/data layer decides that the user should not continue to the protected route.

Therefore:

```text
useNavigate()
→ React component
→ User action
→ Successful login

redirect()
→ Loader/data layer
→ Authentication check
→ Protected route
```

---

# 19. Interview Explanation

### Question:

**How would you implement authentication with React Router?**

### Answer:

> I would submit the username and password to the login API. If authentication succeeds, the API returns an access token, which I store on the client. After login, I can use `useNavigate()` to navigate the user to the appropriate page.
>
> For protected routes, I can use a React Router loader to call an authentication function. The function retrieves the access token and sends it to an authentication endpoint such as `/auth/me` using the Authorization Bearer header. If the token is valid, the route can continue. If the token is missing, invalid, or expired, I can redirect the user to the login page.

---

# 20. Important Concepts to Remember

### Login API

```text
Credentials → Access Token
```

### `/auth/me`

```text
Access Token → Verify Current User
```

### `localStorage`

```text
Store and retrieve the access token
```

### Loader

```text
Run authentication for protected routes
```

### `redirect()`

```text
Redirect from the loader/data layer
```

### `useNavigate()`

```text
Navigate from a React component
```

### `errorElement`

```text
Display an error UI when a route loader/action throws an error
```

---

# 21. DummyJSON Authentication Documentation

The DummyJSON documentation contains details about the authentication endpoints and examples:

https://dummyjson.com/docs/auth

Use this documentation as a reference when working with the `/auth/login` and `/auth/me` endpoints.

---

# Summary

The authentication example demonstrates how several React Router concepts work together.

```text
Login Component
      ↓
loginUser()
      ↓
Login API
      ↓
accessToken
      ↓
localStorage
      ↓
useNavigate()
      ↓
Protected Route
      ↓
Loader
      ↓
userLoggedIn()
      ↓
/auth/me
      ↓
Valid Token?
   ↙       ↘
 Yes        No
  ↓          ↓
Page       redirect("/login")
```

The most important distinction is:

**The login API authenticates the credentials and provides the access token.**

**The `/auth/me` API uses that token to verify the currently authenticated user.**
