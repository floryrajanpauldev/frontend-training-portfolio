# Prop Drilling

## What is Prop Drilling?

**Prop drilling** happens when data or functions need to be passed through multiple levels of components using props, even though some of the intermediate components do not actually need the data themselves.

The data is simply being passed through those components so that it can eventually reach a deeply nested component.

---

# Example: E-Commerce Application

Consider an e-commerce application with the following component structure:

```text
App
│
├── Product
│    │
│    └── ProductDetails
│          │
│          └── AddNewProduct
│
└── CartModal
      │
      └── CartItems
```

As the application grows, we may have more components:

```text
App
│
├── Product
│    │
│    └── ProductDetails
│          │
│          └── AddNewProduct
│
└── CartModal
      │
      └── CartItems
```

Now imagine that some product or cart-related state needs to be shared between these components.

For example:

* Product information
* Selected product
* Cart items
* Cart count
* Functions to add a product to the cart
* Functions to remove a product from the cart
* Functions to update cart items

Because these components are at different levels of the component tree, we may start passing these values and functions through props.

---

# How Prop Drilling Happens

Suppose `App` owns the cart state:

```jsx
const [cartItems, setCartItems] = useState([]);
```

And `App` has a function for adding a product:

```jsx
const handleAddToCart = (product) => {
  // add product to cart
};
```

We want `AddNewProduct` to call `handleAddToCart()`.

But `AddNewProduct` is deeply nested.

The data may need to travel through several components:

```text
App
 ↓
Product
 ↓
ProductDetails
 ↓
AddNewProduct
```

For the function to reach `AddNewProduct`, we might have:

```jsx
<App>
  <Product onAddToCart={handleAddToCart} />
</App>
```

Then:

```jsx
<ProductDetails onAddToCart={onAddToCart} />
```

Then:

```jsx
<AddNewProduct onAddToCart={onAddToCart} />
```

Notice that `Product` and `ProductDetails` may not actually use `onAddToCart`.

They are simply passing it down.

This is **prop drilling**.

---

# Visualizing Prop Drilling

```text
                    App
                     |
              onAddToCart
                     ↓
                  Product
                     |
              onAddToCart
                     ↓
              ProductDetails
                     |
              onAddToCart
                     ↓
              AddNewProduct
```

The function originates in `App`, but it has to travel through components that don't need to use it.

---

# Another Example: Cart Items

Now imagine that `App` owns the cart items:

```jsx
const [cartItems, setCartItems] = useState([]);
```

But `CartItems` needs access to those items.

The structure might be:

```text
App
 ↓
CartModal
 ↓
CartItems
```

We may need:

```jsx
<App>
  <CartModal cartItems={cartItems} />
</App>
```

And then:

```jsx
<CartItems cartItems={cartItems} />
```

`CartModal` may not actually need to use `cartItems`.

It is only receiving the prop so that it can pass it to `CartItems`.

Again, this is prop drilling.

---

# Why Can Prop Drilling Become a Problem?

Prop drilling is **not inherently bad**.

Passing props through one or two levels is completely normal in React.

The problem occurs when the component tree becomes deeper and many pieces of data and functions need to travel through multiple components.

For example:

```text
App
 ↓
Product
 ↓
ProductDetails
 ↓
AddNewProduct
 ↓
ProductForm
 ↓
ProductActions
```

Now imagine passing several props through every level:

```text
product
selectedProduct
cartItems
cartCount
onAddToCart
onRemoveFromCart
onUpdateCart
```

The intermediate components may have to accept and forward all these props even though they don't use them.

---

# Problems Caused by Excessive Prop Drilling

## 1. Intermediate Components Receive Props They Don't Need

A component may receive props only because it needs to pass them to another component.

For example:

```jsx
function ProductDetails({
  product,
  cartItems,
  onAddToCart,
  onRemoveFromCart
}) {
  return (
    <AddNewProduct
      product={product}
      cartItems={cartItems}
      onAddToCart={onAddToCart}
      onRemoveFromCart={onRemoveFromCart}
    />
  );
}
```

`ProductDetails` may not use `cartItems`, `onAddToCart`, or `onRemoveFromCart`.

It is simply forwarding them.

---

## 2. Components Become Harder to Maintain

Imagine adding another shared value:

```jsx
const [cartCount, setCartCount] = useState(0);
```

Now `cartCount` may need to be passed through several components.

If the component structure changes, we may have to update the props in multiple places.

---

## 3. Components Become Tightly Connected

The intermediate components become aware of data that is actually meant for another component.

For example:

```text
Product
 ↓
ProductDetails
 ↓
AddNewProduct
```

If `Product` has to know about every prop that `AddNewProduct` needs, the components become more tightly connected.

---

## 4. Prop Lists Can Become Large

A component can end up receiving many props:

```jsx
<ProductDetails
  product={product}
  cartItems={cartItems}
  cartCount={cartCount}
  selectedProduct={selectedProduct}
  onAddToCart={handleAddToCart}
  onRemoveFromCart={handleRemoveFromCart}
  onUpdateCart={handleUpdateCart}
/>
```

This can make the component harder to understand and maintain.

---

# Prop Drilling vs. Lifting State Up

These two concepts are related but they are not the same thing.

### Lifting State Up

We move state to the closest common parent when multiple components need to share it.

```text
       App
      /   \
     ↓     ↓
 Child A  Child B
```

The common parent owns the state and passes the necessary data/functions to its children.

This is a normal and useful React pattern.

### Prop Drilling

Prop drilling can happen when those props have to travel through **multiple intermediate components** just to reach a deeply nested component.

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

If `Component A`, `B`, and `C` don't need the data but must pass it down to `D`, we have prop drilling.

---

# Important Distinction

> **Lifting state up solves the problem of sibling components needing shared state.**

> **Prop drilling describes the problem of passing that state or related functions through multiple levels of components.**

So lifting state up can sometimes lead to prop drilling as the application becomes larger.

---

# E-Commerce Example

A simple application might start like this:

```text
App
├── Product
└── Cart
```

Passing props here is straightforward.

As the application grows:

```text
App
│
├── Product
│    └── ProductDetails
│         └── AddNewProduct
│
└── CartModal
     └── CartItems
          └── CartItem
               └── CartActions
```

Now multiple components may need access to the same product and cart-related data.

Passing everything through props can become increasingly difficult:

```text
App
 ↓
Product
 ↓
ProductDetails
 ↓
AddNewProduct
 ↓
ProductForm
 ↓
ProductActions
```

This is where we start seeing the limitations of relying only on props for widely shared state.

---

# Key Takeaway

Prop drilling is not a problem simply because props are being passed from parent to child.

Props are one of the fundamental ways React components communicate.

The problem is **excessive prop drilling**, where:

* Data needs to travel through many component levels.
* Intermediate components don't need the data.
* Functions have to be passed through components just to reach a deeply nested component.
* Components become harder to maintain.
* Adding or changing shared data requires modifying many components.

This is one of the reasons React applications may introduce other state-sharing approaches as they become more complex.

```text
Simple component tree
        ↓
       Props
        ↓
Works well

Complex component tree
        ↓
Many levels of prop passing
        ↓
Prop drilling
        ↓
Can become difficult to maintain
```

# Prop Drilling — Passing Props Through Components

One of the main problems with prop drilling is that an intermediate component may need to **receive and pass a prop even though it never actually uses or reads that prop**.

The component is only acting as a **pass-through**.

## Example

Consider:

```text
App
 ↓
Product
 ↓
ProductDetails
 ↓
AddNewProduct
```

Suppose `App` has a function:

```jsx
const handleAddToCart = (product) => {
  // add product to cart
};
```

The `AddNewProduct` component needs this function.

However, `App` does not render `AddNewProduct` directly.

Instead:

```text
App
 ↓
Product
 ↓
ProductDetails
 ↓
AddNewProduct
```

Therefore, the prop has to travel through `Product` and `ProductDetails`.

### App

```jsx
<Product onAddToCart={handleAddToCart} />
```

### Product

`Product` does not need to use `onAddToCart`.

But it still has to receive it:

```jsx
function Product({ onAddToCart }) {
  return (
    <ProductDetails onAddToCart={onAddToCart} />
  );
}
```

### ProductDetails

`ProductDetails` also does not need to use the function.

But it still has to receive and pass it:

```jsx
function ProductDetails({ onAddToCart }) {
  return (
    <AddNewProduct onAddToCart={onAddToCart} />
  );
}
```

### AddNewProduct

Finally, the component that actually needs the function receives it:

```jsx
function AddNewProduct({ onAddToCart }) {
  return (
    <button onClick={() => onAddToCart(product)}>
      Add to Cart
    </button>
  );
}
```

## What Is Happening?

The important point is:

> `Product` and `ProductDetails` are not using `onAddToCart`. They are only receiving it because they need to pass it to the next component.

So the prop is traveling through the component tree:

```text
App
 │
 │ onAddToCart
 ↓
Product
 │
 │ onAddToCart
 ↓
ProductDetails
 │
 │ onAddToCart
 ↓
AddNewProduct
 │
 ↓
Uses onAddToCart
```

The intermediate components are essentially saying:

> "I don't need this information, but I have to receive it so I can pass it to my child."

This is the essence of **prop drilling**.

---

# Why This Becomes Difficult

Imagine the application grows and we now need to pass:

```text
product
cartItems
cartCount
selectedProduct
onAddToCart
onRemoveFromCart
onUpdateCart
```

Even if `Product` doesn't use any of these values, it may still need to receive them and pass them to `ProductDetails`.

For example:

```jsx
function Product({
  product,
  cartItems,
  cartCount,
  selectedProduct,
  onAddToCart,
  onRemoveFromCart,
  onUpdateCart
}) {
  return (
    <ProductDetails
      product={product}
      cartItems={cartItems}
      cartCount={cartCount}
      selectedProduct={selectedProduct}
      onAddToCart={onAddToCart}
      onRemoveFromCart={onRemoveFromCart}
      onUpdateCart={onUpdateCart}
    />
  );
}
```

The `Product` component may not read or use most of these props.

It is simply **passing information through**.

As the component tree becomes deeper and the number of props increases, this can make the application harder to understand and maintain.

---

# Key Takeaway

> **Prop drilling happens when data or functions are passed through intermediate components that don't need to use them, simply because they need to pass that information to a deeper component.**

The important distinction is:

```text
Receiving a prop and using it
        ↓
Normal prop passing

Receiving a prop only to pass it to another component
        ↓
Prop drilling
```

Prop drilling is not automatically bad. Passing props through a small number of components is completely normal in React.

It becomes a problem when the data has to travel through many levels of the component tree and many intermediate components are only acting as pass-through components.
