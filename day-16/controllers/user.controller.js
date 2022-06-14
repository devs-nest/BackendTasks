const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const client = require("../database/redis");
const { sendResetPasswordMail } = require("../utils/nodemailer");

// get user data
module.exports.getAllUsers = async (_req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json({
      title: "success",
      data: users,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      title: "internal server error",
    });
  }
};

// create new user
module.exports.createNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    client.setEx(newUser.id, 20, otp);
    res.status(201).json({
      title: "success",
      data: {
        id: newUser.id,
        otp,
      },
    });
  } catch (err) {
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
};

// verify new user
module.exports.verifyUser = async (req, res) => {
  const { id, otp } = req.body;
  try {
    const userOtp = await client.get(id);

    if (!userOtp)
      return res.status(400).json({
        title: "error",
        message: "otp expired, please create a new otp",
      });

    if (userOtp !== otp) {
      return res.status(400).json({
        title: "error",
        message: "otp does not match",
      });
    }

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        active: true,
      },
    });

    client.expire(user.id, 1);

    res.json({
      title: "success",
      message: "user verified",
    });
  } catch (err) {
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
};

// generate otp for verification
module.exports.generateNewOtp = async (req, res) => {
  const id = req.params.id;
  const otp = otpGenerator.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });

  client.setEx(id, 20, otp);

  res.status(201).json({
    title: "success",
    message: `new otp is ${otp}`,
  });
};

// login existing user
module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCount = await prisma.user.count({
      where: {
        email,
      },
    });

    if (userCount === 0)
      return res.status(404).json({
        title: "error",
        message: "email not registered",
      });

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user.active === false)
      return res.status(400).json({
        title: "error",
        message: "please confirm your email address",
      });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({
        title: "error",
        message: "incorrect password",
      });

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        token: accessToken,
      },
    });

    res.json({
      title: "success",
      token: accessToken,
    });
  } catch (err) {
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
};

// send reset password link for valid email id
module.exports.initialResetPassword = async (req, res) => {
  const email = req.body.email;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user)
    return res.status(404).json({
      title: "not found",
      message: "user does not exist",
    });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

  client.setEx(user.id + "resetpasswordtoken", 300, token);

  // send email to user with link
  const link = `${process.env.BASE_URL}/user/resetpassword/${user.id}/${token}`;
  sendResetPasswordMail(link, user.email);

  res.json({
    title: "success",
    message: "reset password mail sent. check your mail.",
    link,
  });
};

// reset user's password
module.exports.resetPassword = async (req, res) => {
  const { id, token } = req.params;
  const password = req.body.password;
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user)
    return res.status(400).json({
      title: "error",
      message: "invalid link",
    });

  if ((await client.get(user.id + "resetpasswordtoken")) != token)
    return res.status(400).json({
      title: "error",
      message: "invalid link",
    });

  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);

  await prisma.user.update({
    where: { id },
    data: { password: hashedPassword },
  });
  client.expire(user.id + "resetpasswordtoken", 1);

  res.send({
    title: "success",
    message: "password updated successfully",
  });
};
