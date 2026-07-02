import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart/Cart";
import Confirmation from "./pages/Confirmation/Confirmation";
import PizzaDetail from "./pages/PizzaDetail/PizzaDetail";
import Admin from "./pages/Admin/Admin";
import Checkout from "./pages/Checkout/Checkout";
import Orders from "./pages/Orders/Orders";
import Deals from "./pages/Deals/Deals";

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar />

        {/* GLOBAL WRAPPER */}
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/menu/:id" element={<PizzaDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/deals" element={<Deals />} />
          </Routes>
        </div>

      </BrowserRouter>
    </CartProvider>
  );
}
