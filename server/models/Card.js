const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  // Cards need only to have a name and description. No comments, deadline, attachments, etc
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("card", cardSchema);
