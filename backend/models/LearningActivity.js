const mongoose = require("mongoose")

const LearningActivitySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },

  itemClicked: {
    type: String,
    required: true,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model(
  "LearningActivity",
  LearningActivitySchema
)