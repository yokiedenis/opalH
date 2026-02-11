const express = require("express");
const router = express.Router();
const {
  createReview,
  getAllReviews,
  getReviewsByType,
  getAllReviewsAdmin,
  approveReview,
  deleteReview,
} = require("../controllers/reviewController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// Public routes
router.post("/", createReview);
router.get("/", getAllReviews);
router.get("/type/:type", getReviewsByType);

// Admin routes
router.get("/all", verifyToken, isAdmin, getAllReviewsAdmin);
router.patch("/admin/:id/approve", verifyToken, isAdmin, approveReview);
router.delete("/admin/:id", verifyToken, isAdmin, deleteReview);

module.exports = router;
