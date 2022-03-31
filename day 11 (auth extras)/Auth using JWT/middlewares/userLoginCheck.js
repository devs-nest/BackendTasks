const { checkEmail } = require("../utils/validation");

const userLoginCheck = (req, res, next) => {
  const { email, password } = req.body;

  // check if all credentials are of string type
  if (typeof email !== "string" || typeof password !== "string")
    return res
      .status(400)
      .json({ title: "error", message: "Invalid credentials datatype" });

  // check if the email is valid
  if (!checkEmail(email))
    return res
      .status(400)
      .json({ title: "error", message: "Enter a valid email address" });

  next();
};

module.exports = userLoginCheck;
