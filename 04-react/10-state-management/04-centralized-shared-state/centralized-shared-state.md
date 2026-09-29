# Centralized Shared State

## Why Do We Need Centralized Shared State?

As an application grows, more and more components may need access to the same data and functions.

For example, consider an e-commerce application.

We may have components such as:

```text
App
│
├── Product
│    └── ProductDetails
│         └── AddNewProduct
│
└── CartModal
     └── CartItems
```

Different components may need access to common information such as:

* Product list
* Selected product
* Cart items
* Cart count
* Add to cart function
* Remove from cart function
* Update cart function

---

# Keeping Shared State in App

One approach is to keep all the shared state in the common parent component, such as `App`.

For example:

```jsx
const [productList, setProductList] = useState([]);
const [selectedProduct, setSelectedProduct] = useState(null);
const [cartItems, setCartItems] = useState([]);
```

We may also have functions such as:

```jsx
const handleAddToCart = () => {
  // add product to cart
};

const handleRemoveFromCart = () => {
  // remove product from cart
};

const handleUpdateCart = () => {
  // update cart
};
```

The parent can then pass the required data and functions to its child components through props.

This works well when the component tree is relatively simple.

---

# The Problem as the Application Grows

As the component tree becomes larger and deeper, passing all the shared information through props can become difficult.

For example:

```text
App
 ↓
Product
 ↓
ProductDetails
 ↓
AddNewProduct
```

Suppose `AddNewProduct` needs `handleAddToCart`.

`Product` and `ProductDetails` may not need this function themselves.

However, they still have to receive it and pass it to the next component:

```text
App
 │
 │ handleAddToCart
 ↓
Product
 │
 │ handleAddToCart
 ↓
ProductDetails
 │
 │ handleAddToCart
 ↓
AddNewProduct
```

This is **prop drilling**.

The intermediate components are acting as pass-through components.

---

# Centralized Shared State

Instead of keeping all commonly shared data and functions inside the `App` component, we can move them to a **centralized store**.

The store becomes a central place for shared application state and the functions that update that state.

Conceptually:

```text
                    Store
              /        |        \
             ↓         ↓         ↓
         Product   Product    CartModal
         List      Details
                            \
                             ↓
                         CartItems
```

Now components that need shared information can access it from the central store rather than depending on every intermediate component to pass it through props.

---

# What Can Be Kept in a Store?

In our e-commerce example, the store could contain shared information such as:

```text
Store
│
├── products
├── selectedProduct
├── cartItems
├── cartCount
│
├── addToCart()
├── removeFromCart()
└── updateCart()
```

For example:

### Shared Data

```text
products
selectedProduct
cartItems
cartCount
```

### Shared Functions

```text
addToCart()
removeFromCart()
updateCart()
```

These are examples of information that multiple components might need.

---

# Components Can Access What They Need

With centralized shared state, different components can access the pieces of information they need.

For example:

```text
Store
│
├── ProductList
│      └── products
│
├── ProductDetails
│      └── selectedProduct
│
├── AddNewProduct
│      └── addToCart()
│
└── CartItems
       ├── cartItems
       └── removeFromCart()
```

The important idea is that these components don't necessarily need to receive the information through every component between themselves and the state.

---

# Before Centralized Shared State

With state kept in `App`, the data may need to travel through the component hierarchy:

```text
                         App
                          |
                     Shared State
                          |
             ┌────────────┴────────────┐
             ↓                         ↓
          Product                  CartModal
             ↓                         ↓
      ProductDetails              CartItems
             ↓
       AddNewProduct
```

If a deeply nested component needs something from `App`, props may have to be passed through intermediate components.

---

# With Centralized Shared State

With a central store:

```text
                         Store
                  /        |        \
                 ↓         ↓         ↓
            Product     Product    Cart
             List       Details
                 \         /          \
                  ↓       ↓            ↓
                  Components access
                  shared information
```

The store provides a central place for the shared state.

---

# Important: Not All State Needs to Be Shared

Centralized shared state does **not** mean that every piece of state in an application should be placed in a store.

For example, suppose a component has a simple input:

```jsx
const [searchText, setSearchText] = useState("");
```

If only that component needs `searchText`, there may be no reason to put it into a centralized store.

Local state can remain local when it is only needed by one component.

Centralized state is useful when information needs to be shared across multiple components.

---

# Local State vs. Shared State

### Local State

State is needed by only one component.

```text
Component
   ↓
useState()
```

### Shared State

Multiple components need the same information.

```text
             Shared State
             /     |     \
            ↓      ↓      ↓
       Component Component Component
```

The more components that need the same state, especially when they are separated by different levels of the component tree, the more useful a centralized approach can become.

---

# Centralized Shared State and Prop Drilling

These concepts are closely related.

### Prop Drilling

We pass data or functions through intermediate components:

```text
App
 ↓
Component A
 ↓
Component B
 ↓
Component C
 ↓
Component D
```

Even if `Component A`, `B`, and `C` don't use the information, they may have to receive and pass it along.

### Centralized Shared State

We keep commonly shared data and functions in one central place:

```text
              Store
            ↙   ↓   ↘
      Component Component Component
```

Components can access the shared information they need without requiring every intermediate component to pass it through props.

---

# Why Use a Central Store?

A centralized store can help us:

* Keep shared state in one place.
* Keep related state-management functions together.
* Reduce excessive prop drilling.
* Make shared data available to multiple components.
* Make the data flow easier to manage as an application grows.

---

# Important Concept

A centralized store is **not simply another place to put all application state**.

The purpose is to provide a central location for **state that needs to be shared across multiple parts of the application**.

We still use local state for information that belongs only to a particular component.

---

# From Prop Drilling to Centralized Shared State

Our progression so far is:

```text
Local State
     ↓
Lifting State Up
     ↓
Prop Drilling
     ↓
Centralized Shared State
```

### Local State

A component manages its own state.

### Lifting State Up

When multiple components need the same state, move it to their closest common parent.

### Prop Drilling

As the component tree becomes deeper, shared state and functions may have to be passed through multiple intermediate components.

### Centralized Shared State

Instead of passing shared information through many levels, we can keep commonly shared state and related functions in a central store.

---

# Next Step: Context API

Now that we understand **why** we may want a central place for shared state, the next question is:

> How can we make shared data available to components without passing it through every level of the component tree?

React provides the **Context API** to help with this type of problem.

We can use Context to provide values to components without manually passing props through each intermediate c
