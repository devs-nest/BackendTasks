const { isValidEmail } = require("../utils/validations");

module.exports = (req, res, next) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string")
    return res.status(400).json({
      title: "error",
      message: "email and password is required",
    });

  if (!isValidEmail(email))
    return res.status(400).json({
      title: "error",
      message: "please provide valid email",
    });

  next();
};
