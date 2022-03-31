const router = require("express").Router();
const { auth } = require("../middleware/auth");

router.get("/", (req, res) => {
  res.render("welcome", {
    user: req.user,
  });
});

// private route for authenticated users
router.get("/dashboard", auth, (req, res) => {
  res.render("dashboard", {
    name: req.user.name,
  });
});

module.exports = router;
