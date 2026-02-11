const express = require("express");
const router = express.Router();
const {
  getAllFoodItems,
  getFoodByCategory,
  getFoodItem,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem,
} = require("../controllers/foodController");
const { isAdmin, verifyToken } = require("../middleware/auth");

// Public routes
router.get(
  "/",
  (req, res, next) => {
    console.log("📍 [foodRoutes] GET /food - Public route");
    next();
  },
  getAllFoodItems,
);

router.get(
  "/:id",
  (req, res, next) => {
    console.log(`📍 [foodRoutes] GET /food/:id (${req.params.id})`);
    next();
  },
  getFoodItem,
);

router.get(
  "/category/:category",
  (req, res, next) => {
    console.log(
      `📍 [foodRoutes] GET /food/category/:category (${req.params.category})`,
    );
    next();
  },
  getFoodByCategory,
);

// Admin routes
router.post(
  "/",
  (req, res, next) => {
    console.log("📍 [foodRoutes] POST /food - Admin only");
    next();
  },
  verifyToken,
  isAdmin,
  createFoodItem,
);

router.patch(
  "/:id",
  (req, res, next) => {
    console.log(
      `📍 [foodRoutes] PATCH /food/:id (${req.params.id}) - Admin only`,
    );
    next();
  },
  verifyToken,
  isAdmin,
  updateFoodItem,
);

router.delete(
  "/:id",
  (req, res, next) => {
    console.log(
      `📍 [foodRoutes] DELETE /food/:id (${req.params.id}) - Admin only`,
    );
    next();
  },
  verifyToken,
  isAdmin,
  deleteFoodItem,
);

module.exports = router;
