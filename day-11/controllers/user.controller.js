const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
  const { name, email, password, role } = req.body;
  try {
    const salt = await bcrypt.genSalt(8);
    const hashedPassword = await bcrypt.hash(password, salt);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    res.status(201).json({
      title: "success",
      message: "new user created",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      title: "internal server error",
    });
  }
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userCount = await prisma.user.count({
      where: {
        email,
      },
    });

    if (userCount === 0)
      return res.status(400).json({
        title: "error",
        message: "user not found",
      });

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const isPasswordCorrect = bcrypt.compare(password, user.password);

    if (!isPasswordCorrect)
      return res.status.json({
        title: "error",
        message: "invalid password",
      });

    // token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        token,
      },
    });

    res.json({
      title: "success",
      token,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      title: "internal server error",
    });
  }
};
