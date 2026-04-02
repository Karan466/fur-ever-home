const { ObjectId } = require("mongodb");
const connectDB = require("../config/db");

// Register user
const registerUser = async (req, res) => {
  const db = await connectDB();
  const usersCollection = db.collection("users");

  const user = req.body;

  const existingUser = await usersCollection.findOne({ email: user.email });

  if (existingUser) {
    return res.send({ message: "User already exists" });
  }

  const result = await usersCollection.insertOne({
    ...user,
    role: "user",
    createdAt: new Date(),
  });

  res.send(result);
};

// Get all users
const getAllUsers = async (req, res) => {
  const db = await connectDB();
  const usersCollection = db.collection("users");

  const users = await usersCollection.find().toArray();
  res.send(users);
};

// Make admin
const makeAdmin = async (req, res) => {
  const db = await connectDB();
  const usersCollection = db.collection("users");

  const id = req.params.id;

  const result = await usersCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { role: "admin" } }
  );

  res.send(result);
};

// Check admin status
const checkAdminStatus = async (req, res) => {
  const db = await connectDB();
  const usersCollection = db.collection("users");

  const email = req.params.email;

  if (email !== req.decoded.email) {
    return res.status(403).send({ admin: false });
  }

  const user = await usersCollection.findOne({ email });

  res.send({ admin: user?.role === "admin" });
};

module.exports = {
  registerUser,
  getAllUsers,
  makeAdmin,
  checkAdminStatus,
};