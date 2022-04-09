const router = require("express").Router();

const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

const Artist = require("../models/Artist");

// Insert data into Artist table from artist csv
router.get("/insert", (_req, res) => {
  var tutorial = [];
  const pat = path.join(__dirname, "../public/csv/artists.csv");

  fs.createReadStream(pat)
    .pipe(csv.parse({ headers: true }))
    .on("error", (err) => {
      console.log(err);
      res.status(500).send("internal server error");
    })
    .on("data", (row) => {
      tutorial.push(row);
    })
    .on("end", () => {
      Artist.bulkCreate(tutorial, { ignoreDuplicates: true })
        .then(() => {
          res.json({
            title: "success",
            message: "File Uploaded",
          });
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({
            title: "error",
            message: "failed to import" + err.message,
          });
        });
    });
});

// returns data from Artist table
router.get("/data", async (_req, res) => {
  console.log("here");
  try {
    const data = await Artist.findAll();
    res.status(200).json({
      title: "success",
      data,
    });
  } catch (err) {
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

// deletes data from Artist table
router.delete("/data", async (_req, res) => {
  try {
    await Artist.truncate({
      force: true,
    });
    res.json({ title: "success", message: "data deleted successfully" });
  } catch (err) {
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

module.exports = router;
