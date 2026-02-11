import React, { useState, useEffect, useContext } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { BookingContext } from "../context/BookingContext.jsx";
import * as FoodImages from "@assets/images/index.js";
import "./FoodMenu.css";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Map image filenames to imports
const IMAGE_MAP = {
  "fish.jpg": FoodImages.tilapia,
  "mulo.jfif": FoodImages.posho,
  "wakeupandgorolex.jpg": FoodImages.rolex,
  "pizza.png": FoodImages.pizza,
  "matookekatogo.jpg": FoodImages.matoke,
  "juice.png": FoodImages.juice,
  "grilledduarterchicken.jpg": FoodImages.samosa,
  "pizza2.jpg": FoodImages.vegetablePizza,
  "matookeBeef.jpg": FoodImages.steak,
  "fruits2.jpg": FoodImages.cake,
};

const FoodMenu = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);
  const { addToCart } = useContext(BookingContext);

  // Toast notification function
  const showToast = (message, type = "success", duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  };

  // Function to resolve image paths
  const getImagePath = (imagePath) => {
    if (!imagePath) return null;
    // Extract filename from path (e.g., "/src/assets/images/tilapia.jpg" -> "tilapia.jpg")
    const filename = imagePath.split("/").pop();
    return IMAGE_MAP[filename] || imagePath;
  };

  useEffect(() => {
    fetchFoodItems();
  }, []);

  const fetchFoodItems = async () => {
    try {
      setLoading(true);
      console.log(`🔍 [FoodMenu] Fetching food items from: ${API_BASE}/food`);

      const response = await fetch(`${API_BASE}/food`);
      console.log(`📊 [FoodMenu] Response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ [FoodMenu] Data received:`, data);

      if (data.success) {
        setFoodItems(data.data || []);
        console.log(
          `✨ [FoodMenu] Food items loaded:`,
          data.data?.length,
          "items",
        );
      } else if (Array.isArray(data)) {
        setFoodItems(data);
        console.log(`✨ [FoodMenu] Array data loaded:`, data.length, "items");
      } else {
        setFoodItems([]);
        console.warn(`⚠️ [FoodMenu] Unexpected data format:`, data);
      }

      setError(null);
    } catch (err) {
      console.error("❌ [FoodMenu] Error fetching food items:", err);
      setError(err.message);
      setFoodItems([]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["all", "pizza", "meal", "drink", "dessert", "breakfast"];
  const filteredItems =
    activeCategory === "all"
      ? foodItems
      : foodItems.filter((item) => item.category === activeCategory);

  const handleAddToCart = (item) => {
    addToCart({
      ...item,
      cartId: Math.random(), // Unique ID for cart item
      quantity: 1,
    });
    // Show toast notification
    showToast(`✅ ${item.name} added to cart!`, "success");
  };

  return (
    <section className="food-menu light-bg">
      <div className="container">
        <h2>Food & Pizza Menu</h2>

        <div className="food-intro">
          <p>
            Enjoy delicious meals, fresh pizza, and refreshing beverages in our
            restaurant. Everything prepared fresh with quality ingredients!
          </p>
        </div>

        <div className="category-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`category-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {error && (
          <div className="error-message">
            ⚠️ Error loading food items: {error}
          </div>
        )}

        <div className="food-grid">
          {loading ? (
            <div className="loading">Loading menu items...</div>
          ) : filteredItems.length === 0 ? (
            <div className="no-items">No items available</div>
          ) : (
            filteredItems.map((item) => (
              <div key={item._id || item.id} className="food-card">
                <div className="food-image">
                  {item.image ? (
                    <img src={getImagePath(item.image)} alt={item.name} />
                  ) : (
                    <div className="placeholder">{item.name}</div>
                  )}
                  {!item.inStock && (
                    <div className="out-of-stock">Out of Stock</div>
                  )}
                  <span className="price-badge">
                    {item.price?.toLocaleString()} UGX
                  </span>
                </div>

                <div className="food-info">
                  <h3>{item.name}</h3>
                  <p className="description">{item.description}</p>

                  <div className="food-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="star" />
                    ))}
                    <span className="rating-text">(4.8)</span>
                  </div>

                  {item.prepTime && (
                    <div className="prep-time">⏱️ {item.prepTime} mins</div>
                  )}

                  <button
                    className="btn btn-primary btn-small add-to-cart"
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                  >
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="food-note">
          <p>
            📱 Order directly or call us: <strong>+256 791909059</strong>
          </p>
          <p>🚚 Delivery available | 💳 MoMo Pay accepted</p>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className={`toast toast-${toast.type}`}>
            <div className="toast-content">
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FoodMenu;
