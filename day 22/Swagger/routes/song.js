const router = require("express").Router();

// controllers
const { showSongs, addSong } = require("../controller/songController");

// middlewares
const validateSong = require("../middleware/validateSong");

/**
 * @swagger
 * /song:
 *  get:
 *      description: Used to display songs
 *      responses:
 *          '200':
 *              description: Success
 *          '500':
 *              description: Internal server error
 *
 */
router.get("/", showSongs);

/**
 * @swagger
 * /song:
 *  post:
 *      description: Used to add songs
 *      responses:
 *          '201':
 *              description: Success
 *          '400':
 *              description: Name or singer cannot be empty and length should not be less than 2
 *          '500':
 *              description: Internal server error
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: name
 *            in: formData
 *            required: true
 *            type: string
 *          - name: singer
 *            in: formData
 *            required: true
 *            type: string
 */
router.post("/", validateSong, addSong);

module.exports = router;
