const express = require("express");
const router = express.Router();

// middlewares
const userExists = require("../middlewares/userExists");
const initialUserCheck = require("../middlewares/initialUserCheck");
const initialLoginCheck = require("../middlewares/initialLoginCheck");
const auth = require("../middlewares/auth");
const checkSuperAdmin = require("../middlewares/checkSuperAdmin");

// controller
const {
  getAllUsers,
  createNewUser,
  loginUser,
} = require("../controllers/user.controller");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", getAllUsers);
router.post("/signup", initialUserCheck, userExists, createNewUser);
router.post("/login", initialLoginCheck, loginUser);

router.delete("/delete", auth, checkSuperAdmin, async (req, res) => {
  // await prisma.user.deleteMany();

  res.send("super-admin accessed");
});

module.exports = router;
