# useReducer with Context API – Login Form

In the counter example, we combined Context API and `useReducer` to manage and share counter state.

We can use the same approach for a more realistic example such as a login form.

## Why use Context API with useReducer?

A login form has several related pieces of state:

```js
{
  username: "",
  password: "",
  isLoggedIn: false,
  userData: null,
  error: null
}
```

We also have several possible state changes:

* Username changes
* Password changes
* Login succeeds
* Login fails

Instead of managing each piece of state separately with multiple `useState` calls, we can keep the related state together and let the reducer manage the transitions.

Context API then allows the login component to access the state and `dispatch` function without receiving them through props.

---

# Initial State

```js
const initialState = {
  username: "",
  password: "",
  isLoggedIn: false,
  userData: null,
  error: null
};
```

---

# Reducer

The reducer handles the different actions.

```js
function reducer(state, action) {
  switch (action.type) {
    case "setUsername":
      return {
        ...state,
        username: action.payload
      };

    case "setPassword":
      return {
        ...state,
        password: action.payload
      };

    case "loginSuccess":
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload,
        error: null
      };

    case "loginFailure":
      return {
        ...state,
        isLoggedIn: false,
        userData: null,
        error: action.payload
      };

    default:
      return state;
  }
}
```

---

# useReducer inside the Provider

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

The Provider passes both through Context:

```jsx
<LoginContextReducer.Provider value={{ state, dispatch }}>
  {children}
</LoginContextReducer.Provider>
```

---

# Using Context in the Login Component

The login component consumes the Context:

```js
const { state, dispatch } = useContext(LoginContextReducer);
```

The username input uses:

```jsx
<input
  value={state.username}
  onChange={(event) =>
    dispatch({
      type: "setUsername",
      payload: event.target.value
    })
  }
/>
```

The password input follows the same pattern:

```jsx
<input
  type="password"
  value={state.password}
  onChange={(event) =>
    dispatch({
      type: "setPassword",
      payload: event.target.value
    })
  }
/>
```

---

# Login Success

When the API call succeeds:

```js
dispatch({
  type: "loginSuccess",
  payload: data
});
```

The reducer updates:

```js
isLoggedIn
userData
error
```

---

# Login Failure

When the API call fails:

```js
dispatch({
  type: "loginFailure",
  payload: data.message || "Login failed"
});
```

The reducer stores the error message in:

```js
state.error
```

The component can then display it.

---

# Overall Architecture

```text
                LoginContextReducerProvider
                           |
                  useReducer(reducer)
                           |
                    state + dispatch
                           |
                           ↓
                LoginFormContextReducer
                           |
              +------------+------------+
              |                         |
         state.username              state.password
              |                         |
              +------------+------------+
                           |
                       dispatch
                           |
                           ↓
                     reducer()
                           |
              +------------+------------+
              |                         |
       loginSuccess              loginFailure
              |                         |
              +------------+------------+
                           |
                    updated state
```

## Final Takeaway

The combination of Context API and `useReducer` gives us:

* **Context API** → shared access to state and dispatch.
* **useReducer** → centralized state-transition logic.
* **Provider** → owns and provides the state.
* **Consumer components** → read state and dispatch actions.

Instead of passing multiple state values and setter functions through props, components inside the Provider can access:

```js
const { state, dispatch } = useContext(LoginContextReducer);
```

This is a useful pattern when several components need access to the same related state and the state logic contains multiple actions.
