import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { createOrder } from "../../api/menuApi";
import "./Checkout.css";

const TAX_RATE = 0.08;

function formatCardNumber(value) {
  return value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ");
}

function formatExpiry(value) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  return digits.length >= 3 ? digits.slice(0, 2) + "/" + digits.slice(2) : digits;
}

export default function Checkout() {
  const { cart, subtotal, discount, clearCart } = useCart();
  const navigate = useNavigate();

  const tax = subtotal * TAX_RATE;
  const discountAmount = Math.min(discount, subtotal);
  const total = subtotal + tax - discountAmount;

  const [form, setForm] = useState({ name: "", address: "", cardNumber: "", expiry: "", cvv: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (cart.length === 0 && !submitting) return <Navigate to="/cart" replace />;

  function setField(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.address.trim()) e.address = "Delivery address is required";
    if (form.cardNumber.replace(/\s/g, "").length !== 16) e.cardNumber = "Enter a valid 16-digit card number";
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = "Enter expiry as MM/YY";
    if (!/^\d{3,4}$/.test(form.cvv)) e.cvv = "3 or 4 digits";
    return e;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      const order = await createOrder({
        name: form.name.trim(),
        address: form.address.trim(),
        subtotal,
        tax,
        discount: discountAmount,
        total,
        items: cart.map((item) => ({
          name: item.name,
          options: item.options || null,
          price: item.price,
          qty: item.qty,
        })),
      });
      navigate("/orders", { state: { newOrderId: order.id } });
      clearCart();
    } catch (err) {
      setErrors({ submit: err.message || "Failed to place order. Please try again." });
      setSubmitting(false);
    }
  }

  return (
    <div className="checkout-page">
      <button className="back-btn" onClick={() => navigate("/cart")}>← Back</button>
      <h1 className="checkout-heading">Checkout</h1>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit} noValidate>
          <fieldset className="checkout-fieldset">
            <legend>Delivery Info</legend>
            <label className="checkout-label">
              Full Name
              <input
                value={form.name}
                onChange={(e) => setField("name", e.target.value)}
                placeholder="Jane Smith"
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </label>
            <label className="checkout-label">
              Delivery Address
              <input
                value={form.address}
                onChange={(e) => setField("address", e.target.value)}
                placeholder="123 Main St, City, State 12345"
                className={errors.address ? "input-error" : ""}
              />
              {errors.address && <span className="field-error">{errors.address}</span>}
            </label>
          </fieldset>

          <fieldset className="checkout-fieldset">
            <legend>Payment</legend>
            <p className="payment-notice">🔒 Demo only — no real charge will be made.</p>
            <label className="checkout-label">
              Card Number
              <input
                value={form.cardNumber}
                onChange={(e) => setField("cardNumber", formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                inputMode="numeric"
                className={errors.cardNumber ? "input-error" : ""}
              />
              {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
            </label>
            <div className="checkout-row">
              <label className="checkout-label">
                Expiry
                <input
                  value={form.expiry}
                  onChange={(e) => setField("expiry", formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  inputMode="numeric"
                  className={errors.expiry ? "input-error" : ""}
                />
                {errors.expiry && <span className="field-error">{errors.expiry}</span>}
              </label>
              <label className="checkout-label">
                CVV
                <input
                  value={form.cvv}
                  onChange={(e) => setField("cvv", e.target.value.replace(/\D/g, "").slice(0, 4))}
                  placeholder="123"
                  inputMode="numeric"
                  className={errors.cvv ? "input-error" : ""}
                />
                {errors.cvv && <span className="field-error">{errors.cvv}</span>}
              </label>
            </div>
          </fieldset>

          {errors.submit && <p className="submit-error">{errors.submit}</p>}

          <button className="btn-place-order" type="submit" disabled={submitting}>
            {submitting ? "Placing Order..." : `Place Order · $${total.toFixed(2)}`}
          </button>
        </form>

        <div className="checkout-summary">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-items">
            {cart.map((item) => (
              <div key={item.cartKey} className="summary-item">
                <span>
                  {item.name} × {item.qty}
                  {item.options && <span className="summary-options"> ({item.options})</span>}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="summary-divider" />
          <div className="summary-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
          {discountAmount > 0 && (
            <div className="summary-row"><span>Discount</span><span>−${discountAmount.toFixed(2)}</span></div>
          )}
          <div className="summary-row summary-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
}
