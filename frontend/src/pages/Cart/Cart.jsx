import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { categories } from "../../data/menuData";
import "./Cart.css";

const TAX_RATE = 0.08;

export default function Cart() {
  const { cart, increment, decrement, subtotal, totalItems, discount, setDiscount } = useCart();
  const navigate = useNavigate();

  const tax = subtotal * TAX_RATE;
  const discountAmount = Math.min(discount, subtotal);
  const total = subtotal + tax - discountAmount;

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
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row discount-row">
            <span>Discount</span>
            <div className="discount-input-wrap">
              <span>−$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={discount || ""}
                placeholder="0.00"
                onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                className="discount-input"
              />
            </div>
          </div>
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
