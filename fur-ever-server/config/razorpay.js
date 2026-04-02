const Razorpay = require("razorpay");

console.log("Razorpay config loading...");
console.log("KEY ID exists:", !!process.env.RAZORPAY_KEY_ID);
console.log("KEY SECRET exists:", !!process.env.RAZORPAY_KEY_SECRET);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

module.exports = razorpay;