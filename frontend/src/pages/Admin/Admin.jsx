import { useEffect, useState } from "react";
import {
  createMenuItem, deleteMenuItem, fetchMenuItems, loginAdmin, updateMenuItem,
  fetchAllPromos, createPromo, updatePromo, deletePromo,
} from "../../api/menuApi";
import { categories } from "../../data/menuData";
import "./Admin.css";

const emptyMenuForm = { category: "pizza", name: "", description: "", price: "", image: "" };
const emptyPromoForm = { label: "", description: "", badge: "", discountType: "flat", discountValue: "" };

const DISCOUNT_TYPES = [
  { value: "flat", label: "Flat $ Off" },
  { value: "buy2get1", label: "Buy 2 Pizzas Get 1 Free" },
  { value: "freeDelivery", label: "Free Delivery" },
  { value: "bundle", label: "Bundle (Fixed Price — 2 pizzas + side + drink)" },
];

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Menu state
  const [items, setItems] = useState([]);
  const [menuForm, setMenuForm] = useState(emptyMenuForm);
  const [editingMenuId, setEditingMenuId] = useState(null);
  const [isSavingMenu, setIsSavingMenu] = useState(false);

  // Promo state
  const [promos, setPromos] = useState([]);
  const [promoForm, setPromoForm] = useState(emptyPromoForm);
  const [editingPromoId, setEditingPromoId] = useState(null);
  const [isSavingPromo, setIsSavingPromo] = useState(false);

  useEffect(() => {
    if (!token) return;
    loadItems();
    loadPromos();
  }, [token]);

  async function loadItems() {
    try {
      const data = await fetchMenuItems();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to load menu");
    }
  }

  async function loadPromos() {
    try {
      const data = await fetchAllPromos(token);
      setPromos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Unable to load promos");
    }
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const result = await loginAdmin({ username, password });
      localStorage.setItem("adminToken", result.token);
      setToken(result.token);
      setError("");
    } catch (err) {
      setError(err.message || "Invalid admin credentials");
    }
  }

  // Menu handlers
  async function handleMenuSubmit(e) {
    e.preventDefault();
    setIsSavingMenu(true);
    try {
      const payload = { ...menuForm, price: Number(menuForm.price) };
      if (editingMenuId) {
        await updateMenuItem(editingMenuId, payload, token);
      } else {
        await createMenuItem(payload, token);
      }
      setMenuForm(emptyMenuForm);
      setEditingMenuId(null);
      await loadItems();
    } catch (err) {
      setError(err.message || "Unable to save item");
    } finally {
      setIsSavingMenu(false);
    }
  }

  async function handleMenuDelete(id) {
    try {
      await deleteMenuItem(id, token);
      await loadItems();
    } catch (err) {
      setError(err.message || "Unable to delete item");
    }
  }

  function handleMenuEdit(item) {
    setEditingMenuId(item.id);
    setMenuForm({ category: item.category, name: item.name, description: item.description, price: item.price, image: item.image || "" });
  }

  // Promo handlers
  async function handlePromoSubmit(e) {
    e.preventDefault();
    setIsSavingPromo(true);
    try {
      const payload = { ...promoForm, discountValue: Number(promoForm.discountValue) || 0 };
      if (editingPromoId) {
        await updatePromo(editingPromoId, payload, token);
      } else {
        await createPromo(payload, token);
      }
      setPromoForm(emptyPromoForm);
      setEditingPromoId(null);
      await loadPromos();
    } catch (err) {
      setError(err.message || "Unable to save promo");
    } finally {
      setIsSavingPromo(false);
    }
  }

  async function handlePromoDelete(id) {
    try {
      await deletePromo(id, token);
      await loadPromos();
    } catch (err) {
      setError(err.message || "Unable to delete promo");
    }
  }

  async function handlePromoToggle(promo) {
    try {
      await updatePromo(promo.id, { ...promo, active: !promo.active }, token);
      await loadPromos();
    } catch (err) {
      setError(err.message || "Unable to update promo");
    }
  }

  function handlePromoEdit(promo) {
    setEditingPromoId(promo.id);
    setPromoForm({ label: promo.label, description: promo.description, badge: promo.badge, discountType: promo.discountType, discountValue: promo.discountValue });
  }

  function handleLogout() {
    localStorage.removeItem("adminToken");
    setToken("");
    setUsername("");
    setPassword("");
    setError("");
  }

  if (!token) {
    return (
      <div className="admin-page">
        <h1 className="admin-title">Admin Sign In</h1>
        <form className="admin-form" onSubmit={handleLogin}>
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
          <button type="submit">Sign In</button>
        </form>
        {error && <p className="admin-error">{error}</p>}
        <p className="admin-hint">Demo login: admin / admin123</p>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="admin-title">Admin Dashboard</h1>
          <p className="admin-subtitle">Manage menu items and promotions.</p>
        </div>
        <button className="admin-logout" onClick={handleLogout}>Log Out</button>
      </div>

      {error && <p className="admin-error">{error}</p>}

      {/* ── Menu Management ── */}
      <section className="admin-section">
        <h2 className="admin-section-title">Menu Items</h2>

        <form className="admin-form" onSubmit={handleMenuSubmit}>
          <select value={menuForm.category} onChange={(e) => setMenuForm({ ...menuForm, category: e.target.value })}>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.label}</option>
            ))}
          </select>
          <input value={menuForm.name} onChange={(e) => setMenuForm({ ...menuForm, name: e.target.value })} placeholder="Item name" required />
          <input value={menuForm.description} onChange={(e) => setMenuForm({ ...menuForm, description: e.target.value })} placeholder="Description" required />
          <input type="number" step="0.01" value={menuForm.price} onChange={(e) => setMenuForm({ ...menuForm, price: e.target.value })} placeholder="Price" required />
          <input value={menuForm.image} onChange={(e) => setMenuForm({ ...menuForm, image: e.target.value })} placeholder="Image URL (optional)" />
          <button type="submit" disabled={isSavingMenu}>{isSavingMenu ? "Saving..." : editingMenuId ? "Save Changes" : "Add Item"}</button>
          {editingMenuId && <button type="button" className="admin-cancel" onClick={() => { setEditingMenuId(null); setMenuForm(emptyMenuForm); }}>Cancel</button>}
        </form>

        <div className="admin-list">
          {items.map((item) => (
            <div key={item.id} className="admin-item-card">
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <span>${Number(item.price).toFixed(2)} • {item.category}</span>
              </div>
              <div className="admin-item-actions">
                <button onClick={() => handleMenuEdit(item)}>Edit</button>
                <button className="danger" onClick={() => handleMenuDelete(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Promo Management ── */}
      <section className="admin-section">
        <h2 className="admin-section-title">Promotions</h2>

        <form className="admin-form" onSubmit={handlePromoSubmit}>
          <input value={promoForm.label} onChange={(e) => setPromoForm({ ...promoForm, label: e.target.value })} placeholder='Deal name (e.g. "Tuesday Special")' required />
          <input value={promoForm.description} onChange={(e) => setPromoForm({ ...promoForm, description: e.target.value })} placeholder="Description shown to customers" required />
          <input value={promoForm.badge} onChange={(e) => setPromoForm({ ...promoForm, badge: e.target.value })} placeholder='Badge (e.g. "🔥 HOT DEAL")' required />
          <select value={promoForm.discountType} onChange={(e) => setPromoForm({ ...promoForm, discountType: e.target.value })}>
            {DISCOUNT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          {(promoForm.discountType === "flat" || promoForm.discountType === "bundle") && (
            <input
              type="number"
              step="0.01"
              min="0"
              value={promoForm.discountValue}
              onChange={(e) => setPromoForm({ ...promoForm, discountValue: e.target.value })}
              placeholder={promoForm.discountType === "bundle" ? "Bundle price (e.g. 39.99)" : "Discount amount (e.g. 10)"}
              required
            />
          )}
          <button type="submit" disabled={isSavingPromo}>{isSavingPromo ? "Saving..." : editingPromoId ? "Save Changes" : "Add Promo"}</button>
          {editingPromoId && <button type="button" className="admin-cancel" onClick={() => { setEditingPromoId(null); setPromoForm(emptyPromoForm); }}>Cancel</button>}
        </form>

        <div className="admin-list">
          {promos.map((promo) => (
            <div key={promo.id} className={`admin-item-card ${!promo.active ? "admin-item-inactive" : ""}`}>
              <div>
                <h3>{promo.badge} {promo.label}</h3>
                <p>{promo.description}</p>
                <span className="admin-promo-meta">
                  {DISCOUNT_TYPES.find((t) => t.value === promo.discountType)?.label}
                  {promo.discountType === "flat" && ` — $${Number(promo.discountValue).toFixed(2)} off`}
                  {promo.discountType === "bundle" && ` — $${Number(promo.discountValue).toFixed(2)} total`}
                  {" • "}
                  <span className={promo.active ? "status-active" : "status-inactive"}>
                    {promo.active ? "Active" : "Inactive"}
                  </span>
                </span>
              </div>
              <div className="admin-item-actions">
                <button onClick={() => handlePromoEdit(promo)}>Edit</button>
                <button onClick={() => handlePromoToggle(promo)}>{promo.active ? "Deactivate" : "Activate"}</button>
                <button className="danger" onClick={() => handlePromoDelete(promo.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
