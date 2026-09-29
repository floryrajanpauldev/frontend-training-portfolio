# Shopping Cart – Context API + useReducer

This example combines **Context API** and **useReducer** to create a simple shopping cart.

The goal is to see how these two concepts work together in a more realistic application.

## Why use Context API + useReducer?

A shopping cart has state that may be needed by several components.

For example:

```text
Header
   └── Cart count

Product List
   └── Add to Cart

Cart
   ├── Cart items
   ├── Increase quantity
   ├── Decrease quantity
   ├── Remove item
   └── Clear cart
```

If we manage the cart state in one component and pass it through props, we can quickly end up with prop drilling.

Instead, we can use:

* **Context API** to share the cart state and `dispatch`.
* **useReducer** to manage all the cart-related state changes.

---

# Cart State

Our initial state contains the cart items:

```js
const initialState = {
  cartItems: []
};
```

Each item in the cart can contain:

```js
{
  id: 1,
  title: "Laptop",
  price: 999,
  quantity: 1
}
```

---

# Cart Actions

The cart can have several actions:

```text
addToCart
removeFromCart
increaseQuantity
decreaseQuantity
clearCart
```

Instead of creating separate setter functions for each operation, we dispatch actions.

For example:

```js
dispatch({
  type: "addToCart",
  payload: product
});
```

---

# Reducer

The reducer contains the cart logic.

## Add to Cart

When a product is added:

* If the product is already in the cart, increase its quantity.
* Otherwise, add it with a quantity of `1`.

```js
case "addToCart": {
  const existingItem = state.cartItems.find(
    (item) => item.id === action.payload.id
  );

  if (existingItem) {
    return {
      ...state,
      cartItems: state.cartItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    };
  }

  return {
    ...state,
    cartItems: [
      ...state.cartItems,
      {
        ...action.payload,
        quantity: 1
      }
    ]
  };
}
```

---

# Increase Quantity

```js
case "increaseQuantity":
  return {
    ...state,
    cartItems: state.cartItems.map((item) =>
      item.id === action.payload
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  };
```

The product ID is passed as the payload:

```js
dispatch({
  type: "increaseQuantity",
  payload: item.id
});
```

---

# Decrease Quantity

If the quantity is greater than `1`, decrease it.

If the quantity is `1`, remove the item from the cart.

```js
case "decreaseQuantity":
  return {
    ...state,
    cartItems: state.cartItems
      .map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  };
```

---

# Remove Item

```js
case "removeFromCart":
  return {
    ...state,
    cartItems: state.cartItems.filter(
      (item) => item.id !== action.payload
    )
  };
```

---

# Clear Cart

```js
case "clearCart":
  return {
    ...state,
    cartItems: []
  };
```

---

# Context Provider

The Provider uses `useReducer`:

```js
const [state, dispatch] = useReducer(reducer, initialState);
```

Then it shares both through Context:

```jsx
<ShoppingCartContext.Provider value={{ state, dispatch }}>
  {children}
</ShoppingCartContext.Provider>
```

Any component inside the Provider can now access:

```js
const { state, dispatch } = useContext(ShoppingCartContext);
```

---

# Product Component

The product component does not need to know how the cart works.

It only needs to dispatch an action:

```js
dispatch({
  type: "addToCart",
  payload: product
});
```

The reducer is responsible for deciding what happens.

---

# Cart Component

The cart reads the state:

```js
state.cartItems
```

It can then display each item and dispatch actions:

```js
dispatch({
  type: "increaseQuantity",
  payload: item.id
});
```

```js
dispatch({
  type: "decreaseQuantity",
  payload: item.id
});
```

```js
dispatch({
  type: "removeFromCart",
  payload: item.id
});
```

---

# Cart Count

Because the cart state is shared through Context, another component such as a Header can also access the cart.

For example:

```js
const { state } = useContext(ShoppingCartContext);

const cartCount = state.cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);
```

The Header does not need to receive the cart count through props.

---

# Overall Flow

```text
                    ShoppingCartProvider
                            |
                     useReducer()
                            |
                    state + dispatch
                            |
             +--------------+--------------+
             |              |              |
           Header        Products         Cart
             |              |              |
        cart count      addToCart      cartItems
                            |              |
                            |        increaseQuantity
                            |        decreaseQuantity
                            |        removeFromCart
                            |        clearCart
                            |              |
                            +------↓-------+
                                dispatch
                                   |
                                reducer
                                   |
                              updated state
```

## Key Takeaway

This example demonstrates the main reason for combining Context API and `useReducer`.

**Context API:**

> Shares the state and `dispatch` function with components that need them.

**useReducer:**

> Keeps the related state-transition logic in one centralized reducer.

Together, they allow us to build a small centralized state-management solution without passing cart data and functions through multiple levels of props.

This pattern can work well for smaller applications where several components need access to related state and the state logic involves multiple actions.
