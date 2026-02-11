const express = require("express");
const router = express.Router();

// Payment initiation
router.post("/initiate", async (req, res) => {
  const { amount, phone, orderId, orderType } = req.body;

  try {
    // TODO: Integrate with MoMo Pay API
    // This is a placeholder - replace with actual MoMo Pay integration

    res.json({
      success: true,
      message: "Payment initiated",
      transactionId: `TXN-${Date.now()}`,
      amount,
      phone,
      status: "pending",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Verify payment
router.post("/verify", async (req, res) => {
  const { transactionId } = req.body;

  try {
    // TODO: Verify payment with MoMo Pay API
    res.json({
      success: true,
      status: "completed",
      transactionId,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
