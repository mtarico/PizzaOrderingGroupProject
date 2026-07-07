import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext";
import { fetchPromos } from "../../api/menuApi";
import "./Deals.css";

export default function Deals() {
  const { applyDiscount, promoDiscount } = useCart();
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPromos()
      .then(setPromos)
      .catch((err) => setError(err.message || "Unable to load deals"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="deals-status">Loading deals...</div>;
  if (error) return <div className="deals-status error">{error}</div>;

  return (
    <div className="deals-page">
      <h1 className="deals-heading">Current Deals & Promotions</h1>

      <div className="deals-list">
        {promos.map((promo) => {
          const isActive = promoDiscount?.id === promo.id;

          return (
            <div
              key={promo.id}
              className={`deal-card ${isActive ? "deal-card-active" : ""}`}
            >
              <span className="deal-badge">{promo.badge}</span>
              <h3 className="deal-title">{promo.label}</h3>
              <p className="deal-desc">{promo.description}</p>

              <button
                className={`deal-redeem-btn ${isActive ? "deal-redeemed" : ""}`}
                onClick={() =>
                  applyDiscount(
                    isActive
                      ? null
                      : {
                          id: promo.id,
                          label: promo.label,
                          discountType: promo.discountType,
                          discountValue: promo.discountValue
                        }
                  )
                }
              >
                {isActive ? "✓ Applied" : "Redeem Deal"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

