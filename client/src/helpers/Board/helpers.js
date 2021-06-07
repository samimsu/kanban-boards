/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { removeFromArrayAtPosition, addInArrayAtPosition, changeElementOfPositionInArray } from './utils';

function reorderCardsOnColumn(column, reorderCards) {
  return { ...column, cards: reorderCards(column.cards) };
}

function moveColumn(board, { fromPosition }, { toPosition }) {
  return { ...board, columns: changeElementOfPositionInArray(board.columns, fromPosition, toPosition) };
}

function moveCard(board, { fromPosition, fromColumnId }, { toPosition, toColumnId }) {
  const sourceColumn = board.columns.find((column) => column.id === fromColumnId);
  const destinationColumn = board.columns.find((column) => column.id === toColumnId);

  const reorderColumnsOnBoard = (reorderColumnsMapper) => ({
    ...board,
    columns: board.columns.map(reorderColumnsMapper),
  });
  const reorderCardsOnSourceColumn = reorderCardsOnColumn.bind(null, sourceColumn);
  const reorderCardsOnDestinationColumn = reorderCardsOnColumn.bind(null, destinationColumn);

  if (sourceColumn.id === destinationColumn.id) {
    const reorderedCardsOnColumn = reorderCardsOnSourceColumn((cards) => {
      return changeElementOfPositionInArray(cards, fromPosition, toPosition);
    });
    return reorderColumnsOnBoard((column) => (column.id === sourceColumn.id ? reorderedCardsOnColumn : column));
  } else {
    const reorderedCardsOnSourceColumn = reorderCardsOnSourceColumn((cards) => {
      return removeFromArrayAtPosition(cards, fromPosition);
    });
    const reorderedCardsOnDestinationColumn = reorderCardsOnDestinationColumn((cards) => {
      return addInArrayAtPosition(cards, sourceColumn.cards[fromPosition], toPosition);
    });
    return reorderColumnsOnBoard((column) => {
      if (column.id === sourceColumn.id) return reorderedCardsOnSourceColumn;
      if (column.id === destinationColumn.id) return reorderedCardsOnDestinationColumn;
      return column;
    });
  }
}

export { moveColumn, moveCard };
