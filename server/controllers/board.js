const Board = require("../models/Board");
const fullBoard = require("../utils/fullBoard");
const asyncHandler = require("express-async-handler");

// @route GET /board
// @desc Get complete board object (includes card and column objects ordered)
// @access Private
exports.fullBoardById = asyncHandler(async (req, res, next) => {
  try {
    const board = await fullBoard(Board.findById(req.query.id))
    res.status(200).json({success: board});
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// @route PUT /board/update
// @desc Update board by reordering columns and/or cards
// @access Private
exports.updateBoard = asyncHandler(async (req, res, next) => {
  try {
    const newBoard = req.body.board;
    const board = await fullBoard(Board.findByIdAndUpdate(newBoard._id, newBoard));
    res.status(200).json({ success: board });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// @route GET /board/title
// @desc Get board titles of specified user
// @access Private
exports.boardTitle = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.query.id).populate({path: "boards"}).exec();
    const titles = user.boards.map(b => b.title || 'Untitled');
    res.status(200).json({success: titles});
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
