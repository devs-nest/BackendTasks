const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const updateProduct = async (req, res) => {
  const name = req.body.name;
  const id = parseInt(req.params.id);

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    res.json({
      title: "success",
      data: updatedProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
};

module.exports = updateProduct;
