const User = require("../models/User");

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const userExists = await User.findById(id);

    if (!userExists) return res.json({ title: "User does not exist" });

    const deletedUser = await User.deleteOne({ _id: id });

    return res.json({
      title: "success",
      message: "User deleted",
      data: deletedUser,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ title: "error", message: "Internal server error" });
  }
};

module.exports = deleteUser;
