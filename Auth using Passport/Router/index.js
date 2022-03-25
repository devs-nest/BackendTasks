const express = require("express");
const router = express.Router();

const { ensureAuthenticated } = require("../middleware/auth");

router.get("/", (req, res) => {
  res.render("welcome");
});

router.get("/dashboard", ensureAuthenticated, (req, res) => {
  console.log(req.user);
  res.render("dashboard", {
    name: req.user.username,
  });
});

module.exports = router;
