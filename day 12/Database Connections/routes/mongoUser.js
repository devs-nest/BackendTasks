const router = require("express").Router();

// User Model by MongoDB
const User = require("../models/UserMongo");

// Saving and Retrieving data from mongoDB server

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    const userExists = await User.findOne({ username });

    if (userExists)
      return res.status(400).json({
        message: "Username already in use",
      });

    if (password.length < 8)
      return res.status(400).json({
        message: "Password length must be greater than 8",
      });

    const newUser = new User({ username, password });

    await newUser.save();

    res.status(201).send("User Registered!");
  } catch (err) {
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
