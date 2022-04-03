const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("Hello User");
});

module.exports = router;
