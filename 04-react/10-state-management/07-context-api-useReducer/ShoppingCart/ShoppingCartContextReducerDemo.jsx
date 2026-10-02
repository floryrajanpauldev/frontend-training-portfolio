import { useContext } from "react";
import { ShoppingCartContext } from "./ShoppingCartContextReducer";

const products = [
{
id: 1,
title: "Laptop",
price: 999,
},
{
id: 2,
title: "Headphones",
price: 99,
},
{
id: 3,
title: "Keyboard",
price: 49,
},
];

function ShoppingCartContextReducerDemo() {
const { state, dispatch } = useContext(ShoppingCartContext);

const cartCount = state.cartItems.reduce(
(total, item) => total + item.quantity,
0
);

const cartTotal = state.cartItems.reduce(
(total, item) => total + item.price * item.quantity,
0
);

return ( <div> <h2>Products</h2>


  <p>Cart Items: {cartCount}</p>

  {products.map((product) => (
    <div key={product.id}>
      <h3>{product.title}</h3>
      <p>${product.price}</p>

      <button
        onClick={() =>
          dispatch({
            type: "addToCart",
            payload: product,
          })
        }
      >
        Add to Cart
      </button>
    </div>
  ))}

  <hr />

  <h2>Shopping Cart</h2>

  {state.cartItems.length === 0 ? (
    <p>Your cart is empty.</p>
  ) : (
    <>
      {state.cartItems.map((item) => (
        <div key={item.id}>
          <h3>{item.title}</h3>

          <p>
            ${item.price} × {item.quantity}
          </p>

          <button
            onClick={() =>
              dispatch({
                type: "decreaseQuantity",
                payload: item.id,
              })
            }
          >
            -
          </button>

          <span> {item.quantity} </span>

          <button
            onClick={() =>
              dispatch({
                type: "increaseQuantity",
                payload: item.id,
              })
            }
          >
            +
          </button>

          <button
            onClick={() =>
              dispatch({
                type: "removeFromCart",
                payload: item.id,
              })
            }
          >
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ${cartTotal.toFixed(2)}</h3>

      <button onClick={() => dispatch({ type: "clearCart" })}>
        Clear Cart
      </button>
    </>
  )}
</div>


);
}

export default ShoppingCartContextReducerDemo;
