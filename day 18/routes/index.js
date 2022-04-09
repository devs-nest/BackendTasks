const router = require("express").Router();


router.get("/", (_req, res) => {
  res.send("Hello User!");
});


module.exports = router;
