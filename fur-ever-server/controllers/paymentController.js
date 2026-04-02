const { ObjectId } = require("mongodb");
const connectDB = require("../config/db");
const stripe = require("../utils/stripe");

// Create payment intent
const createPaymentIntent = async (req, res) => {
  const { amount } = req.body;

  const amountInCents = parseInt(amount * 100);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: "usd",
    payment_method_types: ["card"],
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

// Save payment and update campaign
const savePayment = async (req, res) => {
  const db = await connectDB();

  const paymentsCollection = db.collection("payments");
  const campaignCollection = db.collection("donationCampaigns");

  const paymentData = req.body;

  const result = await paymentsCollection.insertOne({
    ...paymentData,
    createdAt: new Date(),
  });

  // Increase donation amount
  await campaignCollection.updateOne(
    { _id: new ObjectId(paymentData.campaignId) },
    { $inc: { donatedAmount: paymentData.amount } }
  );

  res.send(result);
};

// Get payments by user email
const getPaymentsByEmail = async (req, res) => {
  const db = await connectDB();
  const paymentsCollection = db.collection("payments");

  const email = req.params.email;

  const payments = await paymentsCollection
    .find({ donorEmail: email })
    .toArray();

  res.send(payments);
};

module.exports = {
  createPaymentIntent,
  savePayment,
  getPaymentsByEmail,
};