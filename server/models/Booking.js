const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  bookingId: {
    type: String,
    unique: true,
    required: true,
  },
  guestName: {
    type: String,
    required: true,
  },
  guestEmail: {
    type: String,
    required: true,
  },
  guestPhone: {
    type: String,
    required: true,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  numberOfGuests: {
    type: Number,
    required: true,
  },
  specialRequests: String,
  totalPrice: {
    type: Number,
    required: true,
  },
  breakfastIncluded: {
    type: Boolean,
    default: false,
  },
  breakfastPrice: {
    type: Number,
    default: 0, // 100000 if included
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed", "cancelled"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["momo", "card", "cash"],
    default: "momo",
  },
  bookingStatus: {
    type: String,
    enum: ["pending", "confirmed", "checked-in", "checked-out", "cancelled"],
    default: "pending",
  },
  notificationSent: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
