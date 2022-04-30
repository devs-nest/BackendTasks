const router = require("express").Router();

/**
 * @swagger
 * /:
 *  get:
 *    description: Index page
 *    responses:
 *      '200':
 *        description: Success
 */
router.get("/", (req, res) => {
  res.json({ title: "success", message: "Hi there!" });
});

module.exports = router;
