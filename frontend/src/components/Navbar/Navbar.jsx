import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="navbar">

      {/* TOP LOGO — NOT A LINK */}
      <div className="navbar-logo">
      <span className="logo">🍕 Eats-A-Pizza</span>
      </div>


      {/* MOBILE MENU BUTTON */}
      <button className="menu-toggle" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* COLLAPSIBLE NAVBAR CONTENT */}
      <div className={`navbar-content ${open ? "open" : ""}`}>

        <div className="navbar-left">
          <Link to="/" className="nav-link" onClick={() => setOpen(false)}>
          Home
          </Link>

          <Link to="/menu" className="nav-link" onClick={() => setOpen(false)}>
            Order Now
          </Link>

          <Link to="/menu" className="nav-link" onClick={() => setOpen(false)}>
            Menu
          </Link>

          <Link to="/deals" className="nav-link" onClick={() => setOpen(false)}>
            Deals
          </Link>

          <Link to="/orders" className="nav-link" onClick={() => setOpen(false)}>
            Previous Orders
          </Link>
        </div>

        <div className="navbar-right">
          <Link to="/admin" className="btn-signin" onClick={() => setOpen(false)}>
            Admin
          </Link>

          <Link to="/cart" className="cart-icon" onClick={() => setOpen(false)}>
            🛒
            {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
          </Link>
        </div>

      </div>
    </nav>
  );
}
