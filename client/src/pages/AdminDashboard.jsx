import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/AdminDashboard.css";

const API_BASE = "http://localhost:5000/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [adminUser, setAdminUser] = useState(null);

  // Get token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    const admin = localStorage.getItem("admin");
    if (admin) {
      setAdminUser(JSON.parse(admin));
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      // Fetch all data in parallel
      const [ordersRes, bookingsRes, reviewsRes] = await Promise.all([
        fetch(`${API_BASE}/orders/all`, { headers }),
        fetch(`${API_BASE}/bookings/all`, { headers }),
        fetch(`${API_BASE}/reviews/all`, { headers }),
      ]);

      if (!ordersRes.ok || !bookingsRes.ok || !reviewsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const ordersData = await ordersRes.json();
      const bookingsData = await bookingsRes.json();
      const reviewsData = await reviewsRes.json();

      setOrders(ordersData.data || []);
      setBookings(bookingsData.data || []);
      setReviews(reviewsData.data || []);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message || "Failed to load dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/admin-login");
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatPrice = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "UGX",
    });
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div className="header-content">
          <h1>🏢 Admin Dashboard</h1>
          <p>Opal Hotel Management System</p>
        </div>
        <div className="header-user">
          <span className="user-info">👤 {adminUser?.fullName || "Admin"}</span>
          <button onClick={handleLogout} className="btn-logout">
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-details">
            <h3>Total Orders</h3>
            <p className="stat-number">{orders.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏨</div>
          <div className="stat-details">
            <h3>Total Bookings</h3>
            <p className="stat-number">{bookings.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-details">
            <h3>Total Reviews</h3>
            <p className="stat-number">{reviews.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-details">
            <h3>Total Revenue</h3>
            <p className="stat-number">
              {formatPrice(
                orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0),
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === "orders" ? "active" : ""}`}
          onClick={() => setActiveTab("orders")}
        >
          📦 Orders ({orders.length})
        </button>
        <button
          className={`tab-button ${activeTab === "bookings" ? "active" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          🏨 Bookings ({bookings.length})
        </button>
        <button
          className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("reviews")}
        >
          ⭐ Reviews ({reviews.length})
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading dashboard data...</div>
      ) : (
        <div className="admin-content">
          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div className="tab-content">
              <h2>📦 All Orders</h2>
              {orders.length === 0 ? (
                <p className="no-data">No orders yet</p>
              ) : (
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Phone</th>
                        <th>Items</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td className="order-id">{order.orderId}</td>
                          <td>{order.customerName}</td>
                          <td>{order.customerPhone}</td>
                          <td>{order.items?.length || 0} items</td>
                          <td className="price">
                            {formatPrice(order.totalPrice)}
                          </td>
                          <td>
                            <span className={`badge ${order.orderStatus}`}>
                              {order.orderStatus}
                            </span>
                          </td>
                          <td className="date">
                            {formatDate(order.createdAt)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div className="tab-content">
              <h2>🏨 All Bookings</h2>
              {bookings.length === 0 ? (
                <p className="no-data">No bookings yet</p>
              ) : (
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Booking ID</th>
                        <th>Guest Name</th>
                        <th>Phone</th>
                        <th>Room Type</th>
                        <th>Check-in</th>
                        <th>Check-out</th>
                        <th>Total Price</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking) => (
                        <tr key={booking._id}>
                          <td className="booking-id">
                            {booking._id?.slice(-8) || "N/A"}
                          </td>
                          <td>{booking.guestName || "N/A"}</td>
                          <td>{booking.guestPhone || "N/A"}</td>
                          <td>{booking.roomType || "N/A"}</td>
                          <td className="date">
                            {booking.checkInDate
                              ? formatDate(booking.checkInDate)
                              : "N/A"}
                          </td>
                          <td className="date">
                            {booking.checkOutDate
                              ? formatDate(booking.checkOutDate)
                              : "N/A"}
                          </td>
                          <td className="price">
                            {formatPrice(booking.totalPrice || 0)}
                          </td>
                          <td>
                            <span className={`badge ${booking.bookingStatus}`}>
                              {booking.bookingStatus || "pending"}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === "reviews" && (
            <div className="tab-content">
              <h2>⭐ All Reviews</h2>
              {reviews.length === 0 ? (
                <p className="no-data">No reviews yet</p>
              ) : (
                <div className="reviews-grid">
                  {reviews.map((review) => (
                    <div key={review._id} className="review-card">
                      <div className="review-header">
                        <h4>{review.guestName || "Anonymous"}</h4>
                        <div className="stars">
                          {"⭐".repeat(review.rating || 0)}
                        </div>
                      </div>
                      <p className="review-text">{review.comment}</p>
                      <div className="review-type">
                        {review.reviewType || "general"} review
                      </div>
                      <p className="review-date">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
