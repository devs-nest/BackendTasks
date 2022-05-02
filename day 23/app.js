const express = require("express");
const app = express();

const passport = require("passport");
const session = require("express-session");

const PORT = 8080 || process.env.PORT;

require("dotenv").config();
require("./database/mongoose");
require("./config/passport")(passport);

// parsing
app.use(express.json());

// initialize session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// route middlewares
app.use("/", require("./routes/index"));
app.use("/user", require("./routes/user"));

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`listening to port ${PORT}`);
});
