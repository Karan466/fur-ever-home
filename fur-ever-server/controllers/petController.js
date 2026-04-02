const { ObjectId } = require("mongodb");
const connectDB = require("../config/db");

// Get all pets
const getAllPets = async (req, res) => {
  const db = await connectDB();
  const petsCollection = db.collection("pets");

  const pets = await petsCollection.find().sort({ createdAt: -1 }).toArray();
  res.send(pets);
};

// Get single pet by ID
const getPetById = async (req, res) => {
  const db = await connectDB();
  const petsCollection = db.collection("pets");

  const id = req.params.id;

  const pet = await petsCollection.findOne({
    _id: new ObjectId(id),
  });

  res.send(pet);
};

// Add new pet
const addNewPet = async (req, res) => {
  const db = await connectDB();
  const petsCollection = db.collection("pets");

  const petData = req.body;

  const result = await petsCollection.insertOne({
    ...petData,
    adopted: false,
    createdAt: new Date(),
  });

  res.send(result);
};

// Update pet
const updatePet = async (req, res) => {
  const db = await connectDB();
  const petsCollection = db.collection("pets");

  const id = req.params.id;
  const updatedPet = req.body;

  const result = await petsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updatedPet }
  );

  res.send(result);
};

// Delete pet
const deletePet = async (req, res) => {
  const db = await connectDB();
  const petsCollection = db.collection("pets");

  const id = req.params.id;

  const result = await petsCollection.deleteOne({
    _id: new ObjectId(id),
  });

  res.send(result);
};

// Get pets added by specific user
const getMyPets = async (req, res) => {
  const db = await connectDB();
  const petsCollection = db.collection("pets");

  const email = req.params.email;

  const pets = await petsCollection.find({ ownerEmail: email }).toArray();

  res.send(pets);
};

// Mark pet as adopted
const markPetAsAdopted = async (req, res) => {
  const db = await connectDB();
  const petsCollection = db.collection("pets");

  const id = req.params.id;

  const result = await petsCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { adopted: true } }
  );

  res.send(result);
};

module.exports = {
  getAllPets,
  getPetById,
  addNewPet,
  updatePet,
  deletePet,
  getMyPets,
  markPetAsAdopted,
};