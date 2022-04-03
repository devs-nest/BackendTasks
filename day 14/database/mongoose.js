const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) throw err;
  console.log("Connected to mongo");
});
