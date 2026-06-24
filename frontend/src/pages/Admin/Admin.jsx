import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createMenuItem, deleteMenuItem, fetchMenuItems, loginAdmin, updateMenuItem } from "../../api/menuApi";
import { categories } from "../../data/menuData";
import "./Admin.css";

const emptyForm = {
  category: "pizza",
  name: "",
  description: "",
  price: "",
  image: "",
};

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    loadItems();
  }, [token]);

  async function loadItems() {
    try {
      const data = await fetchMenuItems();
      setItems(Array.isArray(data) ? data : []);
      setError("");
    } catch (err) {
      setError(err.message || "Unable to load menu");
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!token) return;

    try {
      setIsSaving(true);
      const payload = {
        ...form,
        price: Number(form.price),
      };

      if (editingId) {
        await updateMenuItem(editingId, payload, token);
      } else {
        await createMenuItem(payload, token);
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadItems();
    } catch (err) {
      setError(err.message || "Unable to save item");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!token) return;
    try {
      await deleteMenuItem(id, token);
      await loadItems();
    } catch (err) {
      setError(err.message || "Unable to delete item");
    }
  }

  function handleEdit(item) {
    setEditingId(item.id);
    setForm({
      category: item.category,
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image || "",
    });
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
          <p className="admin-subtitle">Add, update, or remove menu items.</p>
        </div>
        <button className="admin-logout" onClick={handleLogout}>Log Out</button>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Item name" required />
        <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" required />
        <input type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price" required />
        <input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} placeholder="Image URL (optional)" />
        <button type="submit" disabled={isSaving}>{isSaving ? "Saving..." : editingId ? "Save Changes" : "Add Item"}</button>
        {editingId && <button type="button" className="admin-cancel" onClick={() => { setEditingId(null); setForm(emptyForm); }}>Cancel</button>}
      </form>

      {error && <p className="admin-error">{error}</p>}

      <div className="admin-list">
        {items.map((item) => (
          <div key={item.id} className="admin-item-card">
            <div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <span>${Number(item.price).toFixed(2)} • {item.category}</span>
            </div>
            <div className="admin-item-actions">
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button className="danger" onClick={() => handleDelete(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
