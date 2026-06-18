import { createContext, useContext, useReducer, useState } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      // cartKey groups items with identical options together
      const existing = state.find((i) => i.cartKey === action.item.cartKey);
      if (existing) {
        return state.map((i) =>
          i.cartKey === action.item.cartKey ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...state, { ...action.item, qty: 1 }];
    }
    case "INCREMENT":
      return state.map((i) =>
        i.cartKey === action.cartKey ? { ...i, qty: i.qty + 1 } : i
      );
    case "DECREMENT":
      return state
        .map((i) => (i.cartKey === action.cartKey ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [discount, setDiscount] = useState(0);

  const addItem = (item) => dispatch({ type: "ADD_ITEM", item });
  const increment = (cartKey) => dispatch({ type: "INCREMENT", cartKey });
  const decrement = (cartKey) => dispatch({ type: "DECREMENT", cartKey });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addItem, increment, decrement, clearCart, totalItems, subtotal, discount, setDiscount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
