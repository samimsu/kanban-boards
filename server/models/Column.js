const mongoose = require("mongoose");

const columnSchema = new mongoose.Schema({
  title: { type: String, required: true },
  // A column has many cards
  cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "card" }],
});

module.exports = mongoose.model("column", columnSchema);
