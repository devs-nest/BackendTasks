const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const deleteProduct = async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });
    res.json({
      title: "success",
      data: deletedProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
};

module.exports = deleteProduct;
