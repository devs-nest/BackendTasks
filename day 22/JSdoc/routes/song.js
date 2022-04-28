/**
 * Express router to mount song related endpoints
 * @type {object}
 * @constant
 * @namespace songRouter
 */
const router = require("express").Router();

// controllers
const { showSongs, addSong } = require("../controller/songController");

// middlewares
const validateSong = require("../middleware/validateSong");

/**
 * Route serving song data
 * @name get/song/
 * @function
 * @param {callback} controller - Express Controller to get song data
 */
router.get("/", showSongs);

/**
 * Route adding song data
 * @name post/song/
 * @function
 * @param {callback} middleware - Express middleware to verify song data
 * @param {callback} controller - Express controller to add song
 */
router.post("/", validateSong, addSong);

module.exports = router;
