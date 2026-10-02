# useReducer – Login Form Example

## Overview

In the previous example, we used the `useReducer` Hook with a simple counter.

In this example, we will use `useReducer` to build a login form.

The login form demonstrates why `useReducer` can be useful when:

* Multiple state values are related to one functionality.
* There are multiple actions that can update the state.
* State updates depend on different conditions.
* The logic becomes more complex than a simple `useState` update.

---

# Login Form Using useState

Before using `useReducer`, the login form was implemented using multiple `useState` Hooks.

For example:

```js
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userData, setUserData] = useState(null);
const [error, setError] = useState(null);
```

Each piece of state has its own setter function.

As the functionality becomes more complex, we may end up with several state variables and several handlers.

For example:

* Set username
* Set password
* Login success
* Login failure
* Store user data
* Display error
* Validate input
* Show loading state

Instead of managing these separately, we can use `useReducer` to centralize the state transitions.

---

# useReducer Syntax

The basic syntax is:

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

### `state`

`state` contains the current state of the component.

It can contain a single value or multiple related values.

In our login example:

```js
const initialState = {
  username: "",
  password: "",
  isLoggedIn: false,
  userData: null,
  error: null
};
```

Therefore, `state` will contain all these values.

We can access them using:

```js
state.username
state.password
state.isLoggedIn
state.userData
state.error
```

---

## `dispatch`

`dispatch` is a function used to send an action to the reducer.

For example:

```js
dispatch({
  type: "setUsername",
  payload: event.target.value
});
```

The `dispatch` function sends the action to the reducer.

The action normally contains:

* `type` → describes what action should be performed.
* `payload` → carries additional data needed for the action.

Example:

```js
{
  type: "setUsername",
  payload: "john"
}
```

`type` and `payload` are commonly used conventions. They are not JavaScript reserved keywords.

---

# Reducer Function

A reducer is a function that receives:

1. The current `state`
2. The `action`

```js
function reducer(state, action) {
  // decide how state should change
}
```

The reducer returns the new state.

The general flow is:

```text
User interaction
       ↓
dispatch(action)
       ↓
reducer(state, action)
       ↓
Check action.type
       ↓
Return updated state
       ↓
React re-renders
```

---

# Using switch with the Reducer

Because our login form has multiple actions, we use a `switch` statement.

```js
function reducer(state, action) {
  switch (action.type) {
    case "setUsername":
      // update username

    case "setPassword":
      // update password

    case "loginSuccess":
      // update login state

    case "loginFailure":
      // update error

    default:
      return state;
  }
}
```

The `action.type` determines which case should execute.

---

# Initial State

Our login form has multiple related state values:

```js
const initialState = {
  username: "",
  password: "",
  isLoggedIn: false,
  userData: null,
  error: null
};
```

We then pass this initial state to `useReducer`:

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

---

# Updating Username

With `useState`, we might write:

```js
const [username, setUsername] = useState("");

onChange={(event) => setUsername(event.target.value)}
```

With `useReducer`, we dispatch an action instead:

```js
onChange={(event) =>
  dispatch({
    type: "setUsername",
    payload: event.target.value
  })
}
```

The reducer receives this action:

```js
case "setUsername":
  return {
    ...state,
    username: action.payload
  };
```

### Why `payload`?

The `type` tells the reducer **what to do**.

The `payload` tells the reducer **what data to use**.

For example:

```js
{
  type: "setUsername",
  payload: "john"
}
```

The reducer understands:

> Set the username to `"john"`.

---

# Updating Password

The same approach is used for the password.

```js
onChange={(event) =>
  dispatch({
    type: "setPassword",
    payload: event.target.value
  })
}
```

Reducer:

```js
case "setPassword":
  return {
    ...state,
    password: action.payload
  };
```

---

# Why Do We Use the Spread Operator?

Our state is an object containing multiple values:

```js
const initialState = {
  username: "",
  password: "",
  isLoggedIn: false,
  userData: null,
  error: null
};
```

If we return only:

```js
return {
  username: action.payload
};
```

the other properties would not be preserved.

Therefore, we use the spread operator:

```js
return {
  ...state,
  username: action.payload
};
```

This means:

1. Copy the existing state.
2. Update only the `username`.
3. Keep the other state values unchanged.

The same applies when updating the password:

```js
return {
  ...state,
  password: action.payload
};
```

---

# Login Success

When the API call succeeds, we dispatch:

```js
dispatch({
  type: "loginSuccess",
  payload: data
});
```

Here, `data` contains the user information returned from the API.

The reducer handles it:

```js
case "loginSuccess":
  return {
    ...state,
    isLoggedIn: true,
    userData: action.payload,
    error: null
  };
```

Now:

```js
state.isLoggedIn
```

becomes:

```js
true
```

and:

```js
state.userData
```

contains the user information returned by the API.

---

# Login Failure

If the API call fails, we dispatch:

```js
dispatch({
  type: "loginFailure",
  payload: data.message
});
```

The reducer handles it:

```js
case "loginFailure":
  return {
    ...state,
    isLoggedIn: false,
    userData: null,
    error: action.payload
  };
```

The error message can then be displayed using:

```js
{state.error && <p>{state.error}</p>}
```

---

# Front-End Validation

Not every error comes from the backend.

For example, we can validate the password on the frontend before making the API call:

```js
if (state.password.length < 6) {
  dispatch({
    type: "loginFailure",
    payload: "Password must be at least 6 characters"
  });

  return;
}
```

This is frontend validation.

The backend does not need to be called just to determine whether the password meets a basic frontend validation rule.

---

# Comparing useState and useReducer

### Using useState

```js
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [userData, setUserData] = useState(null);
const [error, setError] = useState(null);
```

Each state value has its own setter.

### Using useReducer

```js
const initialState = {
  username: "",
  password: "",
  isLoggedIn: false,
  userData: null,
  error: null
};

const [state, dispatch] = useReducer(reducer, initialState);
```

The related state is grouped together and state transitions are handled in the reducer.

---

# Important Terms

| Term           | Meaning                                              |
| -------------- | ---------------------------------------------------- |
| `useReducer`   | React Hook used to manage state with reducer logic   |
| `state`        | Current state of the component                       |
| `initialState` | Starting state                                       |
| `dispatch`     | Function used to send an action to the reducer       |
| `reducer`      | Function that decides how the state should change    |
| `action`       | Object describing what should happen                 |
| `type`         | Identifies the action                                |
| `payload`      | Data associated with the action                      |
| `switch`       | Common way to handle multiple action types           |
| `...state`     | Copies the existing state before updating a property |

---

# useReducer Mental Model

Think of the reducer as a central decision-maker.

```text
                 dispatch(action)
                        ↓
                  ┌───────────┐
                  │  Reducer  │
                  └─────┬─────┘
                        ↓
                action.type
                        ↓
        ┌───────────────┼───────────────┐
        ↓               ↓               ↓
 setUsername       setPassword     loginSuccess
        ↓               ↓               ↓
        └───────────────┼───────────────┘
                        ↓
                  Updated State
                        ↓
                   React UI
```

The component dispatches **what happened**.

The reducer decides **how the state should change**.

---

# When Should We Consider useReducer?

`useReducer` can be useful when:

* State contains multiple related values.
* There are many actions that update the state.
* State updates depend on different conditions.
* Multiple `useState` calls and handlers are making the logic difficult to manage.
* You want related state-transition logic centralized in one reducer.

It does **not** mean that every component with multiple state variables needs `useReducer`.

For simple state, `useState` is often easier and more appropriate.

---

# Key Takeaway

```text
useState
    ↓
Simple state + simple updates

useReducer
    ↓
Related state + multiple actions + more complex state transitions
```

The most important pattern to remember is:

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

```js
dispatch({
  type: "someAction",
  payload: someData
});
```

```js
function reducer(state, action) {
  switch (action.type) {
    case "someAction":
      return {
        ...state,
        // updated value
      };

    default:
      return state;
  }
}
```
