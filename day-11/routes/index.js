const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const CheckAdmin = require("../middlewares/checkAdmin");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// index route
router.get("/", (req, res) => {
  res.json({
    title: "success",
    message: "Index route",
  });
});

// protected route for authenticated user
router.get("/protected", auth, async (req, res) => {
  const id = req.id;

  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  res.json({
    title: "success",
    message: `welcome ${user.name}`,
  });
});

router.get("/private", auth, CheckAdmin, (req, res) => {
  res.json({
    title: "success",
    message: "accessed by admin or super-admin",
  });
});

module.exports = router;
