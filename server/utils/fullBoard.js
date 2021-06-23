const fullBoard = async (board) => {
  return await board.populate({ path: "columns", populate: { path: "cards" } }).exec();
}

module.exports = fullBoard;