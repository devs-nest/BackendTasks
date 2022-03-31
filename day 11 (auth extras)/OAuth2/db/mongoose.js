const mongoose = require("mongoose");

// Connect to database
mongoose.connect(process.env.MONGO_CONNECTION_URL, (err) => {
  if (err) throw err;
  console.log("Connected to db");
});
