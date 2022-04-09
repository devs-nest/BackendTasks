const router = require("express").Router();

const { Op } = require("sequelize");
const sequelize = require("../database/sequelize");
const Artist = require("../models/Artist");

// GET /full?q=Bill%20Aron

// search exact data
router.get("/full", async (req, res) => {
  try {
    const products = await Artist.findAll({
      where: {
        Name: req.query.q,
      },
    });
    res.json({ title: "success", data: products });
  } catch (err) {
    res
      .status(500)
      .json({ title: "internal server error", message: err.message });
  }
});

// partial text search
router.get("/partial", async (req, res) => {
  try {
    const products = await Artist.findAll({
      where: {
        Name: {
          [Op.like]: "%" + req.query.q + "%",
        },
      },
    });
    res.json({ title: "success", data: products });
  } catch (err) {
    res
      .status(500)
      .json({ title: "internal server error", message: err.message });
  }
});

router.get("/trigram", (req, res) => {
  sequelize
    .query("CREATE EXTENSION IF NOT EXISTS pg_trgm;") // installing pg_trgm extension
    .then(() => {
      sequelize
        .query("select * from pg_extension where extname='pg_trgm';") // check if pg_trgm exists
        .then(() => {
          Artist.findAll({
            attributes: {
              include: [
                [
                  sequelize.fn(
                    "similarity",
                    sequelize.col("Name"),
                    req.query.q
                  ), // creates function on similarity
                  "score", // function returns score in range [0,1]
                ],
              ],
            },
            where: [
              sequelize.where(
                sequelize.fn("similarity", sequelize.col("Name"), req.query.q),
                { [Op.gt]: 0.3 } // compares it with score
              ),
              {},
            ],
          })
            .then((art) => res.send(art))
            .catch((err) => {
              res
                .status(500)
                .json({ title: "internal server error", message: err.message });
            });
        });
    })
    .catch((err) => {
      res.status(500).json({
        title: "internal server error",
        message: err.message,
      });
    });
});

router.get("/phonetic", async (req, res) => {
  try {
    await sequelize.query("CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;");

    const artist = await sequelize.query(
      `SELECT * FROM "Artist" WHERE "Nationality" IN ('American', 'British') AND SOUNDEX("Name") = SOUNDEX('${req.query.q}');`
    );

    res.json({
      title: "success",
      data: artist[0],
    });
  } catch (err) {
    res.status(500).json({
      title: "error",
      message: err.message,
    });
  }
});

router.get("/metaphone", async (req, res) => {
  try {
    await sequelize.query("CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;");

    const artist = await sequelize.query(
      `SELECT * FROM "Artist" WHERE "Nationality" = 'American'
        ORDER BY SIMILARITY(
            METAPHONE("Name", 10), 
            METAPHONE('${req.query.q}', 10)
            ) DESC 
            LIMIT 5;`
    );

    res.json({ title: "success", data: artist[0] });
  } catch (err) {
    res.status(500).json({
      title: "error",
      message: err.message,
    });
  }
});

// Lavenshtein distance - minimum number of edits required to transform one string to another

router.get("/leven", async (req, res) => {
  try {
    await sequelize.query("CREATE EXTENSION IF NOT EXISTS fuzzystrmatch;");

    const artist = await sequelize.query(
      `SELECT *,LEVENSHTEIN("Name", '${req.query.q}') FROM "Artist" ORDER BY LEVENSHTEIN("Name", '${req.query.q}') ASC LIMIT 5;`
    );

    res.json({ title: "success", data: artist[0] });
  } catch (err) {
    res.status(500).json({
      title: "error",
      message: err.message,
    });
  }
});

module.exports = router;
