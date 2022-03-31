const router = require("express").Router();
const auth = require("../middlewares/auth");

router.get("/", (req, res) => {
  res.json({ title: "Welcome", message: "Hello User" });
});

// private route for authorized users
router.get("/dashboard", auth, (req, res) => {
  res.json({ title: "Dashboard", message: "This is a private route" });
});

module.exports = router;
