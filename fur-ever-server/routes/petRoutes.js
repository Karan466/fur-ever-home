const express = require("express");
const {
  getAllPets,
  getPetById,
  addNewPet,
  updatePet,
  deletePet,
  getMyPets,
  markPetAsAdopted,
} = require("../controllers/petController");

const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Public routes
router.get("/", getAllPets);
router.get("/my/:email", verifyToken, getMyPets);
router.get("/:id", getPetById);

// Private routes
router.post("/", verifyToken, addNewPet);
router.patch("/:id", verifyToken, updatePet);
router.delete("/:id", verifyToken, deletePet);
router.patch("/adopt/:id", verifyToken, markPetAsAdopted);

module.exports = router;