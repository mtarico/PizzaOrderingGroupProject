import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { categories, menuItems } from "../../data/menuData";
import "./Menu.css";

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "pizza"
  );
  const { addItem, cart } = useCart();

  const filtered = menuItems.filter((item) => item.category === activeCategory);

  function getQty(id) {
    return cart.find((i) => i.id === id)?.qty || 0;
  }

  function handleCategory(id) {
    setActiveCategory(id);
    setSearchParams({ category: id });
  }

  return (
    <div className="menu-page">
      <h1 className="menu-heading">Our Menu</h1>

      <div className="category-tabs">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`tab ${activeCategory === cat.id ? "active" : ""}`}
            onClick={() => handleCategory(cat.id)}
          >
            {cat.emoji} {cat.label}
          </button>
        ))}
      </div>

      <div className="menu-grid">
        {filtered.map((item) => (
          <div key={item.id} className="menu-item-card">
            <div className="menu-item-img">{categories.find(c => c.id === item.category)?.emoji}</div>
            <div className="menu-item-info">
              <h3 className="menu-item-name">{item.name}</h3>
              <p className="menu-item-desc">{item.description}</p>
              <div className="menu-item-footer">
                <span className="menu-item-price">${item.price.toFixed(2)}</span>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => addItem(item)}>+</button>
                  {getQty(item.id) > 0 && (
                    <span className="qty-display">{getQty(item.id)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
