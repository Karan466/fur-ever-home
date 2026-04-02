const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

const connectDB = async () => {
  try {
    if (!db) {
      await client.connect();
      db = client.db("furEverHomeDB");
      console.log("✅ MongoDB Connected Successfully");
    }
    return db;
  } catch (error) {
    console.error("Database Connection Error:", error);
  }
};

module.exports = connectDB;