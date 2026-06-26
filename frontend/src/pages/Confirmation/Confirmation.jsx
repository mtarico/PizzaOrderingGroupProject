import { useLocation, useNavigate } from "react-router-dom";
import "./Confirmation.css";

export default function Confirmation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;

  if (!order) {
    navigate("/");
    return null;
  }

  return (
    <div className="confirmation-page">
      <div className="confirmation-card">
        <div className="confirmation-icon">✅</div>
        <h1 className="confirmation-title">Order Confirmed!</h1>
        <p className="confirmation-sub">Thank you, {order.name}.</p>
        <div className="order-number">Order #{order.id}</div>
        <p className="conf-address">📍 {order.address}</p>

        <div className="confirmation-items">
          {order.items.map((item) => (
            <div key={item.id} className="conf-item">
              <span>
                {item.name} × {item.qty}
                {item.options && <span className="conf-options"> ({item.options})</span>}
              </span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </div>
          ))}
          <div className="conf-item conf-tax">
            <span>Tax (8%)</span>
            <span>${order.tax.toFixed(2)}</span>
          </div>
          {order.discount > 0 && (
            <div className="conf-item conf-discount">
              <span>Discount</span>
              <span>−${order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="conf-item conf-total">
            <span>Total Charged</span>
            <span>${order.total.toFixed(2)}</span>
          </div>
        </div>

        <p className="confirmation-eta">
          🕐 Estimated time: <strong>25–35 minutes</strong>
        </p>

        <div className="confirmation-actions">
          <button className="btn-home" onClick={() => navigate("/")}>
            Back to Home
          </button>
          <button className="btn-orders" onClick={() => navigate("/orders")}>
            View Order History
          </button>
        </div>
      </div>
    </div>
  );
}
