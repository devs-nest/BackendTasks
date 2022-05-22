const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// checks if email is already registered or not
module.exports = async (req, res, next) => {
  const email = req.body.email;

  try {
    const userCount = await prisma.user.count({
      where: {
        email,
      },
    });

    if (userCount > 0) {
      return res.status(400).json({
        title: "error",
        message: "email already registered",
      });
    }

    next();
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      title: "internal server error",
    });
  }
};
