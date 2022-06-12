const { isValidPassword, isValidEmail } = require("../utils/validations");

module.exports = (req, res, next) => {
  const { name, email, password } = req.body;

  // checks if all the required fields are provided
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  )
    return res.status(400).json({
      title: "error",
      message: "name, email and password is required",
    });

  if (!isValidEmail(email))
    return res.status(400).json({
      title: "error",
      message: "invalid email",
    });

  if (!isValidPassword(password))
    return res.status(400).json({
      title: "error",
      message:
        "password length must be greater than or equal to 8 and should be alphanumeric",
    });

  next();
};
