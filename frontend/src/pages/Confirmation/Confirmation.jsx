import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Confirmation.css";

export default function Confirmation() {
  const { cart, subtotal, clearCart, discount } = useCart();
  const navigate = useNavigate();
  const orderNumber = Math.floor(Math.random() * 90000) + 10000;
  const tax = subtotal * 0.08;
  const discountAmount = Math.min(discount, subtotal);
  const total = subtotal + tax - discountAmount;

  function handleDone() {
    clearCart();
    navigate("/");
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">✅</div>
        <h1 className="confirmation-title">Order Confirmed!</h1>
        <p className="confirmation-sub">Thank you for your order.</p>
        <div className="order-number">Order #{orderNumber}</div>

        <div className="confirmation-items">
          {cart.map((item) => (
            <div key={item.cartKey} className="conf-item">
              <span>
                {item.name} × {item.qty}
                {item.options && <span className="conf-options"> ({item.options})</span>}
              </span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="conf-item conf-tax">
            <span>Tax (8%)</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          {discountAmount > 0 && (
            <div className="conf-item conf-discount">
              <span>Discount</span>
              <span>−${discountAmount.toFixed(2)}</span>
            </div>
          )}
          <div className="conf-item conf-total">
            <span>Total Charged</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <p className="confirmation-eta">
          🕐 Estimated time: <strong>25–35 minutes</strong>
        </p>

        <button className="btn-home" onClick={handleDone}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
