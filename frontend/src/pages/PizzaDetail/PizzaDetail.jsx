import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { fetchMenuItemById } from "../../api/menuApi";
import "./PizzaDetail.css";

const SIZE_UPCHARGE = { small: 0, medium: 2, large: 4 };
const SIZES = [
  { value: "small", label: 'Small (10")' },
  { value: "medium", label: 'Medium (12")' },
  { value: "large", label: 'Large (14")' },
];
const SAUCES = ["Marinara", "Alfredo"];
const CRUSTS = ["Thin", "Hand Tossed"];

export default function PizzaDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("medium");
  const [sauce, setSauce] = useState("Marinara");
  const [crust, setCrust] = useState("Thin");

  useEffect(() => {
    async function loadItem() {
      try {
        setLoading(true);
        const fetchedItem = await fetchMenuItemById(id);
        setItem(fetchedItem);
      } finally {
        setLoading(false);
      }
    }

    loadItem();
  }, [id]);

  if (loading) {
    return <div className="detail-not-found"><p>Loading item...</p></div>;
  }

  if (!item) {
    return (
      <div className="detail-not-found">
        <p>Item not found.</p>
        <button onClick={() => navigate("/menu")}>Back to Menu</button>
      </div>
    );
  }

  const unitPrice = item.price + SIZE_UPCHARGE[size];
  const lineTotal = unitPrice * qty;

  function handleAddToCart() {
    const cartKey = `${item.id}-${size}-${sauce}-${crust}`;
    const optionLabel = `${size[0].toUpperCase() + size.slice(1)}, ${sauce}, ${crust}`;
    for (let i = 0; i < qty; i++) {
      addItem({ ...item, price: unitPrice, cartKey, options: optionLabel });
    }
    navigate("/cart");
  }

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-layout">
        {/* Left: image */}
        <div className="detail-image">
          {item.image ? (
            <img src={item.image} alt={item.name} loading="lazy" />
          ) : (
            <span className="detail-image-fallback">🍕</span>
          )}
        </div>

        {/* Right: customization */}
        <div className="detail-options">
          <h2 className="detail-name">{item.name}</h2>
          <p className="detail-desc">{item.description}</p>

          <div className="option-row">
            <label className="option-label">Quantity</label>
            <div className="qty-control">
              <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>⊖</button>
              <span className="qty-value">{qty}</span>
              <button className="qty-btn" onClick={() => setQty((q) => q + 1)}>⊕</button>
            </div>
          </div>

          <div className="option-row">
            <label className="option-label">Size</label>
            <div className="radio-group">
              {SIZES.map((s) => (
                <label key={s.value} className="radio-option">
                  <input
                    type="radio"
                    name="size"
                    value={s.value}
                    checked={size === s.value}
                    onChange={() => setSize(s.value)}
                  />
                  {s.label}
                  {SIZE_UPCHARGE[s.value] > 0 && (
                    <span className="upcharge"> +${SIZE_UPCHARGE[s.value]}</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          <div className="option-row">
            <label className="option-label">Sauce</label>
            <div className="radio-group">
              {SAUCES.map((s) => (
                <label key={s} className="radio-option">
                  <input
                    type="radio"
                    name="sauce"
                    value={s}
                    checked={sauce === s}
                    onChange={() => setSauce(s)}
                  />
                  {s}
                </label>
              ))}
            </div>
          </div>

          <div className="option-row">
            <label className="option-label">Crust</label>
            <div className="radio-group">
              {CRUSTS.map((c) => (
                <label key={c} className="radio-option">
                  <input
                    type="radio"
                    name="crust"
                    value={c}
                    checked={crust === c}
                    onChange={() => setCrust(c)}
                  />
                  {c}
                </label>
              ))}
            </div>
          </div>

          <div className="detail-total">
            ${lineTotal.toFixed(2)}
            <span className="detail-total-sub">
              ${unitPrice.toFixed(2)} × {qty}
            </span>
          </div>

          <button className="btn-add-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
