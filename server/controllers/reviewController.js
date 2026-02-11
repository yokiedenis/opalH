const Review = require("../models/Review");

// Create review
exports.createReview = async (req, res) => {
  try {
    const {
      reviewType,
      rating,
      title,
      comment,
      guestName,
      guestEmail,
      roomId,
      bookingId,
    } = req.body;

    if (!reviewType || !rating || !title || !comment || !guestName) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const review = new Review({
      reviewType,
      rating,
      title,
      comment,
      guestName,
      guestEmail,
      roomId,
      bookingId,
      isApproved: true, // Auto-approve reviews for now
    });

    const newReview = await review.save();
    res.status(201).json({
      success: true,
      data: newReview,
      message: "Review created successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all approved reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true })
      .populate("bookingId")
      .populate("roomId")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: reviews,
      count: reviews.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get reviews by type
exports.getReviewsByType = async (req, res) => {
  try {
    const reviews = await Review.find({
      reviewType: req.params.type,
      isApproved: true,
    }).sort({ createdAt: -1 });
    res.json({ success: true, data: reviews, count: reviews.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all reviews (admin)
exports.getAllReviewsAdmin = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("bookingId")
      .populate("roomId")
      .sort({ createdAt: -1 });
    res.json({
      success: true,
      data: reviews,
      count: reviews.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Approve review (admin)
exports.approveReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });

    review.isApproved = true;
    review.updatedAt = Date.now();
    await review.save();

    res.json({ success: true, data: review, message: "Review approved" });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete review (admin)
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    res.json({ success: true, message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
