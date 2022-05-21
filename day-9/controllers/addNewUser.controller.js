const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

const addNewUser = async (req, res) => {
  const { username, password } = req.body;

  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json({
      title: "success",
      data: user,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
};

module.exports = addNewUser;
