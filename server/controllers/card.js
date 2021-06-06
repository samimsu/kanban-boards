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

// @route POST /card/updateName
// @desc Update a card name
// @access Private
exports.updateCardName = asyncHandler(async (req, res, next) => {
  try {
    const newCardName = req.body.cardName;
    const card = await Card.findById(req.body.cardId).exec();
    card.name = newCardName;
    await Card.findByIdAndUpdate(req.body.cardId, card).exec();
    res.status(200).json(card);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// @route POST /card/updateDescription
// @desc Update a card description
// @access Private
exports.updateCardDescription = asyncHandler(async (req, res, next) => {
  try {
    const newCardDescription = req.body.cardDescription;
    const card = await Card.findById(req.body.cardId).exec();
    card.description = newCardDescription;
    await Card.findByIdAndUpdate(req.body.cardId, card).exec();
    res.status(200).json(card);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
