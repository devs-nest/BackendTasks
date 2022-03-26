const express = require("express");
const app = express();

const expressLayouts = require("express-ejs-layouts");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

require("dotenv").config();
require("./db/mongoose");
require("./config/passport")(passport);

const PORT = process.env.PORT || 8080;

const indexRouter = require("./Router/index");
const userRouter = require("./Router/user");

// view engine configration
app.use(expressLayouts);
app.set("view engine", "ejs");

// parsing and serving data
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// initializing session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// Initializing passport
app.use(passport.initialize());
app.use(passport.session());

// Inilializing flash for messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// routes 
app.use("/", indexRouter);
app.use("/user", userRouter);

app.listen(PORT, (err) => {
  if (err) return console.log(err);
  console.log(`listening to port ${PORT}`);
});
