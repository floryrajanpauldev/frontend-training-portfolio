# Local State

## What is State?

**State** is data that can change over time and affects what the user sees or how the application behaves.

React provides different ways to manage state depending on where the state needs to be used.

---

## Local State

**Local state** is state that belongs to a particular component.

We commonly manage local state using the `useState()` hook.

For example, if we have a counter within a component, we can use `useState()` to store and update the count.

```jsx
const [count, setCount] = useState(0);
```

Here:

* `count` is the current state value.
* `setCount` is the function used to update the state.
* `useState(0)` initializes the state with `0`.

When the state changes, React re-renders the component and the updated value is displayed.

---

## Counter Example

A counter can have multiple actions:

* Increment
* Decrement
* Increment by a specific value

### Increment

```jsx
const handleIncrement = () => {
  setCount((prevCountVal) => prevCountVal + 1);
};
```

### Decrement

```jsx
const handleDecrement = () => {
  setCount((prevCountVal) => prevCountVal - 1);
};
```

### Increment by a Value

```jsx
const handleIncrementBy = (value) => {
  setCount((prevCountVal) => prevCountVal + value);
};
```

---

## Using the Previous State Value

In these examples, the new value depends on the previous value.

For example:

```jsx
setCount((prevCountVal) => prevCountVal + 1);
```

The function receives the previous state value and returns the new state value.

This functional form is useful when the new state depends on the previous state.

---

## Key Takeaway

Local state is state that is primarily used within a component.

The `useState()` hook allows a component to:

1. Create state.
2. Read the current state.
3. Update the state.
4. Re-render the UI when the state changes.

Example:

```jsx
const [count, setCount] = useState(0);
```

The state is local because it belongs to the component where `useState()` is declared.
