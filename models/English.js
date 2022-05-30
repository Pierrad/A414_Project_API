const mongoose = require("mongoose");

const categories = ["word","figure","color", "verb"];
const { Schema } = mongoose;

const englishSchema = new Schema({
  category: {
    type: String,
    enum: categories,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  possibleAnswers: {
    type: Array
  },
});

module.exports = mongoose.model("English", englishSchema)
