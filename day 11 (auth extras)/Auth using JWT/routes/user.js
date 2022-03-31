const router = require("express").Router();
const User = require("../models/User");

// middlewares
const userRegisterCheck = require("../middlewares/userRegisterCheck");
const userLoginCheck = require("../middlewares/userLoginCheck");
const auth = require("../middlewares/auth");

// controllers
const registerUser = require("../controllers/registerUser");
const loginUser = require("../controllers/loginUser");
const logoutUser = require("../controllers/logoutUser");

// get all user info
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    res.json({ title: "success", data: users });
  } catch (err) {
    res.status(500).json({ title: "error", message: "internal server error" });
  }
});

router.post("/register", userRegisterCheck, registerUser);

router.post("/login", userLoginCheck, loginUser);

// Use Bearer token to logout
router.get("/logout", auth, logoutUser);

module.exports = router;
