const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email: email.toLowerCase() });

    // check if user exists
    if (userExists)
      return res
        .status(400)
        .json({ title: "error", message: "Email already exists" });

    // hash password
    const salt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      email: email.toLowerCase(),
      password: hashPassword,
    });

    await newUser.save();

    res.status(201).json({ title: "success", data: newUser });
  } catch (err) {
    res.status(500).json({
      title: "error",
      message: "Internal server error",
    });
  }
};

module.exports = registerUser;
