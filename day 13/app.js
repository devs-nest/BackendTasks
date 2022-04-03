const express = require("express");
const app = express();

require("dotenv").config();
require("./database/mongoose");

const passport = require("passport");

const PORT = process.env.PORT || 8080;

const indexRoutes = require("./routes/index");
const userRoutes = require("./routes/user");

// parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initializing passport
app.use(passport.initialize());
require("./config/passport")(passport);

// routes
app.use("/", indexRoutes);
app.use("/user", userRoutes);

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log("listening to port", PORT);
});
