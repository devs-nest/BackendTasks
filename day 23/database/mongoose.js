const mongoose = require("mongoose");

// connect to database
mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) throw err;
  console.log("connnected to db");
});
