/**
 * Express router to mount index endpoint
 * @type {object}
 * @constant
 * @namespace indexRouter
 */
const router = require("express").Router();

/**
 * Route serving index endpoint
 * @name get/
 * @function
 * @param {callback} controller - Express controller to say hi
 */
router.get("/", (req, res) => {
  res.json({ message: "Hi there!" });
});

module.exports = router;
