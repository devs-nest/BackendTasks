const router = require("express").Router();
const path = require("path");
const fs = require("fs").promises;
const upload = require("../utils/multer");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/show", async (_req, res) => {
  try {
    const blogs = await prisma.blog.findMany();
    res.json({
      title: "success",
      data: blogs,
    });
  } catch (err) {
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

router.get("/show/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    res.json({
      title: "success",
      data: blog,
    });
  } catch (err) {
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

router.get("/show/:id/image", async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await prisma.blog.findUnique({
      where: { id },
    });

    const image = Buffer.from(blog.image, "base64");
    const imagePath = path.join(__dirname, "../upload", "image.jpg");
    await fs.writeFile(imagePath, image);

    res.sendFile(imagePath);
  } catch (err) {
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

router.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    const img = await fs.readFile(req.file.path);
    const encodeImg = img.toString("base64");

    await prisma.blog.create({
      data: {
        title,
        description,
        image: encodeImg,
      },
    });

    res.status(201).json({
      title: "success",
      message: "blog created successfully",
    });
  } catch (err) {
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

module.exports = router;
