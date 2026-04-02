const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGO_URI;

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
      console.log("✅ MongoDB connected successfully");
    }
    return db;
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
    throw error;
  }
};

module.exports = connectDB;