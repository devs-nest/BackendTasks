const router = require("express").Router();
const Product = require("../models/Product");

const productCheck = require("../middlewares/productCheck");

// GET /product?limit=10&skip=0
// GET /product?sortBy=createdAt_desc

// List all the products
router.get("/", async (req, res) => {
  const skip = parseInt(req.query.skip);
  const limit = parseInt(req.query.limit);
  const sort = {};

  if (skip < 0)
    return res
      .status(400)
      .json({ title: "error", message: "Skip value cannot be negative" });

  // splits the sortBy query into parts and use one part as key and other as value
  if (req.query.sortBy) {
    const parts = req.query.sortBy.split("_");
    sort[parts[0]] = parts[1];
  }

  try {
    const products = await Product.find()
      .limit(limit)
      .skip(skip * limit)
      .sort(sort);

    res.json({ title: "success", data: products });
  } catch (err) {
    return res
      .status(500)
      .json({ title: "error", message: "internal server error" });
  }
});

// add products
router.post("/", productCheck, async (req, res) => {
  const { name, manufacturedBy, price, quantityAvailable } = req.body;

  try {
    const newProduct = Product({
      name,
      manufacturedBy,
      price,
      quantityAvailable,
    });

    const saved = await newProduct.save();
    return res.status(201).json({ title: "success", data: saved });
  } catch (err) {
    return res
      .status(500)
      .json({ title: "error", message: "Internal server error" });
  }
});

module.exports = router;
