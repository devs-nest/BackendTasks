const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
});

const Book = model("Book", bookSchema);

module.exports = Book;
