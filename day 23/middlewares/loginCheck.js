const validator = require("validator");

const loginCheck = (req, res, next) => {
  const { email, password } = req.body;

  // check if email and password is provided
  if (!email || !password)
    return res.status(400).json({
      title: "error",
      message: "Email or Password is not provided",
    });

  // check for valid email
  if (!validator.isEmail(email))
    return res.status(400).json({
      title: "error",
      message: "Invalid Email!",
    });

  next();
};

module.exports = loginCheck;
