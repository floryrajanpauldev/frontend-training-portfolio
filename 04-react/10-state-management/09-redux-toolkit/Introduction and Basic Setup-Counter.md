# Redux Toolkit – Introduction and Basic Setup

## 1. What is Redux Toolkit?

Redux Toolkit (RTK) is the **official recommended way to write Redux logic**.

Traditional Redux requires several files and a lot of boilerplate code.

Redux Toolkit simplifies Redux by providing functions that reduce the amount of code we need to write.

The main functions we will use are:

* `createSlice()`
* `configureStore()`

We will still use the React-Redux hooks:

* `useSelector()`
* `useDispatch()`

---

# 2. Traditional Redux vs Redux Toolkit

## Traditional Redux

In traditional Redux, we typically created:

```text
actions.js
    ↓
reducers.js
    ↓
store.js
    ↓
Provider
    ↓
Component
```

### Actions

We defined action types and action creators separately.

```jsx
export const INCREMENT = "INCREMENT";

export const increment = () => ({
  type: INCREMENT,
});
```

### Reducer

The reducer used `switch` and `action.type`.

```jsx
const initialState = {
  value: 0,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        value: state.value + 1,
      };

    default:
      return state;
  }
};
```

### Store

Traditional Redux used:

```jsx
createStore()
```

```jsx
const store = createStore(counterReducer);
```

---

# 3. Redux Toolkit

Redux Toolkit combines several of these steps.

The main idea is:

```text
createSlice()
    ↓
initialState
    +
reducers
    +
generated action creators
```

So we no longer need to create a separate `actions.js` file for these actions.

---

# 4. Installing Redux Toolkit

Install Redux Toolkit and React-Redux:

```bash
npm install @reduxjs/toolkit react-redux
```

`@reduxjs/toolkit` includes Redux as a dependency.

---

# 5. Creating a Slice

A **slice** represents one section of our Redux state.

For example:

```text
counterSlice
userSlice
productSlice
cartSlice
```

Each slice can have:

* a name
* an initial state
* reducers

For example, a counter slice can manage the counter state.

---

# 6. `createSlice()`

Import `createSlice` from Redux Toolkit:

```jsx
import { createSlice } from "@reduxjs/toolkit";
```

Then create the slice:

```jsx
const counterSlice = createSlice({
  name: "counter",

  initialState: {
    value: 0,
  },

  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});
```

---

# 7. Parts of `createSlice()`

## `name`

```jsx
name: "counter"
```

This identifies the slice.

---

## `initialState`

```jsx
initialState: {
  value: 0,
}
```

This is the initial state managed by the slice.

In traditional Redux, the initial state was usually defined inside the reducer.

With Redux Toolkit, it is defined directly inside `createSlice()`.

---

## `reducers`

```jsx
reducers: {
  increment: (state) => {
    state.value += 1;
  },

  decrement: (state) => {
    state.value -= 1;
  },
}
```

These functions define how the state can be changed.

---

# 8. What happened to `action.type`?

In traditional Redux, we had to write:

```jsx
switch (action.type) {
  case "INCREMENT":
    ...
}
```

We also had to define the action type separately.

With Redux Toolkit, we don't need to manually write the `switch` statement or define the action type.

Instead:

```jsx
reducers: {
  increment: (state) => {
    state.value += 1;
  },
}
```

Redux Toolkit automatically creates the action for us.

---

# 9. `action.payload`

When we need to pass data with an action, we use:

```jsx
action.payload
```

Example:

```jsx
incrementByAmount: (state, action) => {
  state.value += action.payload;
}
```

From the component:

```jsx
dispatch(incrementByAmount(5));
```

Here:

```text
5
↓
action.payload
```

So:

```jsx
state.value += action.payload;
```

becomes:

```jsx
state.value += 5;
```

---

# 10. Exporting Actions

After creating the slice, export the generated action creators:

```jsx
export const {
  increment,
  decrement,
  incrementByAmount,
} = counterSlice.actions;
```

These are the actions that components will dispatch.

For example:

```jsx
dispatch(increment());
```

or:

```jsx
dispatch(decrement());
```

or:

```jsx
dispatch(incrementByAmount(5));
```

---

# 11. Exporting the Reducer

We also need to export the slice reducer:

```jsx
export default counterSlice.reducer;
```

This reducer will be added to our Redux store.

Therefore, a complete `counterSlice.js` looks like this:

```jsx
import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",

  initialState: {
    value: 0,
  },

  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
} = counterSlice.actions;

export default counterSlice.reducer;
```

---

# 12. `configureStore()`

Traditional Redux used:

```jsx
createStore()
```

Redux Toolkit uses:

```jsx
configureStore()
```

Import it from Redux Toolkit:

```jsx
import { configureStore } from "@reduxjs/toolkit";
```

Create a store:

```jsx
const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

---

# 13. Creating `store.js`

Our `store.js`:

```jsx
import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export default store;
```

### Important

Here:

```jsx
counter: counterReducer
```

`counter` becomes the key in the Redux state.

Therefore our state looks like:

```text
state
└── counter
    └── value
```

We can access the value with:

```jsx
state.counter.value
```

---

# 14. Provider

We still use the `Provider` from React-Redux.

```jsx
import { Provider } from "react-redux";
import store from "./store";
```

Then:

```jsx
<Provider store={store}>
  <App />
</Provider>
```

The Provider makes the Redux store available to the components inside it.

---

# 15. `main.jsx`

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
```

---

# 16. Using Redux Toolkit in a Component

We still use:

```jsx
useSelector()
useDispatch()
```

Import them:

```jsx
import {
  useSelector,
  useDispatch,
} from "react-redux";
```

---

# 17. `useSelector()`

`useSelector()` is used to read state from the Redux store.

```jsx
const count = useSelector(
  (state) => state.counter.value
);
```

The state structure is:

```text
state
└── counter
    └── value
```

Therefore:

```jsx
state.counter.value
```

returns the counter value.

---

# 18. `useDispatch()`

`useDispatch()` gives us the `dispatch` function.

```jsx
const dispatch = useDispatch();
```

We can then dispatch actions:

```jsx
dispatch(increment());
```

```jsx
dispatch(decrement());
```

```jsx
dispatch(incrementByAmount(5));
```

---

# 19. Counter Component

```jsx
import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  increment,
  decrement,
  incrementByAmount,
} from "./counterSlice";

function Counter() {
  const dispatch = useDispatch();

  const count = useSelector(
    (state) => state.counter.value
  );

  return (
    <div>
      <h1>Redux Toolkit Counter</h1>

      <h2>Count: {count}</h2>

      <button onClick={() => dispatch(increment())}>
        Increment
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>

      <button
        onClick={() => dispatch(incrementByAmount(5))}
      >
        Increment by 5
      </button>
    </div>
  );
}

export default Counter;
```

---

# 20. Multiple Reducers / Multiple Slices

In traditional Redux, we learned how to use multiple reducers.

For example:

```text
counterReducer
userReducer
```

We used:

```jsx
combineReducers()
```

to combine them.

With Redux Toolkit, we can create separate slices and add their reducers directly to `configureStore()`.

We do not need to create a separate `multipleReducers.js` file.

---

# 21. Creating `userSlice.js`

```jsx
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    name: "Guest",
  },

  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
```

---

# 22. Adding Multiple Slices to the Store

Update `store.js`:

```jsx
import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counterSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
  },
});

export default store;
```

Now our Redux state looks like:

```text
state
├── counter
│   └── value
│
└── user
    └── name
```

---

# 23. Accessing the User State

We can access the user state using `useSelector()`:

```jsx
const user = useSelector(
  (state) => state.user
);
```

Then:

```jsx
user.name
```

gives us the user's name.

We don't need to import the state from `userSlice`.

The state is already available through the Redux store.

---

# 24. Updating the User Name

Import the generated action:

```jsx
import { updateName } from "./userSlice";
```

Then dispatch it:

```jsx
dispatch(updateName("Jane Marsh"));
```

The value:

```text
"Jane Marsh"
```

becomes:

```jsx
action.payload
```

The reducer receives it:

```jsx
updateName: (state, action) => {
  state.name = action.payload;
}
```

So the state changes from:

```text
Guest
```

to:

```text
Jane Marsh
```

---

# 25. Counter + User Example

```jsx
import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  increment,
  decrement,
  incrementByAmount,
} from "./counterSlice";

import { updateName } from "./userSlice";

function Counter() {
  const dispatch = useDispatch();

  const count = useSelector(
    (state) => state.counter.value
  );

  const user = useSelector(
    (state) => state.user
  );

  return (
    <div>
      <h1>Redux Toolkit</h1>

      <h2>Count: {count}</h2>

      <button onClick={() => dispatch(increment())}>
        Increment
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>

      <button
        onClick={() => dispatch(incrementByAmount(5))}
      >
        Increment by 5
      </button>

      <hr />

      <h2>User Name: {user.name}</h2>

      <button
        onClick={() =>
          dispatch(updateName("Jane Marsh"))
        }
      >
        Update Name
      </button>
    </div>
  );
}

export default Counter;
```

---

# 26. Redux Toolkit Flow

The basic flow is:

```text
                 Redux Toolkit

                  createSlice()
                       ↓
          ┌─────────────────────────┐
          │ name                    │
          │ initialState             │
          │ reducers                │
          └─────────────────────────┘
                       ↓
              Generated actions
                       ↓
                counterSlice
                       ↓
              configureStore()
                       ↓
                   Provider
                       ↓
                  Components
                       ↓
            useSelector / useDispatch
```

---

# 27. Basic Redux Toolkit Steps

When creating a Redux Toolkit application:

### Step 1 — Create a slice

```jsx
createSlice()
```

Define:

* `name`
* `initialState`
* `reducers`

### Step 2 — Export the actions

```jsx
export const {
  increment,
  decrement,
} = counterSlice.actions;
```

### Step 3 — Export the reducer

```jsx
export default counterSlice.reducer;
```

### Step 4 — Create the store

```jsx
configureStore()
```

Add the reducers:

```jsx
reducer: {
  counter: counterReducer,
  user: userReducer,
}
```

### Step 5 — Provide the store

```jsx
<Provider store={store}>
  <App />
</Provider>
```

### Step 6 — Use the state

```jsx
useSelector()
```

### Step 7 — Dispatch actions

```jsx
useDispatch()
```

---

# 28. Traditional Redux vs Redux Toolkit

| Traditional Redux                         | Redux Toolkit                               |
| ----------------------------------------- | ------------------------------------------- |
| `createStore()`                           | `configureStore()`                          |
| Separate action file                      | Actions generated by `createSlice()`        |
| Action types                              | Automatically generated                     |
| Action creators                           | Automatically generated                     |
| `switch(action.type)`                     | Reducer functions inside `createSlice()`    |
| Initial state in reducer                  | Initial state in `createSlice()`            |
| `combineReducers()` often used separately | Add reducers directly to `configureStore()` |
| More boilerplate                          | Less boilerplate                            |

---

# 29. Key Takeaway

Redux Toolkit does **not** change the fundamental Redux concepts.

We still have:

```text
State
Actions
Reducers
Store
Dispatch
Selectors
```

Redux Toolkit mainly provides a simpler way to write them.

The biggest concepts introduced in this lesson are:

```jsx
createSlice()
configureStore()
```

And we continue to use:

```jsx
useSelector()
useDispatch()
```

### Remember

> **Redux Toolkit is the recommended modern way to write Redux logic, and its main purpose is to simplify Redux and reduce boilerplate code.**

---

# 30. Folder Structure

Our initial Redux Toolkit example can use:

```text
09-redux-toolkit/
│
├── counterSlice.js
├── userSlice.js
├── store.js
├── Counter.jsx
├── App.jsx
└── main.jsx
```

### Responsibilities

| File              | Responsibility                              |
| ----------------- | ------------------------------------------- |
| `counterSlice.js` | Counter state, reducers, generated actions  |
| `userSlice.js`    | User state, reducer, generated action       |
| `store.js`        | Creates Redux store with `configureStore()` |
| `Counter.jsx`     | Reads state and dispatches actions          |
| `App.jsx`         | Renders the Counter component               |
| `main.jsx`        | Wraps application with Redux `Provider`     |
