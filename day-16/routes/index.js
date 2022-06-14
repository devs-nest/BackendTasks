const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");

// index route
router.get("/", (_req, res) => {
  res.json({
    title: "success",
    message: "Index route",
  });
});

// protected route for authenticated user
router.get("/protected", auth, (_req, res) => {
  res.json({
    title: "success",
    message: "protected route",
  });
});

module.exports = router;
