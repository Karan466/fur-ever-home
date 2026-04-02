const express = require("express");
const {
  createPaymentIntent,
  savePayment,
  getPaymentsByEmail,
} = require("../controllers/paymentController");

const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Create Stripe payment intent
router.post("/create-payment-intent", verifyToken, createPaymentIntent);

// Save payment
router.post("/", verifyToken, savePayment);

// Get user payment history
router.get("/:email", verifyToken, getPaymentsByEmail);

module.exports = router;