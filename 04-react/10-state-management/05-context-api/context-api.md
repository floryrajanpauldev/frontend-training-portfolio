# Context API

## What is Context API?

React Context API is a built-in React feature that allows us to share data between components without manually passing props through every level of the component tree.

It is especially useful when multiple components need access to the same data or functions.

### The Problem: Prop Drilling

Suppose `App` has some data that a deeply nested component needs:

```text
App
 ↓ props
Main
 ↓ props
Users
 ↓ props
UserDetails
```

The intermediate components may not need the data themselves, but they still have to receive and pass it.

This is called **prop drilling**.

Context API helps reduce this manual prop-passing.

---

# Benefits of Context API

### 1. Reduces Prop Drilling

Components can access shared data without passing props through every intermediate component.

### 2. Centralized Shared State

Instead of keeping common data and functions in the `App` component and passing them through props, we can keep them in a centralized location.

This gives us a **store-like concept** for shared state.

```text
              Store / Context
          ┌───────────────────┐
          │ Shared Data       │
          │ Shared Functions  │
          └─────────┬─────────┘
                    │
             ┌──────┼──────┐
             ↓      ↓      ↓
           Home    User   Header
```

### 3. Share Data and Functions

Context can provide both data and functions.

Examples:

* Logged-in user information
* Theme
* Language
* Application settings
* Shopping cart
* Shared functions

---

# Key Components of Context API

There are three important concepts:

| Concept           | Purpose                                         |
| ----------------- | ----------------------------------------------- |
| `createContext()` | Creates the Context object                      |
| Provider          | Provides a value to its child components        |
| `useContext()`    | Allows a component to consume the Context value |

A simple way to remember:

```text
CREATE → PROVIDE → CONSUME

createContext()
       ↓
   Provider
       ↓
  useContext()
```

### Simple Analogy

Think of Context like a warehouse:

* **Context** → The shared warehouse
* **Provider** → Makes the warehouse contents available
* **`useContext`** → Allows a component to retrieve what it needs

---

# Implementing Context API

For our example, we will share a person's first name and last name with both `Home` and `User` components.

## Project Structure

Create a `store` folder:

```text
src
├── App.jsx
├── Home.jsx
├── User.jsx
└── store
    └── indexContext.jsx
```

---

# Step 1: Create the Context

In `store/indexContext.jsx`:

```jsx
import { createContext } from "react";

const NameContext = createContext();

export default NameContext;
```

`createContext()` creates the **Context object**.

The name can be anything meaningful:

```jsx
const UserContext = createContext();
const ThemeContext = createContext();
const CartContext = createContext();
```

We export the Context because other components will need to import it.

> `createContext()` returns a Context object. It does not directly return a React component.

---

# Step 2: Create the Provider

The Provider makes the shared value available to components inside it.

```jsx
export const NameProvider = ({ children }) => {

    const fullName = {
        firstName: "John",
        lastName: "Doe"
    };

    return (
        <NameContext.Provider value={fullName}>
            {children}
        </NameContext.Provider>
    );
};
```

The Provider uses:

```jsx
<NameContext.Provider>
```

and passes the shared data through the `value` prop:

```jsx
value={fullName}
```

---

## Why Use an Object for the Value?

The Context `value` can be any JavaScript value.

For example:

```jsx
value="John"
value={25}
value={true}
value={someFunction}
```

However, using an object is common because we often need to share multiple values and functions:

```jsx
const contextValue = {
    firstName,
    lastName,
    calculateAge,
    updateName
};
```

Then:

```jsx
<NameContext.Provider value={contextValue}>
```

Creating the object separately also makes the code easier to read than:

```jsx
<NameContext.Provider
    value={{
        firstName: "John",
        lastName: "Doe"
    }}
>
```

---

# Step 3: Understand `children`

When we wrap components like this:

```jsx
<NameProvider>
    <Home />
    <User />
</NameProvider>
```

the components inside `NameProvider` are received by the Provider component through the `children` prop.

Therefore:

```jsx
export const NameProvider = ({ children }) => {
```

destructures the `children` prop.

We then render those children inside the Context Provider:

```jsx
<NameContext.Provider value={fullName}>
    {children}
</NameContext.Provider>
```

So:

```text
NameProvider
     │
     │ children
     │
     ├── Home
     └── User
```

Whatever we wrap inside `NameProvider` becomes its `children`.

---

# Step 4: Wrap the Components with the Provider

In `App.jsx`, import the Provider:

```jsx
import { NameProvider } from "./store/indexContext";
```

Then wrap the components that need access to the Context:

```jsx
const App = () => {
    return (
        <NameProvider>
            <Home />
            <User />
        </NameProvider>
    );
};
```

Now both `Home` and `User` are inside the Provider.

```text
             NameProvider
                  │
           ┌──────┴──────┐
           ↓             ↓
         Home           User
```

Therefore, both components can access the Context value.

---

# Step 5: Consume the Context with `useContext`

Now `Home` can access the shared value.

First import:

```jsx
import { useContext } from "react";
```

Then import the Context:

```jsx
import NameContext from "./store/indexContext";
```

Inside the component:

```jsx
const { firstName, lastName } = useContext(NameContext);
```

`useContext()` receives the Context object:

```jsx
useContext(NameContext)
```

React looks for the nearest matching Provider and returns the value provided by it.

In our example, it returns:

```jsx
{
    firstName: "John",
    lastName: "Doe"
}
```

Because the value is an object, we can destructure it:

```jsx
const { firstName, lastName } = useContext(NameContext);
```

We can then use:

```jsx
{firstName}
{lastName}
```

inside the component.

---

# Step 6: Multiple Components Can Consume the Same Context

`User.jsx` can consume the same Context in exactly the same way:

```jsx
const { firstName, lastName } = useContext(NameContext);
```

Both components are accessing the same shared Context value.

```text
                  NameContext
                       │
                       ↓
                 NameProvider
                       │
                 value={fullName}
                       │
              ┌────────┴────────┐
              ↓                 ↓
            Home              User
              │                 │
              ↓                 ↓
        useContext()       useContext()
              │                 │
              └────────┬────────┘
                       ↓
                Shared Value
```

Notice that we do **not** need to pass the data manually:

```jsx
<Home firstName={firstName} />
```

or:

```jsx
<User firstName={firstName} />
```

The components access the shared value through Context.

---

# Complete Context API Flow

```text
1. createContext()
       ↓
   Create Context object
       ↓
2. Create Provider
       ↓
3. Pass shared value
       ↓
4. Wrap components with Provider
       ↓
5. Component uses useContext()
       ↓
6. Component receives shared value
```

### In our example:

```text
createContext()
      ↓
NameContext
      ↓
NameContext.Provider
      ↓
value={fullName}
      ↓
NameProvider
      ↓
Home / User
      ↓
useContext(NameContext)
      ↓
firstName / lastName
```

---

# Context API vs Prop Drilling

### Prop Drilling

```text
App
 ↓ props
Main
 ↓ props
Users
 ↓ props
UserDetails
```

The data has to travel through components that may not need it.

### Context API

```text
             Context
                │
             Provider
                │
        ┌───────┼───────┐
        ↓       ↓       ↓
      Home     User   Header
        │       │
        ↓       ↓
   useContext useContext
```

Components can consume the shared data directly.

---

# Important Note

Context API does not mean that every piece of state should become global state.

A useful way to think about state management is:

```text
State used by one component
        ↓
    useState

State shared between nearby components
        ↓
Props / Lifting State Up

State shared across many components
        ↓
Context API

More complex global state requirements
        ↓
useReducer / Redux
```

We will later compare these approaches and learn how to choose the appropriate state-management solution.

## Example: Counter with Context API

The Counter example demonstrates how Context API can be used to share both state and functions between multiple components.

- `CounterContext.jsx` — stores the counter state and functions.
- `CounterDisplay.jsx` — consumes the `count` value.
- `CounterButtons.jsx` — consumes the increment and decrement functions.

This allows multiple components to access the shared counter without passing the values through props or using prop drilling.


## Example: Sharing API Data with Context API

Context API can also be used to share data retrieved from an API across multiple components.

For example, suppose we make one API call to retrieve products and have multiple components that need access to those products.

Instead of making the API call separately in every component, we can:

1. Create a Context.
2. Create a Provider.
3. Make the API call inside the Provider.
4. Store the API response in state.
5. Pass the data through the Context Provider.
6. Allow any descendant component to consume the data using `useContext()`.

### Example Flow

```text
ProductProvider
      │
      │── API call
      │
      │── products state
      │
      ├── ProductDisplay
      │      └── uses products
      │
      └── ProductDetails
             └── uses products
```
### Why is this useful?

The API data is fetched and stored in one central place, while multiple components can consume the same data without passing it through props.

For example:

ProductDisplay can display product titles.
ProductDetails can display product descriptions and prices.
Another component could use the same product data.
An AddProduct function could also be shared through the same Context.

This avoids unnecessary prop drilling and keeps shared data and functions in the Context Provider.

AddProduct.jsx
→ "User clicked Add Product"

ProductContext.jsx
→ "I'll add this product and update the shared products state"

utils.js
→ "I'll make the POST API request"


```
                    ProductProvider
                          │
             ┌────────────┼────────────┐
             │            │            │
             ▼            ▼            ▼
        AddProduct   ProductDisplay  ProductDetails
             │            │            │
             │            │            │
       addProduct()      products      products
             │
             ▼
       ProductContext
             │
             ▼
          utils.js
             │
             ▼
        POST API call

```
