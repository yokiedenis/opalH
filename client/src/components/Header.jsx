import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart, FaUser } from "react-icons/fa";
import { BookingContext } from "../context/BookingContext.jsx";
import logoImg from "@assets/images/logo.jpg";
import what from "@assets/images/what.png";
import ChatBot from "./ChatBot.jsx";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useContext(BookingContext);
  const cartCount = cartItems.length;

  // Smooth scroll to section on same page
  const scrollToSection = (sectionId) => {
    setMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  React.useEffect(() => {
    console.log("🔗 [Header] Navigation Links Connected:");
    console.log("  ✅ Home → /");
    console.log("  ✅ Rooms → /#rooms (scroll to #rooms)");
    console.log("  ✅ Food & Pizza → /#food (scroll to #food)");
    console.log("  ✅ Gallery → /#gallery (scroll to #gallery)");
    console.log("  ✅ Reviews → /#reviews (scroll to #reviews)");
    console.log("  ✅ Book Now → /booking");
    console.log("  ✅ My Cart → /cart");
    console.log("  ✅ Admin → /admin");
  }, []);

  return (
    <header className="header">
      <ChatBot />
      <button
        className="logos logo"
        onClick={() => window.openChatWidget?.()}
        title="Open Chat"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <img src={what} alt="Open Chat" className="logo-img" loading="lazy" />
      </button>
      <div className="container header-content">
        <Link to="/" className="C">
          <img
            src={logoImg}
            alt="Opal Heights Hotel"
            className="logo-img"
            loading="lazy"
          />
        </Link>

        {/* Mobile Overlay */}
        {menuOpen && (
          <div className="menu-overlay" onClick={() => setMenuOpen(false)} />
        )}

        <nav className={`nav ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <button
            className="nav-link-btn"
            onClick={() => scrollToSection("rooms")}
            title="Scroll to Rooms"
          >
            Facilities
          </button>
          <button
            className="nav-link-btn"
            onClick={() => scrollToSection("food")}
            title="Scroll to Food & Pizza"
          >
            Food & Pizza
          </button>
          <button
            className="nav-link-btn"
            onClick={() => scrollToSection("gallery")}
            title="Scroll to Gallery"
          >
            Gallery
          </button>
          <button
            className="nav-link-btn"
            onClick={() => scrollToSection("reviews")}
            title="Scroll to Reviews"
          >
            Reviews
          </button>
          <Link to="/booking" onClick={() => setMenuOpen(false)}>
            Book Now
          </Link>
          <Link
            to="/cart"
            className="cart-link"
            onClick={() => setMenuOpen(false)}
          >
            My Cart
          </Link>
        </nav>

        <div className="header-actions">
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart />
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
          <Link to="/admin-login" className="admin-icon" title="Admin Portal">
            <FaUser />
          </Link>
          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
