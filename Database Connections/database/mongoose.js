const mongoose = require("mongoose");

// Connect to database
mongoose.connect("mongodb://localhost:27017/Users", (err) => {
  if (err) throw err;
  console.log("Connected to MongoDB");
});
