const mongoose = require("mongoose");
const homeSchema = new mongoose.Schema({
  houseName: { type: String, required: true },
  houseLocation: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
  imageUrl: String,
  description: String,
  houseRules: String,
});

module.exports = mongoose.model("Home", homeSchema);
