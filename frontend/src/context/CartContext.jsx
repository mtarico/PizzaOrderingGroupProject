import { createContext, useContext, useReducer, useState } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.find((i) => i.cartKey === action.item.cartKey);
      if (existing) {
        return state.map((i) =>
          i.cartKey === action.item.cartKey
            ? { ...i, qty: Number(i.qty) + 1 }
            : i
        );
      }
      return [...state, { ...action.item, qty: 1 }];
    }

    case "INCREMENT":
      return state.map((i) =>
        i.cartKey === action.cartKey
          ? { ...i, qty: Number(i.qty) + 1 }
          : i
      );

    case "DECREMENT":
      return state
        .map((i) =>
          i.cartKey === action.cartKey
            ? { ...i, qty: Number(i.qty) - 1 }
            : i
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

  // Manual discount (always a number)
  const [manualDiscount, setManualDiscount] = useState(0);

  // Promo discount
  const [promoDiscount, setPromoDiscount] = useState(null);

  const addItem = (item) =>
    dispatch({
      type: "ADD_ITEM",
      item: {
        ...item,
        price: Number(item.price),
        qty: Number(item.qty || 1),
      },
    });

  const increment = (cartKey) => dispatch({ type: "INCREMENT", cartKey });
  const decrement = (cartKey) => dispatch({ type: "DECREMENT", cartKey });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = cart.reduce((sum, i) => sum + Number(i.qty), 0);

  const subtotal = cart.reduce(
    (sum, i) => sum + Number(i.price) * Number(i.qty),
    0
  );

  const TAX_RATE = 0.08;
  const tax = subtotal * TAX_RATE;

  const deliveryFee = subtotal > 25 ? 0 : 4.99;

  function applyDiscount(promo) {
    setPromoDiscount(promo);
  }

  let promoAmount = 0;

  if (promoDiscount) {
    if (promoDiscount.id === 1) {
      const pizzas = cart.filter((i) => i.category === "pizza");
      if (pizzas.length >= 3) {
        const cheapestPizza = Math.min(
          ...pizzas.map((p) => Number(p.price))
        );
        promoAmount = cheapestPizza;
      }
    }

    if (promoDiscount.id === 2) {
      promoAmount = 10;
    }

    if (promoDiscount.id === 3) {
      promoAmount = deliveryFee;
    }
  }

  const total =
    subtotal + tax + deliveryFee - promoAmount - Number(manualDiscount);

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
        manualDiscount,
        setManualDiscount,
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
