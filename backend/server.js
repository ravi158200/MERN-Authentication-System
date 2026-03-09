require("dotenv").config();
const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log("MongoDB connection error:", err));

// Define Routes
app.use('/api/auth', require('./routes/auth'));

app.listen(5001, () => {
  console.log("Server started on port 5001");
});

