const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors({
  origin: "*",  
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/trips", require("./routes/tripRoutes"));

console.log("MONGO_URI:", process.env.MONGO_URI);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => console.log("DB Error:", err));