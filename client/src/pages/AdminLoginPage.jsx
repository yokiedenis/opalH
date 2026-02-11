import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/AdminLoginPage.css";

const API_BASE = "http://localhost:5000/api";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Validate inputs
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Check if user is admin
      if (data.user.role !== "admin") {
        throw new Error("Only admin users can access this portal");
      }

      // Store token and admin info
      localStorage.setItem("token", data.token);
      localStorage.setItem("admin", JSON.stringify(data.user));

      // Redirect to admin dashboard
      navigate("/admin");
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-wrapper">
        <div className="login-card">
          <div className="login-header">
            <h1>🏨 Admin Portal</h1>
            <p>Opal Hotel Management System</p>
          </div>

          {error && <div className="error-banner">{error}</div>}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email">Admin Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@opalh.com"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  disabled={loading}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            <button type="submit" className="btn-login" disabled={loading}>
              {loading ? "Logging in..." : "🔐 Admin Login"}
            </button>
          </form>

          <div className="login-footer">
            <p>
              <Link to="/">← Back to Hotel</Link>
            </p>
          </div>
        </div>

        <div className="login-info">
          <h3>📋 Demo Credentials</h3>
          <p>
            <strong>Email:</strong> admin@opalh.com
          </p>
          <p>
            <strong>Password:</strong> admin123
          </p>
          <p className="info-note">
            For security purposes, please change credentials in production.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
