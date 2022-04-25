const router = require("express").Router();
const Movie = require("../model/Movie");
const logger = require("../logger/logger");

// get movies data
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json({
      title: "success",
      data: movies,
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      title: "error",
      message: "internal server error",
    });
  }
});

// add movie
router.post("/", async (req, res) => {
  const { name, duration } = req.body;

  try {
    if (name.length <= 0 || duration <= 0) {
      logger.warn("Name or duration is not defined!");
      return res.status(400).json({
        title: "error",
        message: "invalid movie data",
      });
    }

    const newMovie = new Movie({ name, duration });

    await newMovie.save();

    res.status(201).json({
      title: "success",
      message: "new movie added",
    });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({
      title: "error",
      message: "internal server error",
    });
  }
});

module.exports = router;
