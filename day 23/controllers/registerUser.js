const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../config/nodemailer");

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(8);
    const hashPassword = await bcrypt.hash(password, salt);

    // generate confirmation code to send email
    const confirmationCode = jwt.sign({ email }, process.env.JWT_SECRET);

    const user = new User({
      email,
      password: hashPassword,
      confirmationCode,
    });

    await user.save();

    // send verification email
    sendVerificationEmail(email, confirmationCode);

    res.status(201).json({
      title: "success",
      message: "New User Added! Please Verify using link sent to email",
    });
  } catch (err) {
    res.status(500).json({
      title: "error",
      message: "internal server error",
    });
  }
};

module.exports = registerUser;
