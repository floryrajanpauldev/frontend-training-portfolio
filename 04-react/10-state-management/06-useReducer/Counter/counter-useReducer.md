# Counter using useReducer

## Overview

We first created a simple counter using `useState`.

We then created the same counter using `useReducer` to understand how `useReducer` manages state differently.

`useReducer` can be useful when state management involves multiple actions, conditions, or related state values.

---

# useReducer Syntax

The basic syntax is:

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

There are four important parts:

| Term           | Meaning                                          |
| -------------- | ------------------------------------------------ |
| `state`        | Current state                                    |
| `dispatch`     | Function used to send an action                  |
| `reducer`      | Function containing the rules for updating state |
| `initialState` | Starting state                                   |

---

# Simple Counter

For the first version of the counter, the state can simply be a number:

```js
const initialState = 0;
```

The reducer receives two arguments:

```js
function reducer(state, action) {
  // state transition logic
}
```

The reducer checks the action and returns the new state.

```js
function reducer(state, action) {
  if (action.type === "increment") {
    return state + 1;
  }

  if (action.type === "decrement") {
    return state - 1;
  }

  if (action.type === "reset") {
    return 0;
  }

  return state;
}
```

---

# Dispatch

Instead of directly updating the state with a setter like `setCount`, we use `dispatch()`.

For example:

```js
dispatch({
  type: "increment"
});
```

The action tells the reducer what happened.

The reducer then decides how the state should change.

---

# Adding Increment and Decrement

Increment:

```js
dispatch({
  type: "increment"
});
```

Reducer:

```js
if (action.type === "increment") {
  return state + 1;
}
```

Decrement:

```js
dispatch({
  type: "decrement"
});
```

Reducer:

```js
if (action.type === "decrement") {
  return state - 1;
}
```

Reset:

```js
dispatch({
  type: "reset"
});
```

Reducer:

```js
if (action.type === "reset") {
  return 0;
}
```

---

# Refactoring State into an Object

We then changed the initial state from a primitive value to an object.

```js
const initialState = {
  count: 0,
  increment: 2,
  decrement: 2
};
```

Now the state contains multiple related values.

```text
count
increment
decrement
```

The reducer must access the properties through `state`.

For example:

```js
state.count
state.increment
state.decrement
```

---

# Updating Object State

When updating an object state, we use the spread operator.

For increment:

```js
return {
  ...state,
  count: state.count + state.increment
};
```

For decrement:

```js
return {
  ...state,
  count: state.count - state.decrement
};
```

The spread operator copies the existing state properties.

Then we update only the property that needs to change.

---

# Why use the Spread Operator?

Suppose the state is:

```js
{
  count: 10,
  increment: 2,
  decrement: 2
}
```

If we returned:

```js
return {
  count: state.count + state.increment
};
```

the other properties would be lost.

Instead:

```js
return {
  ...state,
  count: state.count + state.increment
};
```

keeps the existing properties and changes only `count`.

---

# Switch Statement

When there are multiple actions, a `switch` statement is a common way to organize the reducer.

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

The `default` case returns the current state when the action type is not recognized.

---

# Important Naming Conventions

Names such as these are conventions:

```js
state
dispatch
reducer
initialState
action
type
payload
```

They are **not reserved JavaScript keywords**.

For example, we could technically write:

```js
const [data, sendAction] = useReducer(myReducer, startingValue);
```

However, using conventional names such as `state`, `dispatch`, `reducer`, and `initialState` makes React code easier for other developers to understand.

---

# The Action Object

An action is commonly represented as an object:

```js
{
  type: "increment"
}
```

The `type` identifies the action.

When additional information needs to be sent to the reducer, we commonly use `payload`.

For example:

```js
{
  type: "incrementBy",
  payload: 5
}
```

`payload` is a convention used to carry additional data. It is not a reserved JavaScript keyword.

---

# Examples Where useReducer Can Help

## Shopping Cart

A shopping cart can have several actions:

```text
Add item
Remove item
Increase quantity
Decrease quantity
Change item color
Apply coupon
```

The reducer can contain the rules for these state transitions.

---

## Login Form

A login form can have related state such as:

```text
username
password
errors
loading
login status
user data
```

Actions could include:

```text
Set username
Set password
Validate input
Display error
Login success
Login failure
```

---

## Video Player

A video player can have actions such as:

```text
Play
Pause
Stop
Restart
Skip ad
Fast-forward
```

These actions can all affect the state of the video player.

---

# useState vs useReducer

### useState

```text
State
  ↓
Setter function
  ↓
Updated state
```

### useReducer

```text
State
  ↓
dispatch(action)
  ↓
reducer
  ↓
Updated state
```

With `useReducer`, the state-transition logic is centralized in the reducer.

---

# Mental Model

The overall flow is:

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

# Key Takeaway

`useState` is often a good choice for simple state management.

`useReducer` becomes useful when state management involves multiple related actions, conditions, or more complex state-transition logic.

The reducer acts like a central **rule book** that determines how the state should change based on the action that was dispatched.
