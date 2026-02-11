const FoodItem = require("../models/FoodItem");

// Get all food items
exports.getAllFoodItems = async (req, res) => {
  try {
    console.log(
      "🔄 [foodController] getAllFoodItems - Fetching in-stock items from DB",
    );
    const items = await FoodItem.find({ inStock: true });
    console.log(
      `✅ [foodController] Found ${items.length} in-stock food items`,
    );
    res.json({
      success: true,
      data: items,
      count: items.length,
    });
  } catch (error) {
    console.error(
      `❌ [foodController] Error in getAllFoodItems:`,
      error.message,
    );
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get food by category
exports.getFoodByCategory = async (req, res) => {
  try {
    console.log(
      `🔄 [foodController] getFoodByCategory - Category: ${req.params.category}`,
    );
    const items = await FoodItem.find({
      category: req.params.category,
      inStock: true,
    });
    console.log(
      `✅ [foodController] Found ${items.length} items in category: ${req.params.category}`,
    );
    res.json({ success: true, data: items, count: items.length });
  } catch (error) {
    console.error(
      `❌ [foodController] Error in getFoodByCategory:`,
      error.message,
    );
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get single food item
exports.getFoodItem = async (req, res) => {
  try {
    const item = await FoodItem.findById(req.params.id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    res.json({ success: true, data: item });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Create food item (admin only)
exports.createFoodItem = async (req, res) => {
  try {
    const item = new FoodItem(req.body);
    const newItem = await item.save();
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update food item (admin only)
exports.updateFoodItem = async (req, res) => {
  try {
    const item = await FoodItem.findById(req.params.id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });

    Object.assign(item, req.body);
    item.updatedAt = Date.now();
    const updated = await item.save();
    res.json({ success: true, data: updated });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete food item (admin only)
exports.deleteFoodItem = async (req, res) => {
  try {
    const item = await FoodItem.findByIdAndDelete(req.params.id);
    if (!item)
      return res
        .status(404)
        .json({ success: false, message: "Food item not found" });
    res.json({ success: true, message: "Food item deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
