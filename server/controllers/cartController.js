const Cart = require("../models/Cart");
const FoodItem = require("../models/FoodItem");

/**
 * Get user's cart
 * GET /api/cart
 */
exports.getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId }).populate("items.foodId");

    if (!cart) {
      return res.json({
        success: true,
        data: {
          items: [],
          totalItems: 0,
          totalPrice: 0,
        },
        message: "Cart is empty",
      });
    }

    res.json({
      success: true,
      data: cart,
      message: "Cart retrieved successfully",
    });
  } catch (error) {
    console.error("❌ Error getting cart:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Add item to cart
 * POST /api/cart/add
 */
exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { foodId, quantity = 1 } = req.body;

    if (!foodId) {
      return res.status(400).json({
        success: false,
        message: "Food ID is required",
      });
    }

    // Verify food item exists
    const foodItem = await FoodItem.findById(foodId);
    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [] });
    }

    // Check if item already exists in cart
    const existingItem = cart.items.find(
      (item) => item.foodId.toString() === foodId,
    );

    if (existingItem) {
      // Update quantity if item exists
      existingItem.quantity += quantity;
      existingItem.addedAt = Date.now();
    } else {
      // Add new item to cart
      cart.items.push({
        foodId,
        name: foodItem.name,
        price: foodItem.price,
        quantity,
        image: foodItem.image,
        description: foodItem.description,
      });
    }

    await cart.save();

    res.status(201).json({
      success: true,
      data: cart,
      message: "Item added to cart successfully",
    });
  } catch (error) {
    console.error("❌ Error adding to cart:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Remove item from cart
 * DELETE /api/cart/remove/:foodId
 */
exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { foodId } = req.params;

    if (!foodId) {
      return res.status(400).json({
        success: false,
        message: "Food ID is required",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find and remove the item
    const itemIndex = cart.items.findIndex(
      (item) => item.foodId.toString() === foodId,
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    const removedItem = cart.items[itemIndex];
    cart.items.splice(itemIndex, 1);

    await cart.save();

    res.json({
      success: true,
      data: cart,
      message: `${removedItem.name} removed from cart`,
    });
  } catch (error) {
    console.error("❌ Error removing from cart:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Update item quantity in cart
 * PATCH /api/cart/update/:foodId
 */
exports.updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { foodId } = req.params;
    const { quantity } = req.body;

    if (!foodId) {
      return res.status(400).json({
        success: false,
        message: "Food ID is required",
      });
    }

    if (quantity === undefined || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // Find and update the item
    const cartItem = cart.items.find(
      (item) => item.foodId.toString() === foodId,
    );

    if (!cartItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }

    cartItem.quantity = quantity;
    await cart.save();

    res.json({
      success: true,
      data: cart,
      message: "Cart item updated successfully",
    });
  } catch (error) {
    console.error("❌ Error updating cart item:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/**
 * Clear entire cart
 * DELETE /api/cart/clear
 */
exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      data: cart,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    console.error("❌ Error clearing cart:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
