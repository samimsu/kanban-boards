/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { removeFromArrayAtPosition, addInArrayAtPosition, changeElementOfPositionInArray } from './utils';

function reorderCardsOnColumn(column, reorderCards) {
  return { ...column, cards: reorderCards(column.cards) };
}

function moveColumn(board, { fromPosition }, { toPosition }) {
  return { ...board, columns: changeElementOfPositionInArray(board.columns, fromPosition, toPosition) };
}

function moveCard(board, { fromPosition, fromColumnId }, { toPosition, toColumnId }) {
  const sourceColumn = board.columns.find((column) => column._id === fromColumnId);
  const destinationColumn = board.columns.find((column) => column._id === toColumnId);

  const reorderColumnsOnBoard = (reorderColumnsMapper) => ({
    ...board,
    columns: board.columns.map(reorderColumnsMapper),
  });
  const reorderCardsOnSourceColumn = reorderCardsOnColumn.bind(null, sourceColumn);
  const reorderCardsOnDestinationColumn = reorderCardsOnColumn.bind(null, destinationColumn);

  if (sourceColumn._id === destinationColumn._id) {
    const reorderedCardsOnColumn = reorderCardsOnSourceColumn((cards) => {
      return changeElementOfPositionInArray(cards, fromPosition, toPosition);
    });
    return reorderColumnsOnBoard((column) => (column._id === sourceColumn._id ? reorderedCardsOnColumn : column));
  } else {
    const reorderedCardsOnSourceColumn = reorderCardsOnSourceColumn((cards) => {
      return removeFromArrayAtPosition(cards, fromPosition);
    });
    const reorderedCardsOnDestinationColumn = reorderCardsOnDestinationColumn((cards) => {
      return addInArrayAtPosition(cards, sourceColumn.cards[fromPosition], toPosition);
    });
    return reorderColumnsOnBoard((column) => {
      if (column._id === sourceColumn._id) return reorderedCardsOnSourceColumn;
      if (column._id === destinationColumn._id) return reorderedCardsOnDestinationColumn;
      return column;
    });
  }
}

export { moveColumn, moveCard };
