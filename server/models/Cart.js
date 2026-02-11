const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  items: [
    {
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "FoodItem",
        required: true,
      },
      name: String,
      price: Number,
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      image: String,
      description: String,
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  totalItems: {
    type: Number,
    default: 0,
  },
  totalPrice: {
    type: Number,
    default: 0,
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

// Calculate totals before saving
cartSchema.pre("save", function (next) {
  this.totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
  this.totalPrice = this.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Cart", cartSchema);
