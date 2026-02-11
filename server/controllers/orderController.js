const FoodOrder = require("../models/FoodOrder");
const FoodItem = require("../models/FoodItem");

// Create order
exports.createOrder = async (req, res) => {
  try {
    const {
      items,
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      totalPrice,
    } = req.body;

    // Validate required fields
    if (!items || !customerName || !customerPhone || !totalPrice) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: items, customerName, customerPhone, totalPrice",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Items must be a non-empty array" });
    }

    // Validate items exist (optional - skip if no valid foodItemId)
    for (let item of items) {
      if (item.foodItemId && item.foodItemId !== `food-${Math.random()}`) {
        try {
          const foodItem = await FoodItem.findById(item.foodItemId);
          if (!foodItem) {
            console.warn(
              `⚠️ Food item ${item.foodItemId} not found in database, but continuing...`,
            );
          }
        } catch (err) {
          console.warn(
            `⚠️ Could not validate food item ${item.foodItemId}:`,
            err.message,
          );
        }
      }
    }

    const orderId = `ORD-${Date.now()}`;
    const order = new FoodOrder({
      orderId,
      items,
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress: deliveryAddress || "Not specified",
      totalPrice,
    });

    const newOrder = await order.save();
    res.status(201).json({
      success: true,
      data: newOrder,
      message: "Order created successfully",
    });
  } catch (error) {
    console.error("❌ Error creating order:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await FoodOrder.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get order by ID
exports.getOrder = async (req, res) => {
  try {
    const order = await FoodOrder.findById(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    res.json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update order status
exports.updateOrder = async (req, res) => {
  try {
    const order = await FoodOrder.findById(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    Object.assign(order, req.body);
    order.updatedAt = Date.now();
    const updated = await order.save();
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Cancel order
exports.cancelOrder = async (req, res) => {
  try {
    const order = await FoodOrder.findById(req.params.id);
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });

    order.orderStatus = "cancelled";
    order.updatedAt = Date.now();
    await order.save();

    res.json({
      success: true,
      data: order,
      message: "Order cancelled successfully",
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all orders (Admin only)
exports.getAllOrdersAdmin = async (req, res) => {
  try {
    const orders = await FoodOrder.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: orders,
      count: orders.length,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
