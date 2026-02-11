const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  reviewType: {
    type: String,
    enum: ["room", "food", "environment", "experience", "general"],
    required: true,
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  guestName: {
    type: String,
    required: true,
  },
  guestEmail: String,
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  bookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  images: [String], // Customer can upload photos
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", reviewSchema);
