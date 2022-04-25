const mongoose = require("mongoose");
const logger = require("../logger/logger");

mongoose.connect(process.env.MONGO_URL, (err) => {
  if (err) {
    logger.error("Not connected to MongoDB");
    throw err;
  }
  console.log("connected to MongoDB");
});
