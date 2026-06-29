import { createContext, useContext, useReducer, useState } from "react";

const CartContext = createContext(null);

// Reducer for cart item operations
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
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
        .map((i) =>
          i.cartKey === action.cartKey ? { ...i, qty: i.qty - 1 } : i
        )
        .filter((i) => i.qty > 0);

    case "CLEAR_CART":
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Manual discount input (from Cart.jsx)
  const [manualDiscount, setManualDiscount] = useState(0);

  // Redeemed promo discount
  const [promoDiscount, setPromoDiscount] = useState(null);

  // Add item to cart
  const addItem = (item) => dispatch({ type: "ADD_ITEM", item });

  const increment = (cartKey) => dispatch({ type: "INCREMENT", cartKey });
  const decrement = (cartKey) => dispatch({ type: "DECREMENT", cartKey });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  // Totals
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  const TAX_RATE = 0.08;
  const tax = subtotal * TAX_RATE;

  // Delivery fee (optional)
  const deliveryFee = subtotal > 25 ? 0 : 4.99;

  // Apply promo discount
  function applyDiscount(promo) {
    setPromoDiscount(promo);
  }

  // Calculate promo discount amount
  let promoAmount = 0;

  if (promoDiscount) {
    if (promoDiscount.id === 1) {
      // Tuesday Special: Buy 2 pizzas, get 1 free
      const pizzas = cart.filter((i) => i.category === "pizza");
      if (pizzas.length >= 3) {
        const cheapestPizza = Math.min(...pizzas.map((p) => p.price));
        promoAmount = cheapestPizza;
      }
    }

    if (promoDiscount.id === 2) {
      // Family Bundle: Save $10
      promoAmount = 10;
    }

    if (promoDiscount.id === 3) {
      // Free Delivery
      promoAmount = deliveryFee;
    }
  }

  // Final total
  const total =
    subtotal + tax + deliveryFee - promoAmount - manualDiscount;

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        increment,
        decrement,
        clearCart,
        totalItems,
        subtotal,
        tax,
        deliveryFee,
        total,

        // Manual discount input
        manualDiscount,
        setManualDiscount,

        // Promo discount
        promoDiscount,
        applyDiscount,
        promoAmount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
