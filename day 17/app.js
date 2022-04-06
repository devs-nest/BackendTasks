const express = require("express");
const app = express();

const PORT = process.env.PORT || 8080;

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/razor", require("./routes/razor"));

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log("listening to port", PORT);
});
