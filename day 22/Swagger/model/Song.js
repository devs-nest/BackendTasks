const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  singer: {
    type: String,
    required: true,
  },
});

const Song = mongoose.model("Song", songSchema);

module.exports = Song;
