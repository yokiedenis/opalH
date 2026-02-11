const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ["pizza", "meal", "drink", "dessert", "breakfast"],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  image: String,
  video: String, // TikTok embed or video URL
  inStock: {
    type: Boolean,
    default: true,
  },
  prepTime: Number, // in minutes
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("FoodItem", foodItemSchema);
