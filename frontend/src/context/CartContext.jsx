import { createContext, useContext, useReducer, useState, useEffect } from "react";

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
    if (promoDiscount.discountType === "buy2get1") {
      const pizzas = cart.filter((i) => i.category === "pizza");
      if (pizzas.length >= 3) {
        promoAmount = Math.min(...pizzas.map((p) => Number(p.price)));
      }
    } else if (promoDiscount.discountType === "flat") {
      promoAmount = Number(promoDiscount.discountValue) || 0;
    } else if (promoDiscount.discountType === "freeDelivery") {
      promoAmount = deliveryFee;
    }
  }

  // AUTO-APPLY DEALS — NO STACKING
  useEffect(() => {
    if (cart.length === 0) {
      setPromoDiscount(null);
      return;
    }

    const pizzas = cart.filter((i) => i.category === "pizza");

    // Priority 1: Buy 2 Get 1 Free
    if (pizzas.length >= 3) {
      setPromoDiscount({
        id: "auto-buy2get1",
        label: "Buy 2 Get 1 Free",
        discountType: "buy2get1",
        discountValue: null
      });
      return;
    }

    // Priority 2: Free Delivery
    if (subtotal < 25) {
      setPromoDiscount({
        id: "auto-freeDelivery",
        label: "Free Delivery",
        discountType: "freeDelivery",
        discountValue: null
      });
      return;
    }

    // Priority 3: Flat $10 off
    if (subtotal >= 50) {
      setPromoDiscount({
        id: "auto-flat10",
        label: "$10 Off Orders Over $50",
        discountType: "flat",
        discountValue: 10
      });
      return;
    }

    // No deal applies
    setPromoDiscount(null);
  }, [cart, subtotal]);

  const total = subtotal + tax + deliveryFee - promoAmount;

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
