const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  //  A board has many columns
  columns: [{ type: mongoose.Schema.Types.ObjectId, ref: "column" }],
});

module.exports = mongoose.model("board", boardSchema);
