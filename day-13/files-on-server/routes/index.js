const router = require("express").Router();

router.get("/", (_req, res) => {
  res.json({
    title: "success",
    message: "welcome to index page",
  });
});

module.exports = router;
