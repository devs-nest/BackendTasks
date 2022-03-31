const User = require("../models/User");

const logoutUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.id });

    // make token with one space to indicate that user has logged out
    user.token = " ";
    user.save();
    return res.send({ title: "success", message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({
      title: "error",
      message: "internal server error",
    });
  }
};

module.exports = logoutUser;
