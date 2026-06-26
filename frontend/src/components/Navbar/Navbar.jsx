import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">

      {/* MOBILE MENU BUTTON */}
      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* COLLAPSIBLE NAVBAR CONTENT */}
      <div className={`navbar-content ${open ? "open" : ""}`}>

        <div className="navbar-left">
          <Link to="/menu" className="nav-link">Order Now</Link>
          <Link to="/menu" className="nav-link underline">Menu</Link>
          <Link to="/#deals" className="nav-link">Deals</Link>
          <Link to="/orders" className="nav-link">Previous Orders</Link>
        </div>

        <div className="navbar-center">
          <Link to="/" className="logo">🍕 Eats-A-Pizza</Link>
        </div>

        <div className="navbar-right">
          <Link to="/admin" className="btn-signin">Admin</Link>
          <Link to="/cart" className="cart-icon">
            🛒
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>

      </div>
    </nav>
  );
}
