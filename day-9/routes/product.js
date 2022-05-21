const express = require("express");
const router = express.Router();

// middlewares
const initialProductCheck = require("../middlewares/initialProductCheck");
const doesProductExist = require("../middlewares/doesProductExist");

// controllers
const getAllProducts = require("../controllers/getAllProducts.controller");
const getSingleProduct = require("../controllers/getSingleProduct.controller");
const addNewProduct = require("../controllers/addNewProduct.controller");
const updateProduct = require("../controllers/updateProduct.controller");
const deleteProduct = require("../controllers/deleteProduct.controller");
const addManyProduct = require("../controllers/addManyProduct.controller");

router.get("/", getAllProducts);
router.get("/:id", getSingleProduct);
router.post("/", initialProductCheck, addNewProduct);
router.post("/many", addManyProduct);
router.patch("/:id", doesProductExist, updateProduct);
router.delete("/:id", doesProductExist, deleteProduct);

module.exports = router;
