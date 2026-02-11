const express = require("express");
const router = express.Router();
const {
  createOrder,
  getAllOrders,
  getOrder,
  updateOrder,
  cancelOrder,
  getAllOrdersAdmin,
} = require("../controllers/orderController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// Public routes
router.post("/", createOrder);

// Protected routes
router.get("/", verifyToken, getAllOrders);
router.get("/:id", verifyToken, getOrder);
router.patch("/:id", verifyToken, updateOrder);
router.post("/:id/cancel", verifyToken, cancelOrder);

// Admin routes
router.get("/all", verifyToken, isAdmin, getAllOrdersAdmin);

module.exports = router;
