import PromoBanner from "../../components/PromoBanner";
import SlimPromoBanner from "../../components/SlimPromoBanner";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { categories, restaurantInfo } from "../../data/menuData";
import { fetchPromos } from "../../api/menuApi";
import "./Home.css";

export default function Home() {
  const [orderType, setOrderType] = useState("delivery");
  const [promos, setPromos] = useState([]);
  const navigate = useNavigate();

  const dayName = new Date().toLocaleDateString("en-US", { weekday: "long" });

  useEffect(() => {
    fetchPromos().then(setPromos).catch(() => {});
  }, []);

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
    <SlimPromoBanner />
<PromoBanner />

      {/* Promotions Banner */}
      <section className="promos-section" id="deals">
        <div className="section-heading">
          <h2 className="section-title">Today's Deals</h2>
          <p className="section-subtitle">Enjoy fresh offers updated for {dayName}.</p>
        </div>

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

        <div className="restaurant-info-card">
          <h3 className="restaurant-info-title">{restaurantInfo.name}</h3>
          <div className="restaurant-info-grid">
            <div>
              <h4>Hours</h4>
              <p>{restaurantInfo.hours}</p>
            </div>
            <div>
              <h4>Location</h4>
              <p>{restaurantInfo.location}</p>
            </div>
            <div>
              <h4>Our Story</h4>
              <p>{restaurantInfo.history}</p>
            </div>
          </div>
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
