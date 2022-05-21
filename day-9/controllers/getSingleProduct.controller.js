const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getSingleProduct = async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  res.send(product);
};

module.exports = getSingleProduct;
