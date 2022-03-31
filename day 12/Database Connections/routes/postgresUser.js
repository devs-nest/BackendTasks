const router = require("express").Router();

// User Model by Sequelize for Postgres
const User = require("../models/UserPost");

// Saving and retrieving data from Postgres server db

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/", async (req, res) => {
  const { name, age } = req.body;

  if (!name)
    return res.status(400).json({
      message: "Please provide name",
    });

  if (!age)
    return res.status(400).json({
      message: "Please provide age",
    });

  try {
    const isAlreadyExisting = await User.findOne({ where: { name } });

    console.log(isAlreadyExisting);

    if (isAlreadyExisting)
      return res.status(400).json({
        message: "User with the given name already exists",
      });

    const newUser = new User({ name, age });

    await newUser.save();

    res.status(201).send("User registered!");
  } catch (err) {
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = router;
