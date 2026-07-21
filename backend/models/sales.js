const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  orderId: String,
  customer: String,
  product: String,
  category: String,
  region: String,
  quantity: Number,
  revenue: Number,
  date: Date,
});

module.exports = mongoose.model(
  "Sales",
  salesSchema
);