# React Events and State

## Topics

| Topic | Key idea |
|---|---|
| `onClick` | Respond to clicks |
| `onSubmit` | Respond to form submission |
| `onChange` | Respond to input value changes |
| `onBlur` | Respond when an input loses focus |
| Event object | Access `event.target`, `event.currentTarget`, and event methods |
| `preventDefault()` | Stop the browser's default action |
| Event bubbling | Events move from a target toward parent elements |
| `stopPropagation()` | Stop an event from bubbling to parents |
| Function props | Parent sends a function to a child through props |
| `useState()` | Store component state and trigger UI updates |
| Functional updates | Use the previous state value |
| State isolation | Each component instance has its own state |
| Conditional rendering | Use `&&` to render only when a condition is true |

## Named and Inline Event Handlers

```jsx
function handleClick(event) {
  console.log(event);
}

<button onClick={handleClick}>Click Me</button>
```

Inline handler:

```jsx
<button onClick={() => alert('Playing video')}>
  Play Video
</button>
```

Pass the function itself, not the result of calling it:

```jsx
onClick={handleClick}
```

not:

```jsx
onClick={handleClick()}
```

## `preventDefault()` vs `stopPropagation()`

```jsx
event.preventDefault();
```

Stops the browser's default action.

```jsx
event.stopPropagation();
```

Stops the event from bubbling to parent elements.

## Passing a Function to a Child

Parent:

```jsx
function App() {
  function handlePlay() {
    alert('Playing video');
  }

  return <Video onPlay={handlePlay} />;
}
```

Child:

```jsx
function Video({ onPlay }) {
  return <button onClick={onPlay}>Play Video</button>;
}
```

The parent defines the action; the child triggers it.

## `useState()`

```jsx
const [count, setCount] = useState(0);
```

- `count` is the current state value.
- `setCount` is the state setter.
- `0` is the initial value.

When the setter updates state, React renders again and updates the necessary UI.

### Previous State Pattern

When the next value depends on the previous value:

```jsx
setCount((previousCount) => previousCount + 1);
```

For decrement:

```jsx
setCount((previousCount) => previousCount - 1);
```

The updater function receives the latest previous state as React processes queued updates.

## State Is Independent Per Component Instance

```jsx
<Counter />
<Counter />
```

Each rendered `Counter` has its own `count` state.

## Conditional Rendering

```jsx
{isVisible && <div>This text can be shown or hidden.</div>}
```

The `<div>` is rendered only when `isVisible` is true.

## Practice Challenges

1. Play, pause, and stop video event handlers.
2. Pass a play function from `App` to `Video`.
3. Increment and decrement a counter.
4. Toggle content using state and `&&`.
