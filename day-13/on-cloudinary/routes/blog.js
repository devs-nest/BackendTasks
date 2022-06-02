const router = require("express").Router();
const cloudinary = require("cloudinary");
const upload = require("../utils/multer");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/show", async (_req, res) => {
  try {
    const blogs = await prisma.blog.findMany();
    res.send(blogs);
  } catch (err) {
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

router.post("/create", upload.single("image"), async (req, res) => {
  const { title, description } = req.body;
  const image = req.file;

  try {
    const blog = await prisma.blog.create({
      data: {
        title,
        description,
        imageID: image.filename,
        imageURL: image.path,
      },
    });

    res.send(blog);
  } catch (err) {
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }
});

router.delete("/remove/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const blog = await prisma.blog.delete({
      where: {
        id,
      },
    });

    const imageDeleted = await cloudinary.uploader.destroy(blog.imageID);

    if (imageDeleted.result !== "ok")
      return res.status(400).json({
        title: "error",
        message: imageDeleted.result,
      });

    return res.json({
      title: "success",
      message: "blog deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      title: "internal server error",
      message: err.message,
    });
  }

  res.send();
});

module.exports = router;
