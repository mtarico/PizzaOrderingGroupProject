import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { categories } from "../../data/menuData";
import { fetchMenuItems } from "../../api/menuApi";
import "./Menu.css";

export default function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "pizza"
  );
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadMenu() {
      try {
        setLoading(true);
        const items = await fetchMenuItems(activeCategory);
        setMenuItems(items);
        setError("");
      } catch (err) {
        setError(err.message || "Unable to load menu");
      } finally {
        setLoading(false);
      }
    }

    loadMenu();
  }, [activeCategory]);

  const filtered = useMemo(() => menuItems, [menuItems]);

  function handleCategory(id) {
    setActiveCategory(id);
    setSearchParams({ category: id });
  }

  function handleItemClick(item, shouldCustomize) {
    if (shouldCustomize) {
      navigate(`/menu/${item.id}`);
      return;
    }

    addItem({ ...item, cartKey: String(item.id), options: null });
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

      {loading && <p className="menu-status">Loading menu...</p>}
      {error && <p className="menu-status error">{error}</p>}

      <div className="menu-list">
        {!loading && !error && filtered.map((item) => {
          const shouldCustomize =
            item.category === "pizza" ||
            (item.category === "drinks" && item.name.toLowerCase().includes("soda")) ||
            (item.category === "sides" && item.name.toLowerCase().includes("wings"));

          return (
            <div key={item.id} className="menu-list-item">
              <div className="menu-item-thumb">
                {item.image ? (
                  <img src={item.image} alt={item.name} loading="lazy" />
                ) : (
                  categories.find((c) => c.id === item.category)?.emoji
                )}
              </div>
              <div className="menu-item-details">
                <span className="menu-item-name">{item.name}</span>
                <span className="menu-item-desc">{item.description}</span>
              </div>
              <span className="menu-item-price">${Number(item.price).toFixed(2)}</span>
              <button
                className={`menu-item-action ${shouldCustomize ? "btn-customize" : "btn-add"}`}
                onClick={() => handleItemClick(item, shouldCustomize)}
              >
                {shouldCustomize ? "Customize →" : "+ Add"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
