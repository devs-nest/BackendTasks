const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// baseurl/route?key=value
const getAllProducts = async (req, res) => {
  const skip = parseInt(req.query.skip) || 0;
  const limit = parseInt(req.query.limit) || 5;

  const name = req.query.name;
  const price = req.query.price;

  const orderBy = {
    name,
    price,
  };

  try {
    const products = await prisma.product.findMany({
      // skip: skip * 5,
      take: limit,
      cursor: {
        id: 45,
      },
      orderBy,
    });
    res.json({
      title: "success",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
};

module.exports = getAllProducts;
