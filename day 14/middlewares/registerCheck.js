const validator = require("validator");

const registerCheck = (req, res, next) => {
  const { name, email, password, confirmPassword, role } = req.body;

  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword !== "string"
  )
    return res
      .status(400)
      .json({ title: "error", message: "Invalid credential datatype" });

  if (name.length < 3)
    return res.status(400).json({
      title: "error",
      message: "Name length must be 3 characters long",
    });

  if (!validator.isEmail(email))
    return res
      .status(400)
      .json({ title: "error", message: "Invalid Email Address" });

  if (!validator.isStrongPassword(password))
    return res.status(400).json({
      title: "error",
      message:
        "Password must be 8 characters long and should contain one lowercase and one uppercase letter, one symbol and one number",
    });

  if (password !== confirmPassword)
    return res.status(400).json({
      title: "error",
      message: "Password does not match",
    });

  if (
    role &&
    role !== "admin" &&
    role !== "super-admin" &&
    role !== "user"
  )
    return res.status(400).json({
      title: "error",
      message: "user role can be: admin, super-admin, user",
    });

  next();
};

module.exports = registerCheck;
