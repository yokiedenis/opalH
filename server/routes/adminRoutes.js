const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");
const FoodOrder = require("../models/FoodOrder");
const Review = require("../models/Review");

// Get dashboard stats
router.get("/stats", async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments();
    const totalOrders = await FoodOrder.countDocuments();
    const totalReviews = await Review.countDocuments();

    const pendingBookings = await Booking.countDocuments({
      bookingStatus: "pending",
    });
    const completedBookings = await Booking.countDocuments({
      bookingStatus: "checked-out",
    });

    res.json({
      totalBookings,
      totalOrders,
      totalReviews,
      pendingBookings,
      completedBookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all bookings (admin)
router.get("/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("roomId")
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders (admin)
router.get("/orders", async (req, res) => {
  try {
    const orders = await FoodOrder.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Approve review
router.patch("/reviews/:id/approve", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true },
    );
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
