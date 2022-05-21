const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addNewProduct = async (req, res) => {
  const { name, price, userId } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name: name,
        price: parseInt(price),
        userId: parseInt(userId),
      },
    });

    res.status(201).json({
      title: "success",
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
};

module.exports = addNewProduct;
