const Song = require("../model/Song");

/**
 * @summary This shows all the songs stored in database
 * @returns {object} 200 - success response - application/json
 * @returns {object} 500 - Internal server error
 */
const showSongs = async (req, res) => {
  try {
    const songs = await Song.find();
    return res.json({ title: "success", data: songs });
  } catch (err) {
    return res.status(500).json({
      title: "error",
      message: "internal server error",
    });
  }
};

/**
 * @summary This adds a new song in the database
 * @param {Song} request.body.required - song info
 * @returns {object} 200 - success response - application/json
 * @returns {object} 500 - internal server error
 */
const addSong = async (req, res) => {
  const { name, singer } = req.body;

  try {
    const newSong = Song({ name, singer });
    await newSong.save();
    res.status(201).json({
      title: "success",
      message: "new song added",
    });
  } catch (err) {
    return res.status(500).json({
      title: "error",
      message: "internal server error",
    });
  }
};

module.exports = { showSongs, addSong };
