const express = require("express");
const {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  createRazorpayOrder,
  verifyRazorpayPayment,
  getMyDonations,
} = require("../controllers/campaignController");

const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Public routes
router.get("/", getAllCampaigns);

// Put this ABOVE "/:id"
router.get("/donations/my/:email", verifyToken, getMyDonations);

router.get("/:id", getCampaignById);

// Protected routes
router.post("/", verifyToken, createCampaign);

// Razorpay payment routes
router.post("/create-order", verifyToken, createRazorpayOrder);
router.post("/verify-payment", verifyToken, verifyRazorpayPayment);

module.exports = router;