const router = require("express").Router();
const passport = require("passport");

router.get("/login", (req, res) => {
  if (req.user) {
    return res.redirect("/dashboard");
  }
  res.render("login");
});

// login handler
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile"],
  })
);

// callback that google calls after success
router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/dashboard");
});

// handle logout
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
