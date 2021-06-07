const Board = require("../models/Board");
const asyncHandler = require("express-async-handler");

// @route GET /board
// @desc Get complete board object (includes card and column objects ordered)
// @access Private
exports.fullBoardById = asyncHandler(async (req, res, next) => {
  try {
    const fullBoard = await Board.findById(req.body.boardId)
      .populate({ path: "columns", populate: { path: "cards" } })
      .exec();
    res.status(200).json(fullBoard);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// @route POST /board/update
// @desc Update board by reordering columns and/or cards
// @access Private
exports.updateBoard = asyncHandler(async (req, res, next) => {
  try {
    const newBoard = req.body.newBoard;
    await Board.findByIdAndUpdate(req.body.newBoard._id, newBoard).exec();
    res.status(200).json(newBoard);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});
