const { ObjectId } = require("mongodb");
const connectDB = require("../config/db");

// Create adoption request
const createAdoptionRequest = async (req, res) => {
  const db = await connectDB();
  const adoptionCollection = db.collection("adoptionRequests");

  const adoptionData = req.body;

  const result = await adoptionCollection.insertOne({
    ...adoptionData,
    status: "pending",
    createdAt: new Date(),
  });

  res.send(result);
};

// Get all adoption requests for pet owner
const getAdoptionsByOwnerEmail = async (req, res) => {
  const db = await connectDB();
  const adoptionCollection = db.collection("adoptionRequests");

  const email = req.params.email;

  const requests = await adoptionCollection
    .find({ petOwnerEmail: email })
    .toArray();

  res.send(requests);
};

// Update adoption request status
const updateAdoptionStatus = async (req, res) => {
  const db = await connectDB();
  const adoptionCollection = db.collection("adoptionRequests");

  const id = req.params.id;
  const { status } = req.body;

  const result = await adoptionCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { status } }
  );

  res.send(result);
};

module.exports = {
  createAdoptionRequest,
  getAdoptionsByOwnerEmail,
  updateAdoptionStatus,
};