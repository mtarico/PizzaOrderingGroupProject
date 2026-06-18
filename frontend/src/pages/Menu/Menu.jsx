import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { categories, menuItems } from "../../data/menuData";
import "./Menu.css";

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "pizza"
  );
  const { addItem } = useCart();
  const navigate = useNavigate();

  const filtered = menuItems.filter((item) => item.category === activeCategory);

  function handleCategory(id) {
    setActiveCategory(id);
    setSearchParams({ category: id });
  }

  function handleItemClick(item) {
    if (item.category === "pizza") {
      navigate(`/menu/${item.id}`);
    } else {
      addItem({ ...item, cartKey: String(item.id) });
    }
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

      <div className="menu-list">
        {filtered.map((item) => {
          const isPizza = item.category === "pizza";
          return (
            <div key={item.id} className="menu-list-item">
              <div className="menu-item-thumb">
                {categories.find((c) => c.id === item.category)?.emoji}
              </div>
              <div className="menu-item-details">
                <span className="menu-item-name">{item.name}</span>
                <span className="menu-item-desc">{item.description}</span>
              </div>
              <span className="menu-item-price">${item.price.toFixed(2)}</span>
              <button
                className={`menu-item-action ${isPizza ? "btn-customize" : "btn-add"}`}
                onClick={() => handleItemClick(item)}
              >
                {isPizza ? "Customize →" : "+ Add"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
