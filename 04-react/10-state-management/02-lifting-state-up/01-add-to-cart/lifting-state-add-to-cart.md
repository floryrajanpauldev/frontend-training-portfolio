# Lifting State Up — Add to Cart Example

## What is Lifting State Up?

**Lifting state up** means moving state from a child component to their closest common parent when multiple components need to use or update that state.

The parent component owns the state and passes the required state value or state setter to the child components through props.

---

## Example: Add to Cart

Consider an application with the following components:

```text
                 App
                /   \
               /     \
          Product    DisplayCart
             |
             |
      AddToCartButton
```

The user clicks **Add to Cart** inside `AddToCartButton`.

We want the cart count to be displayed in `DisplayCart`.

Both components need to work with the same state.

Therefore, we keep the state in their common parent, `App`.

---

## State Lives in the Common Parent

In `App.jsx`:

```jsx
const [count, setCount] = useState(0);
```

`App` owns the state because this is where `useState()` is declared.

We then pass `setCount` to the `Product` component:

```jsx
<Product setCount={setCount} />
```

`Product` passes it to `AddToCartButton`:

```jsx
<AddToCartButton setCount={setCount} />
```

Finally, `AddToCartButton` uses the setter to update the state.

---

## AddToCartButton

The `AddToCartButton` component receives `setCount` through props.

It defines its own `handleAddToCart` function:

```jsx
function AddToCartButton({ setCount }) {
  const handleAddToCart = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return (
    <button onClick={handleAddToCart}>
      Add to Cart
    </button>
  );
}
```

Notice that `AddToCartButton` does **not** own the state.

The state still belongs to `App`.

The child component only receives the setter function and uses it to request a state update.

---

## DisplayCart

`DisplayCart` receives the current `count` from `App`:

```jsx
<DisplayCart count={count} />
```

It can then display the value:

```jsx
function DisplayCart({ count }) {
  return <div>Cart: {count}</div>;
}
```

---

## Data Flow

The state and setter flow through the component tree:

```text
                    App
                    |
             count / setCount
                    |
          ┌─────────┴─────────┐
          ↓                   ↓
       Product           DisplayCart
          |
       setCount
          ↓
   AddToCartButton
```

When the user clicks **Add to Cart**:

```text
User clicks button
       ↓
handleAddToCart()
       ↓
setCount(prev => prev + 1)
       ↓
App state is updated
       ↓
App re-renders
       ↓
Updated count is passed to DisplayCart
       ↓
Cart count is displayed
```

---

# Adding an Intermediate Component

Now suppose the `Add to Cart` button is inside a `Product` component.

The structure becomes:

```text
App
│
├── Product
│     └── AddToCartButton
│
└── DisplayCart
```

`Product` itself does not need to use `setCount`.

It only receives the prop from `App` and passes it down to `AddToCartButton`.

```jsx
<Product setCount={setCount} />
```

Then:

```jsx
<AddToCartButton setCount={setCount} />
```

This is an example of **prop drilling**.

The `setCount` prop is passed through `Product` even though `Product` does not need to use it itself.

We will explore how Context API can help with this type of problem later.

---

## Important Point

The component that calls `setCount()` does not necessarily own the state.

The component that declares the state with `useState()` owns the state.

In this example:

```jsx
const [count, setCount] = useState(0);
```

is declared in `App`.

Therefore, `App` owns the state.

---

## Key Takeaway

When multiple components need to use the same state:

1. Move the state to their closest common parent.
2. The parent becomes the owner of the state.
3. Pass the state value to components that need to display it.
4. Pass the state setter or a handler function to components that need to update it.
5. The child components communicate with the parent through props.
