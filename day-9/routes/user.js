const express = require("express");
const router = express.Router();

const initialUserCheck = require("../middlewares/initialUserCheck");

const getAllUser = require("../controllers/getAllUser.controller");
const getSingleUser = require("../controllers/getSingleUser.controller");
const addNewUser = require("../controllers/addNewUser.controller");

router.get("/", getAllUser);
router.get("/:id", getSingleUser);
router.post("/", initialUserCheck, addNewUser);

module.exports = router;
