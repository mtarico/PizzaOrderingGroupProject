import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { categories } from "../../data/menuData";
import "./Cart.css";

export default function Cart() {
  const {
    cart,
    increment,
    decrement,
    subtotal,
    totalItems,
    tax,
    deliveryFee,
    promoAmount,
    total,
    promoDiscount,
    pizzaCount,
    sideCount,
    drinkCount,
  } = useCart();

  const navigate = useNavigate();

  if (totalItems === 0) {
    return (
      <div className="cart-empty">
        <p className="cart-empty-icon">🛒</p>
        <h2>Your cart is empty</h2>
        <button className="btn-primary" onClick={() => navigate("/menu")}>
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <h1 className="cart-heading">Shopping Cart</h1>

      <div className="cart-layout">
        {/* Item list */}
        <div className="cart-items">
          {cart.map((item) => {
            const emoji = categories.find((c) => c.id === item.category)?.emoji ?? "🍕";
            return (
              <div key={item.cartKey} className="cart-item">
                <div className="cart-thumb">{emoji}</div>
                <div className="cart-item-meta">
                  <span className="cart-item-name">{item.name}</span>
                  {item.options && (
                    <span className="cart-item-options">{item.options}</span>
                  )}
                </div>
                <div className="cart-item-qty">
                  <button className="qty-btn" onClick={() => decrement(item.cartKey)}>−</button>
                  <span className="qty-num">{item.qty}</span>
                  <button className="qty-btn" onClick={() => increment(item.cartKey)}>+</button>
                </div>
                <div className="cart-item-line">
                  <span className="cart-item-label">Total:</span>
                  <span className="cart-item-total">${(item.price * item.qty).toFixed(2)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="cart-summary">
          {promoDiscount?.discountType === "buy2get1" && pizzaCount < 3 && (
            <div className="deal-progress-banner">
              🍕 <strong>{promoDiscount.label}</strong> applied —
              add <strong>{3 - pizzaCount} more pizza{3 - pizzaCount !== 1 ? "s" : ""}</strong> to get the cheapest one free!
            </div>
          )}
          {promoDiscount?.discountType === "freeDelivery" && subtotal < 25 && (
            <div className="deal-progress-banner">
              🚗 <strong>{promoDiscount.label}</strong> applied —
              add <strong>${(25 - subtotal).toFixed(2)} more</strong> to your order to unlock free delivery!
            </div>
          )}
          {promoDiscount?.discountType === "bundle" && (pizzaCount < 2 || sideCount < 1 || drinkCount < 1) && (
            <div className="deal-progress-banner">
              🛍️ <strong>{promoDiscount.label}</strong> applied — still need:
              {pizzaCount < 2 && <> <strong>{2 - pizzaCount} more pizza{2 - pizzaCount !== 1 ? "s" : ""}</strong></>}
              {sideCount < 1 && <> <strong>1 side</strong></>}
              {drinkCount < 1 && <> <strong>1 drink</strong></>}
            </div>
          )}
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>

          {promoAmount > 0 && (
            <div className="summary-row discount-row">
              <span>{promoDiscount?.label ?? "Deal Applied"}</span>
              <span>−${promoAmount.toFixed(2)}</span>
            </div>
          )}

          <div className="summary-row total-row">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            className="btn-primary"
            onClick={() => navigate("/checkout")}
          >
            Checkout →
          </button>

          <button className="btn-secondary" onClick={() => navigate("/menu")}>
            Add More Items
          </button>
        </div>
      </div>
    </div>
  );
}
