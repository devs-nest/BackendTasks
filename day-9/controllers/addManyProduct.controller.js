const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addManyProduct = async (req, res) => {
  const data = req.body.data;
  try {
    const products = await prisma.product.createMany({
      data,
    });
    return res.status(201).json({
      title: "success",
      data: products,
    });
  } catch (err) {
    return res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
};

module.exports = addManyProduct;
