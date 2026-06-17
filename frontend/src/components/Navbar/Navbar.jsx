import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Navbar.css";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/menu" className="nav-link">Order Now</Link>
        <Link to="/menu" className="nav-link underline">Menu</Link>
        <Link to="/#deals" className="nav-link">Deals</Link>
      </div>

      <div className="navbar-center">
        <Link to="/" className="logo">🍕 PizzaCo</Link>
      </div>

      <div className="navbar-right">
        <button className="btn-signin">Sign In</button>
        <Link to="/cart" className="cart-icon">
          🛒
          {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
        </Link>
      </div>
    </nav>
  );
}
