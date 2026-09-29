# Lifting State Up — Input and Display Example

## Scenario

Imagine we have an input box where the user enters their full name.

We want to:

1. Allow the user to enter their name in one component.
2. Display the entered name in a different component.

The `Input` and `DisplayInput` components are both children of `App`.

```text
                    App
                     |
              fullname state
                     |
             ┌───────┴───────┐
             ↓               ↓
           Input        DisplayInput
             |               |
        changes value    displays value
```

Because both components need the same state, we move the state to their common parent, `App`.

---

## State in App

```jsx
const [fullname, setFullName] = useState("");
```

`App` owns the `fullname` state.

We create a handler to update the state:

```jsx
const handleInputChange = (event) => {
  setFullName(event.target.value);
};
```

The current `fullname` and the change handler are passed to `Input`:

```jsx
<Input
  fullname={fullname}
  onHandleChange={handleInputChange}
/>
```

The current `fullname` is also passed to `DisplayInput`:

```jsx
<DisplayInput fullname={fullname} />
```

---

## Input Component

The `Input` component receives two props:

* `fullname`
* `onHandleChange`

```jsx
const { fullname, onHandleChange } = props;
```

The input value is controlled by the `fullname` state:

```jsx
<input
  type="text"
  name="fullname"
  value={fullname}
  onChange={onHandleChange}
/>
```

This is called a **controlled input** because React state controls the value of the input.

---

## DisplayInput Component

`DisplayInput` receives the current `fullname` through props:

```jsx
<DisplayInput fullname={fullname} />
```

It then displays the value:

```jsx
<div>
  The user's full name is given as {props.fullname}
</div>
```

---

## How the Data Flows

When the user enters a value:

```text
User types
    ↓
Input onChange
    ↓
handleInputChange()
    ↓
setFullName(event.target.value)
    ↓
fullname state in App is updated
    ↓
App re-renders
    ↓
Updated fullname is passed to DisplayInput
    ↓
DisplayInput displays the value
```

---

## Why Are We Lifting the State?

The `Input` component needs to update the value.

The `DisplayInput` component needs to display the value.

Neither component should independently own the `fullname` state because they need to work with the same value.

Therefore, we move the state to their common parent, `App`.

---

## Key Takeaway

When multiple components need access to the same state, we can lift the state up to their closest common parent.

The parent can then pass:

* State values to components that need to read them.
* Event handlers or setter functions to components that need to update them.

This allows multiple components to work with the same source of truth.
