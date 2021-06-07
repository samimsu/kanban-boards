const Card = require("../models/Card");
const Column = require("../models/Column");
const asyncHandler = require("express-async-handler");

// @route POST /card/create
// @desc Create a card within a column
// @access Private
exports.createCard = asyncHandler(async (req, res, next) => {
  try {
    const cardToBeCreated = req.body.card;
    const card = await Card.create(cardToBeCreated);
    const column = await Column.findById(req.body.columnId).exec();
    column.cards.push(card);
    await Column.findByIdAndUpdate(req.body.columnId, column).exec();
    res.status(201).json(card);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// @route POST /card/update
// @desc Update an entire card
// @access Private
exports.updateCard = asyncHandler(async (req, res, next) => {
  try {
    const newCard = req.body.newCard;
    await Card.findByIdAndUpdate(req.body.newCard._id, newCard).exec();
    res.status(200).json(newCard);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
