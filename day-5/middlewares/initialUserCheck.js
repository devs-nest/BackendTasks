const validator = require("validator");

const initialUserCheck = (req, res, next) => {
  const { username, password } = req.body;

  if (typeof username !== "string" || typeof password !== "string")
    return res.status(400).json({
      title: "error",
      message: "username and password cannot be null",
    });

  if (username.length < 5)
    return res.status(400).json({
      title: "error",
      message: "length of username cannot be less than 5",
    });

  if (!validator.isStrongPassword(password))
    return res.status(400).json({
      title: "error",
      message: "password should contain....",
    });

  next();
};

// uppercase, lowercase, symbol, numbers
// 1. validator, 2. regex

module.exports = initialUserCheck;
