const validator = require("validator");

const loginCheck = (req, res, next) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string")
    return res
      .status(400)
      .json({ title: "error", message: "Invalid credential datatype" });

  if (!validator.isEmail(email))
    return res
      .status(400)
      .json({ title: "error", message: "Invalid email address" });

  next();
};

module.exports = loginCheck;
