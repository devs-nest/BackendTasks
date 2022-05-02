const router = require("express").Router();
const passport = require("passport");

// middlewares
const registerCheck = require("../middlewares/registerCheck");
const loginCheck = require("../middlewares/loginCheck");
const authorized = require("../middlewares/authorized");
const auth = require("../middlewares/auth");

// controllers
const registerUser = require("../controllers/registerUser");
const verifyUser = require("../controllers/verifyUser");

// register user
router.post("/register", registerCheck, registerUser);

// login user
router.post("/login", loginCheck, authorized, (req, res) => {
  const user = req.user;
  res.send(user);
});

// logout user
router.get("/logout", auth, (req, res) => {
  req.logout();

  return res.json({
    title: "success",
    message: "you're logged out successfully",
  });
});

// verify user
router.get("/confirm/:confirmationCode", verifyUser);

module.exports = router;
