const express = require("express");
const router = express.Router();
const {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
} = require("../controllers/roomController");
const { isAdmin, verifyToken } = require("../middleware/auth");

// Public routes
router.get(
  "/",
  (req, res, next) => {
    console.log("📍 [roomRoutes] GET /rooms - Public route");
    next();
  },
  getAllRooms,
);

router.get(
  "/:id",
  (req, res, next) => {
    console.log(`📍 [roomRoutes] GET /rooms/:id (${req.params.id})`);
    next();
  },
  getRoomById,
);

// Admin routes
router.post(
  "/",
  (req, res, next) => {
    console.log("📍 [roomRoutes] POST /rooms - Admin only");
    next();
  },
  verifyToken,
  isAdmin,
  createRoom,
);

router.patch(
  "/:id",
  (req, res, next) => {
    console.log(
      `📍 [roomRoutes] PATCH /rooms/:id (${req.params.id}) - Admin only`,
    );
    next();
  },
  verifyToken,
  isAdmin,
  updateRoom,
);

router.delete(
  "/:id",
  (req, res, next) => {
    console.log(
      `📍 [roomRoutes] DELETE /rooms/:id (${req.params.id}) - Admin only`,
    );
    next();
  },
  verifyToken,
  isAdmin,
  deleteRoom,
);

module.exports = router;
