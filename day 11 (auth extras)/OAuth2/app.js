const express = require("express");
const app = express();

require("dotenv").config();
require("./config/passport");
require("./db/mongoose");

const expressLayouts = require("express-ejs-layouts");
const cookieSession = require("cookie-session");
const passport = require("passport");

const indexRouter = require("./routers/index");
const userRouter = require("./routers/auth");

const PORT = process.env.PORT || 8080;

// Set view engine as ejs
app.use(expressLayouts);
app.set("view engine", "ejs");

// set timer and encrypt cookie
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

// parsing and serving directory
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

// routes
app.use("/", indexRouter);
app.use("/auth", userRouter);

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log("listening to Port", PORT);
});
