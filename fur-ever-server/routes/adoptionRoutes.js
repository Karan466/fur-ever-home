const express = require("express");
const {
  createAdoptionRequest,
  getAdoptionsByOwnerEmail,
  updateAdoptionStatus,
} = require("../controllers/adoptionController");

const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Create adoption request
router.post("/", verifyToken, createAdoptionRequest);

// Get requests for pet owner
router.get("/owner/:email", verifyToken, getAdoptionsByOwnerEmail);

// Update adoption request status
router.patch("/:id", verifyToken, updateAdoptionStatus);

module.exports = router;