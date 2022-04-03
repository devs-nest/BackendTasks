const router = require("express").Router();
const passport = require("passport");
require("../config/passport")(passport);

router.get("/", (req, res) => {
  res.send("Hello User!");
});

// private route only accessed by authorized users
router.get(
  "/dashboard",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const message = "Welcome " + req.user.name + ". You're a " + req.user.role;
    res.json({ title: "success", message });
  }
);

module.exports = router;
