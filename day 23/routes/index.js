const router = require("express").Router();

const auth = require("../middlewares/auth");

// public index route
router.get("/", (req, res) => {
  res.json({
    title: "success",
    message: "hi there",
  });
});

// protected route
router.get("/protected", auth, (req, res) => {
  res.json({
    title: "success",
    message: "this is a protected route",
  });
});

module.exports = router;
