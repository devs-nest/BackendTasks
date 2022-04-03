const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });

    if (!userExists)
      return res
        .status(400)
        .json({ title: "error", message: "Email not registered" });

    const isPasswordCorrect = bcrypt.compare(password, userExists.password);

    if (!isPasswordCorrect)
      return res
        .status(400)
        .json({ title: "error", message: "invalid password" });

    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    userExists.token = token;
    await userExists.save();

    return res.json({ title: "logged In", data: token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      title: "error",
      message: "internal server error",
    });
  }
};

module.exports = loginUser;
