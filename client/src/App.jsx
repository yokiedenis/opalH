import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext.jsx";
import { NotificationProvider } from "./context/NotificationContext.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Toast from "./components/Toast.jsx";
import ProtectedAdminRoute from "./components/ProtectedAdminRoute.jsx";
import Home from "./pages/Home.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import CartPage from "./pages/CartPage.jsx";
import AdminLoginPage from "./pages/AdminLoginPage.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import "./styles/globals.css";

function App() {
  useEffect(() => {
    const apiBase =
      import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
    console.log("🎨 [App] React Application loaded");
    console.log(`📡 [App] API Base URL: ${apiBase}`);
    console.log("✅ [App] Component mounted and ready to fetch data");
  }, []);

  return (
    <NotificationProvider>
      <BookingProvider>
        <Router>
          <Toast />
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/admin-login" element={<AdminLoginPage />} />
              <Route
                path="/admin"
                element={
                  <ProtectedAdminRoute>
                    <AdminDashboard />
                  </ProtectedAdminRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </Router>
      </BookingProvider>
    </NotificationProvider>
  );
}

export default App;
