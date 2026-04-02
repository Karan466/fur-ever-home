const express = require("express");
const jwt = require("jsonwebtoken");
const {
  registerUser,
  getAllUsers,
  makeAdmin,
  checkAdminStatus,
} = require("../controllers/userController");
const verifyToken = require("../middleware/verifyToken");
const verifyAdmin = require("../middleware/verifyAdmin");

const router = express.Router();

// JWT Token
router.post("/jwt", (req, res) => {
  const user = req.body;

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  res.send({ token });
});

// User routes
router.post("/", registerUser);
router.get("/", verifyToken, verifyAdmin, getAllUsers);
router.patch("/admin/:id", verifyToken, verifyAdmin, makeAdmin);
router.get("/admin/:email", verifyToken, checkAdminStatus);

module.exports = router;