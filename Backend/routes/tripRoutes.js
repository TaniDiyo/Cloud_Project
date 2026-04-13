const express = require("express");
const router = express.Router();
const Trip = require("../models/Trip");

// Save Trip
router.post("/add", async (req, res) => {
  const trip = new Trip(req.body);
  await trip.save();

  res.json({ message: "Trip saved" });
});

// Get Trips
router.get("/:username", async (req, res) => {
  const trips = await Trip.find({ username: req.params.username });
  res.json(trips);
});

module.exports = router;
