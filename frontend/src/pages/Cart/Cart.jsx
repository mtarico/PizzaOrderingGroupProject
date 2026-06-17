import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

const TAX_RATE = 0.08;

export default function Cart() {
  const { cart, addItem, removeItem, subtotal, totalItems } = useCart();
  const navigate = useNavigate();

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

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
      <h1 className="cart-heading">Your Order</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-info">
                <span className="cart-item-name">{item.name}</span>
                <span className="cart-item-unit">${item.price.toFixed(2)} each</span>
              </div>
              <div className="cart-item-controls">
                <button className="qty-btn" onClick={() => removeItem(item.id)}>−</button>
                <span className="qty-num">{item.qty}</span>
                <button className="qty-btn" onClick={() => addItem(item)}>+</button>
                <span className="cart-item-subtotal">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2 className="summary-title">Bill Summary</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-row total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button
            className="btn-primary checkout-btn"
            onClick={() => navigate("/confirmation")}
          >
            Place Order →
          </button>
          <button className="btn-secondary" onClick={() => navigate("/menu")}>
            Add More Items
          </button>
        </div>
      </div>
    </div>
  );
}
