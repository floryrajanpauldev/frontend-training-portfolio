# Redux

## What is Redux?

Redux is a third-party state management library that can be used to manage shared application state.

React itself does not include Redux. It needs to be installed separately.

```bash
npm install redux react-redux
```

Redux is useful when an application has a large amount of shared state that needs to be accessed and updated by many different components.

For smaller applications, Context API or Context API with `useReducer` may be sufficient.

---

## Why Learn Redux if We Have `useReducer`?

Before learning Redux, we learned the `useReducer` hook.

The concepts are very similar.

With `useReducer`, we have:

```text
Component
    ↓
dispatch(action)
    ↓
Reducer
    ↓
New State
    ↓
Component
```

Traditional Redux follows a very similar pattern:

```text
Component
    ↓
dispatch(action)
    ↓
Reducer
    ↓
Store
    ↓
New State
    ↓
Component
```

The main difference is that Redux provides a centralized store that can be shared across the application.

---

# Traditional Redux

Traditional Redux uses several pieces:

* Store
* Actions
* Reducers
* Dispatch
* Selectors
* Provider

---

## 1. Action

An action describes what should happen.

For example:

```js
{
    type: "INCREMENT"
}
```

If we need to send additional data, we can use a payload:

```js
{
    type: "INCREMENT_BY_AMOUNT",
    payload: 5
}
```

An action creator is a function that returns an action.

Example:

```js
export const increment = () => ({
    type: "INCREMENT"
});
```

---

# 2. Reducer

A reducer determines how the state should change based on the action.

A reducer receives:

```js
(state, action)
```

Example:

```js
const counterReducer = (state, action) => {
    switch (action.type) {
        case "INCREMENT":
            return {
                ...state,
                count: state.count + 1
            };

        default:
            return state;
    }
};
```

This is very similar to the reducer function we created with `useReducer`.

---

# 3. Store

The Redux store holds the application's state.

Traditional Redux uses `createStore()`:

```js
const store = createStore(counterReducer);
```

The reducer is passed to `createStore()` to create the store.

---

# 4. Provider

The Redux `Provider` makes the store available to the React component tree.

```jsx
<Provider store={store}>
    <App />
</Provider>
```

The Provider is normally placed around the application in the main entry point.

This means components inside the Provider can access the Redux store.

---

# 5. useSelector()

`useSelector()` is used to read a value from the Redux store.

```js
const count = useSelector(state => state.count);
```

It is similar to accessing state when using Context API.

---

# 6. useDispatch()

`useDispatch()` is used when a component needs to dispatch an action.

```js
const dispatch = useDispatch();

dispatch(increment());
```

The action is sent to the reducer, and the reducer determines how the state should change.

---

# Redux Flow

For example, when the user clicks the Increment button:

```text
User clicks Increment
        ↓
dispatch(increment())
        ↓
Action returns { type: "INCREMENT" }
        ↓
Reducer receives action
        ↓
Reducer checks action.type
        ↓
State is updated
        ↓
Component receives updated state
        ↓
UI re-renders
```

---

# Payload

Actions can also send additional information using `payload`.

For example:

```js
export const incrementByAmount = amount => ({
    type: "INCREMENT_BY_AMOUNT",
    payload: amount
});
```

The reducer can access that value using:

```js
action.payload
```

Example:

```js
case "INCREMENT_BY_AMOUNT":
    return {
        ...state,
        count: state.count + action.payload
    };
```

This is similar to the `action.payload` pattern we used with `useReducer`.

---

# Multiple Reducers

A larger application may have multiple pieces of state.

For example:

```text
Counter
User
Products
Cart
Authentication
```

We can create separate reducers for these different areas.

Example:

```text
counterReducer
userReducer
      ↓
combineReducers()
      ↓
root/multiple reducer
      ↓
Redux Store
```

With multiple reducers, the state can look like:

```js
state.counter.count
state.user.name
```

The names `counter` and `user` come from the keys used when combining the reducers.

---

# combineReducers()

Traditional Redux provides `combineReducers()` to combine multiple reducers.

Example:

```js
const rootReducer = combineReducers({
    counter: counterReducer,
    user: userReducer
});
```

Now both reducers are part of the Redux store.

---

# Traditional Redux vs useReducer

There are many similarities.

| useReducer                  | Traditional Redux             |
| --------------------------- | ----------------------------- |
| `useReducer()`              | Redux reducer                 |
| State                       | Store state                   |
| Action                      | Action                        |
| `dispatch()`                | `dispatch()`                  |
| Reducer function            | Reducer function              |
| `action.type`               | `action.type`                 |
| `action.payload`            | `action.payload`              |
| Local/component-level state | Centralized application state |

The important idea is that Redux follows the same reducer-based state management pattern but provides a centralized store for the application.

---

# Redux Toolkit

Traditional Redux requires a significant amount of boilerplate.

We may need:

```text
Action types
Action creators
Reducers
switch statements
combineReducers
createStore
```

To simplify Redux development, the Redux team introduced **Redux Toolkit (RTK)**.

Redux Toolkit is the recommended way to write modern Redux applications.

For new applications, we should generally use Redux Toolkit rather than writing traditional Redux code manually.

---

# Traditional Redux vs Redux Toolkit

### Traditional Redux

```text
Actions
    ↓
Reducers
    ↓
combineReducers
    ↓
createStore
    ↓
Provider
```

### Redux Toolkit

```text
createSlice()
    ↓
configureStore()
    ↓
Provider
    ↓
Components
```

Redux Toolkit reduces the amount of boilerplate code and provides APIs designed to make Redux easier to use.

---

# Important Note

The traditional Redux example in this folder is primarily for understanding the architecture and connecting Redux concepts with the `useReducer` hook.

For actual modern Redux development, we will use:

```text
Redux Toolkit
```

The next topic will cover:

* `configureStore()`
* `createSlice()`
* `Provider`
* `useSelector()`
* `useDispatch()`
* Multiple slices
* A practical application example
* Later, asynchronous Redux with `createAsyncThunk()`
