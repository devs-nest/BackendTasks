const router = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const logger = require("../logger/index");

router.get("/", async (_req, res) => {
  try {
    const books = await prisma.book.findMany();
    logger.info("Fetched Books Data");
    res.json({
      title: "success",
      message: books,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

router.post("/", async (req, res) => {
  const { name, price } = req.body;
  try {
    await prisma.book.create({
      data: {
        name,
        price: parseInt(price),
      },
    });
    logger.info("new book saved");
    res.status(201).json({
      title: "success",
      message: "book created",
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

module.exports = router;
