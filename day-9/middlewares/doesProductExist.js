const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const doesProductExist = async (req, res, next) => {
  const id = parseInt(req.params.id);

  const productCount = await prisma.product.count({
    where: {
      id,
    },
  });

  if (productCount == 0) {
    return res.status(400).json({
      title: "error",
      message: "product does not exist",
    });
  }

  next();
};

module.exports = doesProductExist;
