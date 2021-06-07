const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  // Cards have a name and description by default.
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  // Tags, color code, deadline, attachments are only stored when added.
  tags: [{ type: String }],
  colorCode: {
    type: String,
  },
  deadline: {
    type: Date,
  },
  attachments: [{ type: String }],
  // No comments yet.
});

module.exports = mongoose.model("card", cardSchema);
