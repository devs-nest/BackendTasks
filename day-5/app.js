const express = require("express");
const app = express();

require("dotenv").config();
const bcrypt = require("bcryptjs");

const PORT = process.env.PORT || 8080;

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// middlewares
const initialProductCheck = require("./middlewares/initialProductCheck");
const initialUserCheck = require("./middlewares/initialUserCheck");

// parsing data
app.use(express.json());

// product routes
app.get("/product", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json({
      title: "success",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

app.get("/product/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  res.send(product);
});

//
app.post("/product", initialProductCheck, async (req, res) => {
  const { name, price, userId } = req.body;

  try {
    const product = await prisma.product.create({
      data: {
        name: name,
        price: parseInt(price),
        userId: parseInt(userId),
      },
    });

    res.status(201).json({
      title: "success",
      data: product,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

app.patch("/product/:id", async (req, res) => {
  const name = req.body.name;
  const id = parseInt(req.params.id);

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
      },
    });

    res.json({
      title: "success",
      data: updatedProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

app.delete("/product/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        id,
      },
    });
    res.json({
      title: "success",
      data: deletedProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

// user routes
app.get("/user", async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      include: {
        product: true,
      },
    });
    res.json({
      title: "success",
      data: user,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

app.get("/user/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        product: true,
      },
    });

    res.json({
      title: "success",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

// Secret key

app.post("/user", initialUserCheck, async (req, res) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, process.env.SALT_ROUNDS);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    // 201 - something is created in db
    // 200 - status ok (default)
    res.status(201).json({
      title: "success",
      data: user,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log("listening to port", PORT);
});
