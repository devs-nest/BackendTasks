const express = require("express");
const router = express.Router();

// middlewares
const userExists = require("../middlewares/userExists");
const verifyUserCheck = require("../middlewares/verifyUserCheck");
const initialUserCheck = require("../middlewares/initialUserCheck");
const initialLoginCheck = require("../middlewares/initialLoginCheck");

// controller
const {
  getAllUsers,
  createNewUser,
  verifyUser,
  loginUser,
  generateNewOtp,
} = require("../controllers/user.controller");

router.get("/", getAllUsers);
router.post("/signup", initialUserCheck, userExists, createNewUser);
router.post("/verify", verifyUserCheck, verifyUser);
router.post("/login", initialLoginCheck, loginUser);
router.get("/generateotp/:id", generateNewOtp);

module.exports = router;
