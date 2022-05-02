const User = require("../model/User");

const verifyUser = async (req, res) => {
  // find user with given unique confirmation code
  const user = await User.findOne({
    confirmationCode: req.params.confirmationCode,
  });

  // check if user exists
  if (!user)
    return res.status(404).json({
      title: "not found",
      message: "user does not exist",
    });

  // make user status active
  user.status = "Active";
  await user.save();

  return res.json({
    title: "success",
    message: "user verified",
  });
};

module.exports = verifyUser;
