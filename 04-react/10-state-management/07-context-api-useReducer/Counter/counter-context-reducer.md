# useReducer with Context API – Counter

In the previous examples, we used:

* `useState` for local state.
* Context API to share state between components.
* `useReducer` to manage more complex state logic.

In this example, we will combine **Context API and useReducer**.

## Why combine Context API and useReducer?

Context API and `useReducer` solve two different problems.

### Context API – Sharing State

Context API allows us to make values available to multiple components without passing them through props at every level.

For example:

```text
Provider
   |
   +-- Home
   |
   +-- Users
   |
   +-- Products
```

Any component inside the Provider can access the values from the Context.

### useReducer – Managing State Logic

`useReducer` helps us keep related state changes and their logic in one place.

Instead of having multiple state setter functions such as:

```js
setCount()
setIncrement()
setDecrement()
```

we can have:

```js
dispatch({ type: "increment" })
dispatch({ type: "decrement" })
dispatch({ type: "reset" })
```

The reducer decides how the state should change.

### Together

The Provider becomes the central place that manages the state:

```text
                 Context Provider
                       |
                state + dispatch
                       |
        +--------------+--------------+
        |              |              |
      Home           Users         Products
```

The Provider uses `useReducer` to manage the state and Context API to share the state and `dispatch` function with its child components.

This gives us a simple centralized state-management pattern that can be useful for smaller applications.

---

# Step 1 – Create the Context

Import `createContext` from React and create the Context.

```js
import { createContext } from "react";

export const CounterContextReducer = createContext();
```

We export the Context so that other components can consume it.

---

# Step 2 – Create the Provider

Create a Provider component.

The Provider receives `children` and makes the state and dispatch function available to those children.

```jsx
export function CounterContextReducerProvider({ children }) {
  return (
    <CounterContextReducer.Provider value={{ state, dispatch }}>
      {children}
    </CounterContextReducer.Provider>
  );
}
```

In this example, the Provider's `value` is an object because we need to share more than one value:

```js
{
  state,
  dispatch
}
```

---

# Step 3 – Create the Initial State

Our counter has multiple related values, so we use an object for the initial state.

```js
const initialState = {
  count: 0,
  increment: 2,
  decrement: 2
};
```

---

# Step 4 – Create the Reducer

The reducer contains the logic for changing the state.

```js
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + state.increment
      };

    case "decrement":
      return {
        ...state,
        count: state.count - state.decrement
      };

    case "reset":
      return {
        ...state,
        count: 0
      };

    default:
      return state;
  }
}
```

The reducer receives:

```js
(state, action)
```

* `state` – the current state.
* `action` – describes what change should happen.

---

# Step 5 – Use useReducer inside the Provider

Import `useReducer`:

```js
import { createContext, useReducer } from "react";
```

Then:

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

`useReducer` returns:

* `state` – the current state.
* `dispatch` – the function used to send actions to the reducer.

---

# Step 6 – Pass State and Dispatch through Context

The Provider passes both values through Context:

```jsx
<CounterContextReducer.Provider value={{ state, dispatch }}>
  {children}
</CounterContextReducer.Provider>
```

Now any component inside this Provider can access:

```js
state
dispatch
```

---

# Step 7 – Consume the Context

In a child component:

```js
import { useContext } from "react";
import { CounterContextReducer } from "./CounterContextReducer";
```

Then:

```js
const { state, dispatch } = useContext(CounterContextReducer);
```

We can now display the count:

```jsx
<h2>Counter: {state.count}</h2>
```

And dispatch actions:

```jsx
<button onClick={() => dispatch({ type: "increment" })}>
  Increment
</button>

<button onClick={() => dispatch({ type: "decrement" })}>
  Decrement
</button>

<button onClick={() => dispatch({ type: "reset" })}>
  Reset
</button>
```

---

# Overall Flow

The complete flow is:

```text
User clicks button
       ↓
dispatch({ type: "increment" })
       ↓
reducer(state, action)
       ↓
Reducer checks action.type
       ↓
Returns updated state
       ↓
React re-renders
       ↓
Context provides updated state
       ↓
Component displays updated value
```

## Key Takeaway

**Context API answers:**

> How do I share this state with multiple components?

**useReducer answers:**

> How should this state change when different actions occur?

Together:

> **Context API shares the state and dispatch function, while useReducer manages the state and the logic for changing it.**

This pattern can be useful for small or moderately simple applications where we want centralized state management without introducing a larger state-management library.
