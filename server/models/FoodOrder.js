const mongoose = require("mongoose");

const foodOrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true,
  },
  items: [
    {
      foodItemId: {
        type: mongoose.Schema.Types.Mixed, // Accept ObjectId or String
        required: true,
      },
      name: String,
      quantity: Number,
      price: Number,
      subtotal: Number,
    },
  ],
  customerName: {
    type: String,
    required: true,
  },
  customerEmail: String,
  customerPhone: {
    type: String,
    required: true,
  },
  deliveryAddress: {
    type: String,
    default: "Not specified",
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  deliveryFee: {
    type: Number,
    default: 0,
  },
  orderStatus: {
    type: String,
    enum: [
      "pending",
      "preparing",
      "ready",
      "out-for-delivery",
      "delivered",
      "cancelled",
    ],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["momo", "card", "cash"],
    default: "momo",
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

module.exports = mongoose.model("FoodOrder", foodOrderSchema);
