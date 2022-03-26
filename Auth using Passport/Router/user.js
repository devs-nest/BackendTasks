const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/User");
const passport = require("passport");

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

// login for post request
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/user/login",
    failureFlash: true,
  })(req, res, next);
});

router.get("/register", (req, res) => {
  res.render("register.ejs");
});

router.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  const errors = [];

  // Registration checks
  if (!username || !password || !confirmPassword)
    errors.push({ msg: "Please fill all the fields" });

  if (password !== confirmPassword)
    errors.push({ msg: "Password do not match" });

  if (password.length < 6)
    errors.push({ msg: "Password should be at least 6 characters" });

  if (errors.length > 0) {
    return res.render("register", {
      errors,
    });
  }

  try {
    const isExistingUser = await User.findOne({ username });

    // If user is already register, render register page
    if (isExistingUser) {
      errors.push({ msg: "Username already registered" });
      return res.render("register", { errors });
    }

    // hash password and save user to database
    const hash = await bcrypt.hash(password, 8);

    const user = new User({
      username,
      password: hash,
    });

    await user.save();

    req.flash("success_msg", "You are now Registered");
    res.redirect("/user/login");
  } catch (err) {
    res.status(500).json({
      title: "error",
      message: err.message,
    });
  }
});

router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success_msg", "You are logged Out");
  res.redirect("/user/login");
});

module.exports = router;
