const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getSingleUser = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
      },
    });

    res.json({
      title: "success",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
};

module.exports = getSingleUser;
