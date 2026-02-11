const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  roomNumber: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    enum: ["single", "double", "facilities"],
    required: true,
  },
  price: {
    type: Number,
    required: true, // 60000 for single, 80000 for double
  },
  description: String,
  capacity: {
    type: Number,
    required: true, // 1 for single, 2 for double
  },
  amenities: [String], // WiFi, AC, TV, etc
  images: [String], // Array of image URLs
  videos: [String], // Array of video URLs
  isAvailable: {
    type: Boolean,
    default: true,
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

module.exports = mongoose.model("Room", roomSchema);
