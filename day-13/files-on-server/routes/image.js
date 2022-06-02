const router = require("express").Router();
const upload = require("../utils/multer");

const fs = require("fs");
const path = require("path");

router.get("/show/:id", (req, res) => {
  const id = req.params.id;
  const filePath = path.join(__dirname, "../upload", id);
  try {
    const doesExist = fs.existsSync(filePath);
    if (!doesExist)
      return res.status(404).json({
        title: "Not Found",
        message: "file does not exist",
      });
    res.sendFile(filePath);
  } catch (err) {
    return res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

router.post("/create", upload.single("image"), (req, res) => {
  const file = req.file;
  res.send(file);
});

module.exports = router;
