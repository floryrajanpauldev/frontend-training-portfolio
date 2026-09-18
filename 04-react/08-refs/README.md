# React useRef

## Overview

`useRef` is a React Hook used to create a reference that persists between renders without causing a component to re-render when its value changes.

A common use of `useRef` is to reference and interact with DOM elements.

---

## useState vs useRef

| useState                              | useRef                                            |
| ------------------------------------- | ------------------------------------------------- |
| Stores data that affects the UI       | Stores a mutable value or DOM reference           |
| Updating state causes a re-render     | Updating `ref.current` does not cause a re-render |
| Used when the UI needs to update      | Commonly used for DOM references                  |
| Access value using the state variable | Access value using `.current`                     |

### Basic Syntax

```jsx
const myRef = useRef(null);
```

The value stored in the ref is accessed using:

```jsx
myRef.current
```

---

## 1. Focus an Input on Page Load

A ref can be attached to an input element.

```jsx
const inputRef = useRef(null);
```

Then connect the ref to the input:

```jsx
<input ref={inputRef} />
```

After the component mounts, the ref points to the actual DOM element.

We can then call:

```jsx
inputRef.current.focus();
```

### Why useEffect?

During the initial render, `inputRef.current` is `null`.

React first renders the input and attaches the ref to the DOM element.

`useEffect` runs after the component has mounted, so the DOM element is available.

```jsx
useEffect(() => {
  inputRef.current.focus();
}, []);
```

This is also a good example of how `useEffect` connects to the React component lifecycle.

---

## 2. Accessibility and Overlay Focus

When an overlay or modal is opened, focus needs to be managed appropriately for keyboard and assistive-technology users.

A ref can keep track of the element that opened the overlay.

```jsx
const triggerRef = useRef(null);
```

The ref is attached to the button:

```jsx
<button ref={triggerRef}>
  Open Overlay
</button>
```

When the overlay closes, focus can be returned to the triggering element:

```jsx
triggerRef.current.focus();
```

This is useful for accessible modal and overlay patterns.

---

## 3. Go to Top

`useRef` can also be used to reference an element on the page and scroll to it.

Create the ref:

```jsx
const topRef = useRef(null);
```

Attach it to the element at the top of the page:

```jsx
<div ref={topRef}>
  <h1>Top of the Page</h1>
</div>
```

When the user clicks the Go to Top button:

```jsx
topRef.current.scrollIntoView({
  behavior: "smooth",
});
```

`topRef.current` refers to the actual DOM element.

`scrollIntoView()` scrolls the page until that element is visible.

---

## Key Takeaways

* `useRef` creates a persistent reference.
* A ref can reference a DOM element.
* Access the referenced value using `.current`.
* Changing `ref.current` does **not** cause a re-render.
* `useRef` can be used to focus an input.
* `useRef` can help manage focus for accessible overlays.
* `useRef` can reference an element for scrolling.
* DOM operations that require the element to exist should happen after rendering, commonly inside `useEffect`.

---

## Files in This Section

| File                 | What It Demonstrates                               |
| -------------------- | -------------------------------------------------- |
| `FocusInputRef.jsx`  | Focus an input when the component mounts           |
| `OverlayExample.jsx` | Return focus to the element that opened an overlay |
| `GoToTopRef.jsx`     | Scroll to an element using `scrollIntoView()`      |

---

## Interview Questions

### What is useRef?

`useRef` is a React Hook that lets us create a mutable reference that persists between renders without causing a re-render when its value changes.

### What is the difference between useState and useRef?

`useState` is used for data that should update the UI and cause a re-render. `useRef` is commonly used for DOM references or values that need to persist between renders without triggering a re-render.

### What is `ref.current`?

`ref.current` contains the current value stored in the ref. When a ref is attached to a DOM element, `ref.current` points to that DOM element.

### Does changing `ref.current` cause a re-render?

No. Changing `ref.current` does not cause the component to re-render.

### Why do we use useEffect when focusing an input on page load?

Because the DOM element needs to exist before we call `.focus()`. `useEffect` runs after the component has been rendered and mounted.
