# Login Form using useState

## Overview

Before creating the login form using `useReducer`, we first created the same login form using `useState`.

This example helps us compare how multiple related state values are managed using `useState` versus `useReducer`.

---

# Login Form Scenario

The login form contains:

* Username input
* Password input
* Login button
* Frontend password validation
* API call
* Login success
* Login failure
* Error message
* User information after successful login

The API used in this example is the DummyJSON authentication API:

```text
https://dummyjson.com/auth/login
```

When the credentials are correct, the API returns user information such as:

```text
username
email
firstName
lastName
```

When the credentials are incorrect, the backend returns an error message such as:

```text
Invalid credentials
```

---

# Managing State with useState

In the login form, we have five pieces of state:

```js
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userData, setUserData] = useState(null);
const [error, setError] = useState(null);
```

Each piece of state has its own setter function.

---

# Username State

The username is stored in:

```js
const [username, setUsername] = useState("");
```

The input is controlled by React state:

```jsx
<input
  type="text"
  value={username}
  onChange={(event) => setUsername(event.target.value)}
/>
```

The `value` comes from the state.

When the user types, the `onChange` event runs and updates the state using `setUsername`.

---

# Password State

The password is managed separately:

```js
const [password, setPassword] = useState("");
```

The controlled input:

```jsx
<input
  type="password"
  value={password}
  onChange={(event) => setPassword(event.target.value)}
/>
```

When the user types a password, `setPassword` updates the state.

---

# Login Status

We use:

```js
const [isLoggedIn, setIsLoggedIn] = useState(false);
```

Initially:

```text
isLoggedIn = false
```

After a successful login:

```js
setIsLoggedIn(true);
```

The UI can then display the welcome message instead of the login form.

---

# User Data

We store the successful API response in:

```js
const [userData, setUserData] = useState(null);
```

After a successful API call:

```js
setUserData(data);
```

We can then access information such as:

```js
userData.firstName
userData.lastName
```

For example:

```jsx
<h3>
  Welcome {userData.firstName} {userData.lastName}
</h3>
```

---

# Error State

We use:

```js
const [error, setError] = useState(null);
```

If the login fails:

```js
setError(data.message || "Login failed");
```

The error can then be displayed:

```jsx
{error && <p style={{ color: "red" }}>{error}</p>}
```

---

# Frontend Password Validation

We added a simple frontend validation rule:

> The password must contain at least 6 characters.

Before making the API request:

```js
if (password.length < 6) {
  setError("Password must be at least 6 characters");
  return;
}
```

This is frontend validation.

There is no need to make an API request just to check this basic frontend rule.

---

# Login API Call

After the frontend validation passes, we make the API request:

```js
const response = await fetch(
  "https://dummyjson.com/auth/login",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      password
    })
  }
);
```

The username and password come from the component state.

---

# Successful Login

After receiving the response:

```js
const data = await response.json();
```

If the request is successful:

```js
if (response.ok) {
  setIsLoggedIn(true);
  setUserData(data);
  setError(null);
}
```

We update three pieces of state:

```text
isLoggedIn → true
userData   → API response
error      → null
```

The UI can then display:

```jsx
{isLoggedIn && userData ? (
  <h3>
    Welcome {userData.firstName} {userData.lastName}
  </h3>
) : (
  // Login form
)}
```

---

# Login Failure

If the backend returns an error:

```js
else {
  setIsLoggedIn(false);
  setUserData(null);
  setError(data.message || "Login failed");
}
```

This resets the login-related state and stores the error message.

The error can then be displayed to the user.

---

# Handling API Errors

The API call can also fail because of a network or other unexpected error.

We can use `try...catch`:

```js
try {
  // API call
} catch (error) {
  setIsLoggedIn(false);
  setUserData(null);
  setError("Something went wrong. Please try again.");
}
```

---

# Complete State Flow

The login form has several independent state setters:

```text
username
    ↓
setUsername()

password
    ↓
setPassword()

isLoggedIn
    ↓
setIsLoggedIn()

userData
    ↓
setUserData()

error
    ↓
setError()
```

As the login logic becomes more complex, we have several setters being used in response to different actions.

This is one reason `useReducer` can be considered as an alternative.

---

# useState Version vs useReducer Version

### useState

```js
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userData, setUserData] = useState(null);
const [error, setError] = useState(null);
```

### useReducer

The related values can instead be grouped into one state object:

```js
const initialState = {
  username: "",
  password: "",
  isLoggedIn: false,
  userData: null,
  error: null
};

const [state, dispatch] = useReducer(
  reducer,
  initialState
);
```

The important difference is not simply the number of state values.

`useReducer` becomes useful when **related state values and the actions that change them create more complex state-transition logic**.

---

# Key Takeaway

The `useState` version demonstrates that a login form can be managed with several independent pieces of state.

As the number of related state transitions grows, `useReducer` provides another approach where:

```text
User action
     ↓
dispatch(action)
     ↓
reducer
     ↓
Updated state
```

This allows the state-transition logic to be centralized in one reducer.
