const mongoose = require("mongoose");

// Connect to database
mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) throw err;
  console.log("Connected to MongoDB");
});
