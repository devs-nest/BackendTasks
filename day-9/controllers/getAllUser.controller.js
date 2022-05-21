const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllUser = async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      include: {
        product: true,
      },
    });
    res.json({
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

module.exports = getAllUser;
