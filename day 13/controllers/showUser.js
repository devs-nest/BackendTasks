const User = require("../models/User");

const showUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ title: "success", data: users });
  } catch (err) {
    res.status(500).json({ title: "error", message: "internal server error" });
  }
};

module.exports = showUser;
