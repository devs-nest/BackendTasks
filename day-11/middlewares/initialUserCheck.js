const { isValidPassword, isValidEmail } = require("../utils/validations");

module.exports = (req, res, next) => {
  const { name, email, password, role } = req.body;

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

  if (typeof role !== "undefined" && role !== "admin" && role !== "super-admin")
    return res.status(400).json({
      title: "error",
      message: "invalid role",
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
