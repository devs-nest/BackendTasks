const { checkEmail, checkPassword, checkName } = require("../utils/validation");

const userRegisterCheck = (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  //   check if the datatype of inputs are strings
  if (
    typeof name !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof confirmPassword != "string"
  )
    return res
      .status(400)
      .json({ title: "error", message: "Invalid datatype of Credentials" });

  // check for valid name
  if (!checkName(name))
    return res.status(400).json({
      title: "error",
      message: "Name must be 3 characters long",
    });

  //   check for valid email
  if (!checkEmail(email))
    return res
      .status(400)
      .json({ title: "error", message: "Enter a valid email address" });

  //   check for valid password
  if (!checkPassword(password))
    return res.status(400).json({
      title: "error",
      message:
        "Password must be minimum 8 characters, and should contain atleast one alphabet and number",
    });

  if (password !== confirmPassword)
    return res.status(400).json({
      title: "error",
      message: "Password does not match",
    });

  // If all check passes, then continues
  next();
};

module.exports = userRegisterCheck;
