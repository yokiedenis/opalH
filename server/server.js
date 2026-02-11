const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { verifyToken, isAdmin } = require("./middleware/auth");

dotenv.config();

const app = express();

// Connect to MongoDB
console.log("📡 [server] Connecting to MongoDB...");
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📨 [${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Public Routes
console.log("🛣️  [server] Setting up auth routes");
app.use("/api/auth", require("./routes/authRoutes"));

// Public API Routes
console.log("🛣️  [server] Setting up public API routes");
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/food", require("./routes/foodRoutes"));
app.use("/api/reviews", require("./routes/reviewRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));

// Protected API Routes
console.log("🛣️  [server] Setting up protected API routes");
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// Health check endpoint
app.get("/api/health", (req, res) => {
  console.log("💚 [server] Health check requested");
  res.json({ success: true, message: "Server is running" });
});

// 404 handler
app.use((req, res) => {
  console.warn(`⚠️ [server] 404 Not Found: ${req.method} ${req.path}`);
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ [server] Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 [server] Server running on port ${PORT}`);
  // console.log(`📍 [server] API URL: http://localhost:${PORT}/api`);
  // console.log(`✅ [server] Health check: http://localhost:${PORT}/api/health`);
  // console.log(`\n✅ Backend is ready for incoming requests!\n`);
});
