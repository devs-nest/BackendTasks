const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_CONNECT_URL, (err) => {
  if (err) throw err;
  console.log("connected to db");
});

// You can use any db you're convinient with
