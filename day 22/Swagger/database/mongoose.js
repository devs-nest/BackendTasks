const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) throw new err();
  console.log("connected to db");
});
