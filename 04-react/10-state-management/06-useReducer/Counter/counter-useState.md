# Counter using useState

## Overview

Before learning `useReducer`, we first reviewed how we can manage a simple counter using the `useState` Hook.

`useState` is a good choice when the state management logic is simple.

---

## Basic Counter

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Counter: {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>

      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

export default Counter;
```

---

## Understanding useState

The basic syntax is:

```js
const [state, setState] = useState(initialValue);
```

In our counter example:

```js
const [count, setCount] = useState(0);
```

### `count`

`count` is the current state value.

Initially:

```text
count = 0
```

When the user clicks **Increment**, the value changes to:

```text
count = 1
```

When the user clicks **Decrement**, it changes again.

The state value changes over time based on user interactions.

### `setCount`

`setCount` is the state setter function.

We use it to request a state update:

```js
setCount(count + 1);
```

Calling the setter does **not reload the page**.

It tells React that the state has changed, and React re-renders the component with the updated state.

---

## Increment

```js
setCount(count + 1);
```

If the current count is `5`:

```text
count = 5
```

After:

```js
setCount(count + 1);
```

the new state becomes:

```text
count = 6
```

---

## Decrement

```js
setCount(count - 1);
```

If the current count is `5`, the new state becomes:

```text
count = 4
```

---

## Reset

We can reset the counter by setting the state back to `0`:

```js
setCount(0);
```

---

## When is useState a good choice?

`useState` works well when:

* State is simple.
* There are only a few state values.
* State updates are straightforward.
* There are not many different actions or conditions controlling the state.

For a simple counter, `useState` is easy to understand and is usually sufficient.

When the state logic becomes more complex, `useReducer` can provide a more structured way to manage it.

---

## Key Takeaway

For a simple counter:

```text
User clicks button
       ↓
setCount()
       ↓
State changes
       ↓
React re-renders
       ↓
Updated count is displayed
```

`useState` is a simple and convenient way to manage straightforward component state.
