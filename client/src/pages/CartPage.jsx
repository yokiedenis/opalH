// import React, { useContext, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaTrash,
//   FaPlus,
//   FaMinus,
//   FaCheckCircle,
//   FaShoppingBag,
//   FaBox,
// } from "react-icons/fa";
// import { BookingContext } from "../context/BookingContext.jsx";
// import "../styles/CartPage.css";

// const API_BASE =
//   import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// const CartPage = () => {
//   const { cartItems, removeFromCart, clearCart } = useContext(BookingContext);
//   const [quantities, setQuantities] = useState({});
//   const [submitting, setSubmitting] = useState(false);
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const [toast, setToast] = useState(null);

//   const [customerInfo, setCustomerInfo] = useState({
//     customerName: "",
//     customerPhone: "",
//     deliveryAddress: "",
//   });

//   // Toast notification function
//   const showToast = (message, type = "success", duration = 3000) => {
//     setToast({ message, type });
//     setTimeout(() => setToast(null), duration);
//   };

//   // Monitor cart items and redirect if empty
//   useEffect(() => {
//     if (
//       cartItems.length === 0 &&
//       !success &&
//       Object.keys(customerInfo).some((key) => customerInfo[key])
//     ) {
//       // Cart was just emptied but we're still viewing (show empty state)
//       // This allows the empty cart message to show briefly
//       const timeout = setTimeout(() => {
//         // Redirect after 1 second if still empty
//       }, 1000);
//       return () => clearTimeout(timeout);
//     }
//   }, [cartItems.length, success]);

//   const handleQuantityChange = (cartId, change) => {
//     setQuantities((prev) => ({
//       ...prev,
//       [cartId]: Math.max(1, (prev[cartId] || 1) + change),
//     }));
//     showToast("✏️ Quantity updated", "info", 2000);
//   };

//   const getItemQuantity = (cartId) => quantities[cartId] || 1;

//   const calculateItemTotal = (item) => {
//     const quantity = getItemQuantity(item.cartId);
//     return item.price * quantity;
//   };

//   const calculateCartTotal = () => {
//     return cartItems.reduce(
//       (total, item) => total + calculateItemTotal(item),
//       0,
//     );
//   };

//   const handleCustomerInfoChange = (e) => {
//     const { name, value } = e.target;
//     setCustomerInfo((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmitOrder = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     if (cartItems.length === 0) {
//       setError("Your cart is empty!");
//       return;
//     }

//     if (!customerInfo.customerName || !customerInfo.customerPhone) {
//       setError("Please enter your name and phone number");
//       return;
//     }

//     try {
//       setSubmitting(true);

//       const orderItems = cartItems.map((item) => {
//         // Get the correct food ID - try _id first, then id, then use a generated one
//         const foodItemId =
//           item._id || item.id || item.foodId || `food-${item.cartId}`;

//         return {
//           foodItemId: foodItemId,
//           name: item.name,
//           price: item.price,
//           quantity: getItemQuantity(item.cartId),
//         };
//       });

//       const orderData = {
//         items: orderItems,
//         customerName: customerInfo.customerName,
//         customerPhone: customerInfo.customerPhone,
//         deliveryAddress: customerInfo.deliveryAddress,
//         totalPrice: calculateCartTotal(),
//       };

//       const response = await fetch(`${API_BASE}/orders`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Order submission failed");
//       }

//       // Success - clear local cart and show confirmation
//       setSuccess(
//         "✅ Order placed successfully! You will receive a confirmation call.",
//       );
//       showToast("🎉 Order confirmed!", "success", 3000);
//       clearCart();
//       setCustomerInfo({
//         customerName: "",
//         customerPhone: "",
//         deliveryAddress: "",
//       });
//       setQuantities({});

//       // Redirect after success
//       setTimeout(() => {
//         window.location.href = "/";
//       }, 2500);
//     } catch (err) {
//       console.error("Error submitting order:", err);
//       setError(err.message || "Failed to place order");
//       showToast(
//         "❌ Order failed: " + (err.message || "Please try again"),
//         "error",
//         4000,
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (cartItems.length === 0 && !success) {
//     return (
//       <div className="cart-page">
//         <div className="container">
//           <h1>🛒 Shopping Cart</h1>
//           <div className="empty-cart">
//             <div className="empty-icon">📭</div>
//             <p>Your cart is empty</p>
//             <p className="empty-description">
//               Browse our delicious menu and add items to get started!
//             </p>
//             <Link to="/#food-menu" className="btn btn-primary btn-large">
//               🍽️ Browse Menu
//             </Link>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="cart-page">
//       <div className="container">
//         <h1>🛒 Shopping Cart</h1>

//         <div className="cart-content">
//           <div className="cart-items">
//             <h2>Items ({cartItems.length})</h2>

//             {error && <div className="error-message">{error}</div>}
//             {success && <div className="success-message">{success}</div>}

//             <div className="items-list">
//               {cartItems.map((item) => (
//                 <div key={item.cartId} className="cart-item">
//                   <div className="item-image">
//                     {item.image ? (
//                       <img src={item.image} alt={item.name} />
//                     ) : (
//                       <div className="placeholder">{item.name}</div>
//                     )}
//                   </div>

//                   <div className="item-details">
//                     <h3>{item.name}</h3>
//                     <p className="item-description">{item.description}</p>
//                     <div className="item-price">
//                       {item.price.toLocaleString()} UGX
//                     </div>
//                   </div>

//                   <div className="item-quantity">
//                     <button
//                       onClick={() => handleQuantityChange(item.cartId, -1)}
//                       className="qty-btn qty-minus"
//                       title="Decrease quantity"
//                     >
//                       <FaMinus />
//                     </button>
//                     <span className="qty-display">
//                       {getItemQuantity(item.cartId)}
//                     </span>
//                     <button
//                       onClick={() => handleQuantityChange(item.cartId, 1)}
//                       className="qty-btn qty-plus"
//                       title="Increase quantity"
//                     >
//                       <FaPlus />
//                     </button>
//                   </div>

//                   <div className="item-total">
//                     {calculateItemTotal(item).toLocaleString()} UGX
//                   </div>

//                   <button
//                     onClick={() => {
//                       removeFromCart(item.cartId);
//                       showToast(
//                         `✅ ${item.name} removed from cart`,
//                         "success",
//                         2000,
//                       );
//                     }}
//                     className="remove-btn"
//                     title="Remove from cart"
//                   >
//                     <FaTrash />
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="cart-summary">
//             <h2>Order Summary</h2>

//             <form className="order-form" onSubmit={handleSubmitOrder}>
//               <div className="form-group">
//                 <label htmlFor="customerName">Your Name *</label>
//                 <input
//                   type="text"
//                   id="customerName"
//                   name="customerName"
//                   value={customerInfo.customerName}
//                   onChange={handleCustomerInfoChange}
//                   required
//                   placeholder="Enter your name"
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="customerPhone">Phone Number *</label>
//                 <input
//                   type="tel"
//                   id="customerPhone"
//                   name="customerPhone"
//                   value={customerInfo.customerPhone}
//                   onChange={handleCustomerInfoChange}
//                   required
//                   placeholder="+256..."
//                 />
//               </div>

//               <div className="form-group">
//                 <label htmlFor="deliveryAddress">Delivery Address</label>
//                 <textarea
//                   id="deliveryAddress"
//                   name="deliveryAddress"
//                   value={customerInfo.deliveryAddress}
//                   onChange={handleCustomerInfoChange}
//                   placeholder="Where should we deliver?"
//                   rows="3"
//                 />
//               </div>

//               <div className="summary-section">
//                 <div className="summary-item">
//                   <span>Items Total:</span>
//                   <strong>{calculateCartTotal().toLocaleString()} UGX</strong>
//                 </div>

//                 <div className="summary-divider"></div>

//                 <div className="summary-item total">
//                   <span>Order Total:</span>
//                   <strong className="total-price">
//                     {calculateCartTotal().toLocaleString()} UGX
//                   </strong>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 className="btn btn-primary btn-block"
//                 disabled={submitting}
//               >
//                 {submitting ? "Placing Order..." : "Place Order"}
//               </button>

//               <button
//                 type="button"
//                 onClick={() => (window.location.href = "/")}
//                 className="btn btn-outline btn-block"
//               >
//                 Continue Shopping
//               </button>
//             </form>
//           </div>
//         </div>

//         {/* Toast Notification */}
//         {toast && (
//           <div className={`toast toast-${toast.type}`}>
//             <div className="toast-content">
//               <span>{toast.message}</span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default CartPage;

import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaTrash,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { BookingContext } from "../context/BookingContext.jsx";
import "../styles/CartPage.css";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(BookingContext);
  const [quantities, setQuantities] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [toast, setToast] = useState(null);

  const [customerInfo, setCustomerInfo] = useState({
    customerName: "",
    customerPhone: "",
    deliveryAddress: "",
  });

  const showToast = (message, type = "success", duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  };

  useEffect(() => {
    if (
      cartItems.length === 0 &&
      !success &&
      Object.keys(customerInfo).some((key) => customerInfo[key])
    ) {
      const timeout = setTimeout(() => {}, 1000);
      return () => clearTimeout(timeout);
    }
  }, [cartItems.length, success]);

  const handleQuantityChange = (cartId, change) => {
    setQuantities((prev) => ({
      ...prev,
      [cartId]: Math.max(1, (prev[cartId] || 1) + change),
    }));
    showToast("✏️ Quantity updated", "info", 2000);
  };

  const getItemQuantity = (cartId) => quantities[cartId] || 1;

  const calculateItemTotal = (item) => {
    const quantity = getItemQuantity(item.cartId);
    return item.price * quantity;
  };

  const calculateCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + calculateItemTotal(item),
      0,
    );
  };

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (cartItems.length === 0) {
      setError("Your cart is empty!");
      return;
    }

    if (!customerInfo.customerName || !customerInfo.customerPhone) {
      setError("Please enter your name and phone number");
      return;
    }

    try {
      setSubmitting(true);

      const orderItems = cartItems.map((item) => {
        const foodItemId =
          item._id || item.id || item.foodId || `food-${item.cartId}`;

        return {
          foodItemId: foodItemId,
          name: item.name,
          price: item.price,
          quantity: getItemQuantity(item.cartId),
        };
      });

      const orderData = {
        items: orderItems,
        customerName: customerInfo.customerName,
        customerPhone: customerInfo.customerPhone,
        deliveryAddress: customerInfo.deliveryAddress,
        totalPrice: calculateCartTotal(),
      };

      const response = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Order submission failed");
      }

      setSuccess(
        "✅ Order placed successfully! You will receive a confirmation call.",
      );
      showToast("🎉 Order confirmed!", "success", 3000);
      clearCart();
      setCustomerInfo({
        customerName: "",
        customerPhone: "",
        deliveryAddress: "",
      });
      setQuantities({});

      setTimeout(() => {
        window.location.href = "/";
      }, 2500);
    } catch (err) {
      console.error("Error submitting order:", err);
      setError(err.message || "Failed to place order");
      showToast(
        "❌ Order failed: " + (err.message || "Please try again"),
        "error",
        4000,
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (cartItems.length === 0 && !success) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>🛒 Shopping Cart</h1>
          <div className="empty-cart">
            <div className="empty-icon">📭</div>
            <p>Your cart is empty</p>
            <p className="empty-description">
              Browse our delicious menu and add items to get started!
            </p>
            <Link to="/#food-menu" className="btn btn-primary btn-large">
              🍽️ Browse Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>🛒 Shopping Cart</h1>

        <div className="cart-content">
          <div className="cart-items">
            <h2>Items ({cartItems.length})</h2>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="items-list">
              {cartItems.map((item) => (
                <div key={item.cartId} className="cart-item">
                  <div className="item-image">
                    {item.image ? (
                      <img src={item.image} alt={item.name} />
                    ) : (
                      <div className="placeholder">{item.name}</div>
                    )}
                  </div>

                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-description">{item.description}</p>
                    <div className="item-price">
                      {item.price.toLocaleString()} UGX
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      removeFromCart(item.cartId);
                      showToast(
                        `✅ ${item.name} removed from cart`,
                        "success",
                        2000,
                      );
                    }}
                    className="remove-btn"
                    title="Remove from cart"
                  >
                    <FaTrash />
                  </button>

                  <div className="item-controls">
                    <div className="item-quantity">
                      <button
                        onClick={() => handleQuantityChange(item.cartId, -1)}
                        className="qty-btn qty-minus"
                        title="Decrease quantity"
                      >
                        <FaMinus />
                      </button>
                      <span className="qty-display">
                        {getItemQuantity(item.cartId)}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.cartId, 1)}
                        className="qty-btn qty-plus"
                        title="Increase quantity"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    <div className="item-total">
                      {calculateItemTotal(item).toLocaleString()} UGX
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>

            <form className="order-form" onSubmit={handleSubmitOrder}>
              <div className="form-group">
                <label htmlFor="customerName">Your Name *</label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={customerInfo.customerName}
                  onChange={handleCustomerInfoChange}
                  required
                  placeholder="Enter your name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="customerPhone">Phone Number *</label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  value={customerInfo.customerPhone}
                  onChange={handleCustomerInfoChange}
                  required
                  placeholder="+256..."
                />
              </div>

              <div className="form-group">
                <label htmlFor="deliveryAddress">Delivery Address</label>
                <textarea
                  id="deliveryAddress"
                  name="deliveryAddress"
                  value={customerInfo.deliveryAddress}
                  onChange={handleCustomerInfoChange}
                  placeholder="Where should we deliver?"
                  rows="3"
                />
              </div>

              <div className="summary-section">
                <div className="summary-item">
                  <span>Items Total:</span>
                  <strong>{calculateCartTotal().toLocaleString()} UGX</strong>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-item total">
                  <span>Order Total:</span>
                  <strong className="total-price">
                    {calculateCartTotal().toLocaleString()} UGX
                  </strong>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={submitting}
              >
                {submitting ? "Placing Order..." : "Place Order"}
              </button>

              <button
                type="button"
                onClick={() => (window.location.href = "/")}
                className="btn btn-outline btn-block"
              >
                Continue Shopping
              </button>
            </form>
          </div>
        </div>

        {toast && (
          <div className={`toast toast-${toast.type}`}>
            <div className="toast-content">
              <span>{toast.message}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;