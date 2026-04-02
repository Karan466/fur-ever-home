const connectDB = require("../config/db");

const verifyAdmin = async (req, res, next) => {
  const db = await connectDB();
  const usersCollection = db.collection("users");

  const email = req.decoded.email;
  const user = await usersCollection.findOne({ email });

  if (!user || user.role !== "admin") {
    return res.status(403).send({ message: "Admin access only" });
  }

  next();
};

module.exports = verifyAdmin;