import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { categories, promos } from "../../data/menuData";
import "./Home.css";

export default function Home() {
  const [orderType, setOrderType] = useState("delivery");
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">START YOUR ORDER</h1>
          <div className="order-type-toggle">
            <button
              className={`toggle-btn ${orderType === "delivery" ? "active" : ""}`}
              onClick={() => setOrderType("delivery")}
            >
              Delivery
            </button>
            <span className="toggle-or">OR</span>
            <button
              className={`toggle-btn ${orderType === "carryout" ? "active" : ""}`}
              onClick={() => setOrderType("carryout")}
            >
              Carryout
            </button>
          </div>
        </div>
      </section>

      {/* Promotions Banner */}
      <section className="promos-section" id="deals">
        <div className="promos-scroll">
          {promos.map((promo) => (
            <div key={promo.id} className="promo-card">
              <span className="promo-badge">{promo.badge}</span>
              <h3 className="promo-label">{promo.label}</h3>
              <p className="promo-desc">{promo.description}</p>
              <button className="promo-cta" onClick={() => navigate("/menu")}>
                Order Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Browse Menu */}
      <section className="browse-section">
        <h2 className="section-title">Browse Menu</h2>
        <div className="category-grid">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>
    </div>
  );
}
