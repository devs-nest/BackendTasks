const express = require("express");
const app = express();

const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");

const PORT = process.env.PORT || 8080;

require("dotenv").config();
require("./db/mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRoutes);
app.use("/user", userRoutes);

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("listening to port", PORT);
});
