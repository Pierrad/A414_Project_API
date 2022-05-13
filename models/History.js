const mongoose = require("mongoose");

const { Schema } = mongoose;

const historySchema = new Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  possibleAnswers: {
    type: Array,
    required: true
  },
});

module.exports = mongoose.model("History", historySchema)
