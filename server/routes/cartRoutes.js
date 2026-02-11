const express = require("express");
const router = express.Router();
const {
  getCart,
  addToCart,
  removeFromCart,
  updateCartItem,
  clearCart,
} = require("../controllers/cartController");
const { verifyToken } = require("../middleware/auth");

// All cart routes are protected
router.use(verifyToken);

/**
 * @route   GET /api/cart
 * @desc    Get user's cart
 * @access  Private
 */
router.get("/", getCart);

/**
 * @route   POST /api/cart/add
 * @desc    Add item to cart
 * @access  Private
 */
router.post("/add", addToCart);

/**
 * @route   DELETE /api/cart/remove/:foodId
 * @desc    Remove item from cart
 * @access  Private
 */
router.delete("/remove/:foodId", removeFromCart);

/**
 * @route   PATCH /api/cart/update/:foodId
 * @desc    Update item quantity in cart
 * @access  Private
 */
router.patch("/update/:foodId", updateCartItem);

/**
 * @route   DELETE /api/cart/clear
 * @desc    Clear entire cart
 * @access  Private
 */
router.delete("/clear", clearCart);

module.exports = router;
