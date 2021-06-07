const Column = require("../models/Column");
const Board = require("../models/Board");
const asyncHandler = require("express-async-handler");

// @route POST /column/create
// @desc Create a column within a board
// @access Private
exports.createColumn = asyncHandler(async (req, res, next) => {
  try {
    const columnToBeCreated = req.body.column;
    const column = await Column.create(columnToBeCreated);
    const board = await Board.findById(req.body.boardId).exec();
    board.columns.push(column);
    await Board.findByIdAndUpdate(req.body.boardId, board).exec();
    res.status(201).json(column);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// @route POST /column/updateTitle
// @desc Update a column title
// @access Private
exports.updateColumnTitle = asyncHandler(async (req, res, next) => {
  try {
    const newColumnTitle = req.body.columnTitle;
    const column = await Column.findById(req.body.columnId).exec();
    column.title = newColumnTitle;
    await Column.findByIdAndUpdate(req.body.columnId, column).exec();
    res.status(200).json(column);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
