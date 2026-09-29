import { createContext, useReducer } from "react";

export const ShoppingCartContext = createContext();

const initialState = {
cartItems: [],
};

function reducer(state, action) {
switch (action.type) {
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
      ),
    };
  }

  return {
    ...state,
    cartItems: [
      ...state.cartItems,
      {
        ...action.payload,
        quantity: 1,
      },
    ],
  };
}

case "increaseQuantity":
  return {
    ...state,
    cartItems: state.cartItems.map((item) =>
      item.id === action.payload
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ),
  };

case "decreaseQuantity":
  return {
    ...state,
    cartItems: state.cartItems
      .map((item) =>
        item.id === action.payload
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0),
  };

case "removeFromCart":
  return {
    ...state,
    cartItems: state.cartItems.filter(
      (item) => item.id !== action.payload
    ),
  };

case "clearCart":
  return {
    ...state,
    cartItems: [],
  };

default:
  return state;


}
}

export function ShoppingCartProvider({ children }) {
const [state, dispatch] = useReducer(reducer, initialState);

return (
<ShoppingCartContext.Provider value={{ state, dispatch }}>
{children}
</ShoppingCartContext.Provider>
);
}
