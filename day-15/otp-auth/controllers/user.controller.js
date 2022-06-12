const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");

const client = require("../database/redis");

module.exports.getAllUsers = async (req, res) => {
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

module.exports.createNewUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // hash password
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    // generate otp
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    // save user in db
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
    console.log(err.message);
    res.status(500).json({
      title: "internal server error",
    });
  }
};

// verify the otp of the user
module.exports.verifyUser = async (req, res) => {
  const { id, otp } = req.body;
  try {
    // verify otp
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

    // make user active
    await prisma.user.update({
      where: {
        id,
      },
      data: {
        active: true,
      },
    });

    res.json({
      title: "success",
      message: "user verified",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      title: "internal server error",
    });
  }
};

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

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCount = await prisma.user.count({
      where: {
        email,
      },
    });

    // user existence check
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

    // check if user has confirmed their email
    if (user.active === false)
      return res.status(400).json({
        title: "error",
        message: "please confirm your email address",
      });

    // check if password is correct
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status(400).json({
        title: "error",
        message: "incorrect password",
      });

    // sign a jwt token for 24h
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
    console.log(err.message);
    res.status(500).json({
      title: "internal server error",
    });
  }
};
