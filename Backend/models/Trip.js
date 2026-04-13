const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  username: String,
  destination: String,
  total_budget: Number,
  breakdown: Object,
  comfort: String,
  instagram_spots: Array
});

module.exports = mongoose.model("Trip", tripSchema);
