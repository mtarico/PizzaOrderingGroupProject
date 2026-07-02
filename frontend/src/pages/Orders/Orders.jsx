import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchOrders } from "../../api/menuApi";
import "./Orders.css";

function formatDate(iso) {
  return new Date(iso).toLocaleString(undefined, {
    month: "short", day: "numeric", year: "numeric",
    hour: "numeric", minute: "2-digit",
  });
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();
  const { state } = useLocation();
  const newOrderId = state?.newOrderId ?? null;

  useEffect(() => {
    fetchOrders()
      .then((data) => {
        setOrders(data);
        if (newOrderId) setExpanded(newOrderId);
      })
      .catch((err) => setError(err.message || "Unable to load orders"))
      .finally(() => setLoading(false));
  }, [newOrderId]);

  if (loading) return <div className="orders-status">Loading orders...</div>;
  if (error) return <div className="orders-status error">{error}</div>;

  return (
    <div className="orders-page">
      <button className="back-btn" onClick={() => navigate("/")}>← Back</button>
      <h1 className="orders-heading">Order History</h1>

      {newOrderId && (
        <div className="orders-success-banner">
          ✅ Order #{newOrderId} placed successfully! Estimated delivery: 25–35 minutes.
        </div>
      )}

      {orders.length === 0 ? (
        <div className="orders-empty">
          <p>No orders yet.</p>
          <button className="btn-start" onClick={() => navigate("/menu")}>Start an Order</button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div
              key={order.id}
              className={`order-card ${order.id === newOrderId ? "order-card-new" : ""}`}
            >
              <button
                className="order-card-header"
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
              >
                <div className="order-card-left">
                  <span className="order-id">Order #{order.id}</span>
                  <span className="order-name">{order.name}</span>
                  <span className="order-date">{formatDate(order.createdAt)}</span>
                </div>
                <div className="order-card-right">
                  <span className="order-total">${order.total.toFixed(2)}</span>
                  <span className="order-chevron">{expanded === order.id ? "▲" : "▼"}</span>
                </div>
              </button>

              {expanded === order.id && (
                <div className="order-details">
                  <p className="order-address">📍 {order.address}</p>
                  <div className="order-items">
                    {order.items.map((item) => (
                      <div key={item.id} className="order-item-row">
                        <span>
                          {item.name} × {item.qty}
                          {item.options && <span className="order-item-options"> ({item.options})</span>}
                        </span>
                        <span>${(item.price * item.qty).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="order-summary-rows">
                    <div className="order-summary-row"><span>Subtotal</span><span>${order.subtotal.toFixed(2)}</span></div>
                    <div className="order-summary-row"><span>Tax</span><span>${order.tax.toFixed(2)}</span></div>
                    {order.discount > 0 && (
                      <div className="order-summary-row discount"><span>Discount</span><span>−${order.discount.toFixed(2)}</span></div>
                    )}
                    <div className="order-summary-row total"><span>Total</span><span>${order.total.toFixed(2)}</span></div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
