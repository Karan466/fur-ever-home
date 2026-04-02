const { ObjectId } = require("mongodb");
const crypto = require("crypto");
const connectDB = require("../config/db");
const razorpay = require("../config/razorpay");

// Get all campaigns
const getAllCampaigns = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("campaigns");

    const result = await collection.find().sort({ createdAt: -1 }).toArray();
    res.send(result);
  } catch (error) {
    console.log("GET ALL CAMPAIGNS ERROR:", error);
    res.status(500).send({ message: "Failed to fetch campaigns" });
  }
};

// Get campaign by ID
const getCampaignById = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("campaigns");

    const id = req.params.id;
    const result = await collection.findOne({ _id: new ObjectId(id) });
    res.send(result);
  } catch (error) {
    console.log("GET CAMPAIGN BY ID ERROR:", error);
    res.status(500).send({ message: "Failed to fetch campaign" });
  }
};

// Create campaign
const createCampaign = async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection("campaigns");

    const campaignData = req.body;
    const result = await collection.insertOne(campaignData);
    res.send(result);
  } catch (error) {
    console.log("CREATE CAMPAIGN ERROR:", error);
    res.status(500).send({ message: "Failed to create campaign" });
  }
};

// Create Razorpay order
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, campaignId } = req.body;

    console.log("CREATE ORDER HIT");
    console.log("Amount:", amount);
    console.log("Campaign ID:", campaignId);
    console.log("RAZORPAY_KEY_ID:", process.env.RAZORPAY_KEY_ID);
    console.log("RAZORPAY_KEY_SECRET exists:", !!process.env.RAZORPAY_KEY_SECRET);

    if (!amount || Number(amount) <= 0) {
      return res.status(400).send({ message: "Invalid amount" });
    }

    const options = {
      amount: Number(amount) * 100, // paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`, // keep under 40 chars
    };

    console.log("Creating Razorpay order with:", options);

    const order = await razorpay.orders.create(options);

    console.log("ORDER CREATED SUCCESSFULLY:", order);

    res.send(order);
  } catch (error) {
    console.log("RAZORPAY ORDER ERROR FULL:", error);
    console.log("RAZORPAY ORDER ERROR MESSAGE:", error.message);
    res.status(500).send({
      message: "Failed to create payment order",
      error: error.message,
    });
  }
};

// Verify payment
const verifyRazorpayPayment = async (req, res) => {
  try {
    const db = await connectDB();
    const campaignCollection = db.collection("campaigns");
    const donationCollection = db.collection("donations");

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      campaignId,
      donorName,
      donorEmail,
      amount,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).send({ message: "Payment verification failed" });
    }

    const campaign = await campaignCollection.findOne({
      _id: new ObjectId(campaignId),
    });

    if (!campaign) {
      return res.status(404).send({ message: "Campaign not found" });
    }

    const newDonatedAmount = (campaign.donatedAmount || 0) + Number(amount);

    await campaignCollection.updateOne(
      { _id: new ObjectId(campaignId) },
      { $set: { donatedAmount: newDonatedAmount } }
    );

    await donationCollection.insertOne({
      campaignId,
      donorName,
      donorEmail,
      amount: Number(amount),
      razorpay_order_id,
      razorpay_payment_id,
      createdAt: new Date(),
    });

    res.send({
      success: true,
      donatedAmount: newDonatedAmount,
    });
  } catch (error) {
    console.log("VERIFY PAYMENT ERROR:", error);
    res.status(500).send({ message: "Payment verification failed" });
  }
};

// Get my donations (with campaign title)
const getMyDonations = async (req, res) => {
  try {
    const db = await connectDB();
    const donationCollection = db.collection("donations");

    const email = req.params.email;

    const result = await donationCollection
      .aggregate([
        { $match: { donorEmail: email } },
        {
          $addFields: {
            campaignObjectId: { $toObjectId: "$campaignId" },
          },
        },
        {
          $lookup: {
            from: "campaigns",
            localField: "campaignObjectId",
            foreignField: "_id",
            as: "campaign",
          },
        },
        {
          $unwind: {
            path: "$campaign",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $project: {
            amount: 1,
            donorEmail: 1,
            razorpay_payment_id: 1,
            createdAt: 1,
            campaignTitle: "$campaign.title",
          },
        },
        { $sort: { createdAt: -1 } },
      ])
      .toArray();

    res.send(result);
  } catch (error) {
    console.log("GET MY DONATIONS ERROR:", error);
    res.status(500).send({ message: "Failed to fetch donations" });
  }
};

module.exports = {
  getAllCampaigns,
  getCampaignById,
  createCampaign,
  createRazorpayOrder,
  verifyRazorpayPayment,
  getMyDonations,
};