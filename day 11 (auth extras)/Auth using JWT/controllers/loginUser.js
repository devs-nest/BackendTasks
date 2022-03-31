const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// The JWT token is used as bearer token to let system know that user has signed in.
// use the token while accessing the private routes

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        title: "not found",
        message: "User with given email not found",
      });

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword)
      return res.status(401).json({
        title: "login failed",
        message: "Incorrect password",
      });

    //   if validation is successful, sign a token and return it
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: 86400,
    });

    // change user token with token that we have generated to indicate we have logged in
    user.token = token;
    await user.save();

    res.json({ title: "success", data: token });
  } catch (err) {
    res.status(500).json({ title: "error", message: "internal server error" });
  }
};

module.exports = loginUser;
