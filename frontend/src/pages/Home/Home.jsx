import PromoBanner from "../../components/PromoBanner";
import SlimPromoBanner from "../../components/SlimPromoBanner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CategoryCard from "../../components/CategoryCard/CategoryCard";
import { categories, promos, restaurantInfo } from "../../data/menuData";
import "./Home.css";

const dailySpecials = {
  Sunday: { label: "Sunday Slice", description: "Large pizza + garlic knots for $19.99", badge: "🍕 FAMILY NIGHT" },
  Monday: { label: "Monday Melt", description: "Any 2-topping pizza for $14.99", badge: "💸 WEEKSTARTER" },
  Tuesday: { label: "Tuesday Special", description: "Buy 2 pizzas, get 1 free!", badge: "🔥 HOT DEAL" },
  Wednesday: { label: "Wednesday Crunch", description: "Half-price wings with any large pizza", badge: "🧄 WING DEAL" },
  Thursday: { label: "Thursday Throwback", description: "$5 off pasta and pizza combos", badge: "✨ COMBO DEAL" },
  Friday: { label: "Friday Feast", description: "Free garlic bread with orders over $30", badge: "🎉 WEEKEND START" },
  Saturday: { label: "Saturday Slice", description: "2-liter soda included with any family pizza", badge: "🥤 FAMILY DEAL" },
};

export default function Home() {
  const [orderType, setOrderType] = useState("delivery");
  const navigate = useNavigate();

  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const activeSpecial = dailySpecials[dayName] || dailySpecials.Tuesday;

  const featuredPromos = promos.map((promo) =>
    promo.id === 1
      ? { ...promo, label: activeSpecial.label, description: activeSpecial.description, badge: activeSpecial.badge }
      : promo
  );

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
          {featuredPromos.map((promo) => (
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
