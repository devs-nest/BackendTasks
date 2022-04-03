const User = require("../models/User");

const logoutUser = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.user._id });
    user.token = " ";
    await user.save();
    return res.json({ title: "success", message: "Logged out" });
  } catch (err) {
    return res
      .status(500)
      .json({ title: "error", message: "internal server error" });
  }
};

module.exports = logoutUser;
