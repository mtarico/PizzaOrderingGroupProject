import { promos } from "../../data/menuData";
import { useCart } from "../../context/CartContext";
import "./Deals.css";

export default function Deals() {
  const { applyDiscount } = useCart();

  function redeemDeal(promo) {
    applyDiscount(promo);
  }

  return (
    <div className="deals-page">
      <h1 className="deals-heading">Current Deals & Promotions</h1>

      <div className="deals-list">
        {promos.map((promo) => (
          <div key={promo.id} className="deal-card">
            <span className="deal-badge">{promo.badge}</span>
            <h3 className="deal-title">{promo.label}</h3>
            <p className="deal-desc">{promo.description}</p>

            <button
              className="deal-redeem-btn"
              onClick={() => redeemDeal(promo)}
            >
              Redeem Deal
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
