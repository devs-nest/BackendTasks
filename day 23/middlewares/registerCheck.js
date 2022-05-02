const validator = require("validator");

const registerCheck = (req, res, next) => {
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

  // check for strong password
  if (!validator.isStrongPassword(password))
    return res.status(400).json({
      title: "error",
      message:
        "Password should contain minimum 1 lowercase, 1 uppercase, 1 number and 1 symbol. The length should be greater than 8",
    });

  next();
};

module.exports = registerCheck;
