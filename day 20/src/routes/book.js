const router = require("express").Router();
const Book = require("../model/Book");
const logger = require("../logger/logger");

// get book data
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});

    logger.info("fetched books");

    return res.json({
      title: "success",
      data: books,
    });
  } catch (err) {
    logger.error(err.message);

    return res.status(500).json({
      title: "error",
      message: "internal server error",
    });
  }
});

// save new book
router.post("/", async (req, res) => {
  const { name, author } = req.body;

  try {
    const book = Book({ name, author });

    if (name === "" || author === "")
      return res.status(400).json({
        title: "error",
        message: "name and author cannot be empty",
      });

    await book.save();

    logger.info("New book saved!");

    res.status(201).json({
      title: "success",
      message: "book Saved",
    });
  } catch (err) {
    logger.log(err.message);

    res.status(500).json({
      title: "error",
      message: "internal server error",
    });
  }
});

module.exports = router;
