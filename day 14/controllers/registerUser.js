const User = require("../models/User");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email: email.toLowerCase() });

    if (userExists)
      return res
        .status(400)
        .json({ title: "error", message: "Email already registered" });

    const salt = bcrypt.genSaltSync(8);
    const hashPassword = bcrypt.hashSync(password, salt);

    const newUser = User({
      name,
      email: email.toLowerCase(),
      password: hashPassword,
      role,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({ title: "success", data: savedUser });
  } catch (err) {
    return res
      .status(500)
      .json({ title: "error", message: "internal server error" });
  }
};

module.exports = registerUser;
