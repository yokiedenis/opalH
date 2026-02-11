const express = require("express");
const router = express.Router();
const {
  createBooking,
  getAllBookings,
  getBooking,
  updateBooking,
  cancelBooking,
  getAllBookingsAdmin,
} = require("../controllers/bookingController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// Public routes
router.post("/", createBooking);

// Protected routes
router.get("/", verifyToken, getAllBookings);
router.get("/:id", verifyToken, getBooking);
router.patch("/:id", verifyToken, updateBooking);
router.post("/:id/cancel", verifyToken, cancelBooking);

// Admin routes
router.get("/all", verifyToken, isAdmin, getAllBookingsAdmin);

module.exports = router;
