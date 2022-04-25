const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

require("dotenv").config();
require("./database/mongoose");

app.use(express.json());

// routes
app.use("/", require("./routes/index"));
app.use("/movie", require("./routes/movie"));

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`listening to port ${PORT}`);
});
