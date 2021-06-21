import { DragDropContext } from 'react-beautiful-dnd';
import ColumnUI from './Column';
import withDroppable from './withDroppable';
import DefaultColumnHeader from './ColumnHeader';
import DefaultCard from './DefaultCard';
import { when, partialRight } from '../../helpers/Board/utils';
import {
  getCard,
  getCoordinates,
  isAColumnMove,
  isMovingAColumnToAnotherPosition,
  isMovingACardToAnotherPosition,
} from '../../helpers/Board/services';
import { moveCard, moveColumn } from '../../helpers/Board/helpers';
import { Column } from '../../interface/Column';
import { Board } from '../../interface/Board';
import { useBoard } from '../../context/useBoardContext';
import useStyles from './useStyles';
import React from 'react';

interface BoardContainerProps {
  children: Board;
  renderCard: CallableFunction;
  disableColumnDrag: boolean;
  disableCardDrag: boolean;
  renderColumnHeader: CallableFunction;
  onColumnDragEnd: CallableFunction;
  onCardDragEnd: CallableFunction;
}

function BoardContainer({
  children: board,
  renderCard,
  disableColumnDrag,
  disableCardDrag,
  renderColumnHeader,
  onColumnDragEnd,
  onCardDragEnd,
}: BoardContainerProps): JSX.Element {
  const classes = useStyles();

  const Columns = React.forwardRef<HTMLDivElement, unknown>((props, ref) => (
    <div ref={ref} className={classes.columns} {...props} />
  ));

  Columns.displayName = 'Columns';

  const DroppableBoard = withDroppable(Columns);

  function handleOnDragEnd(event: { type: unknown }): void {
    const coordinates = getCoordinates(event, board);
    if (!coordinates.source) return;

    isAColumnMove(event.type)
      ? isMovingAColumnToAnotherPosition(coordinates) &&
        onColumnDragEnd({ ...coordinates, subject: board.columns[coordinates.source.fromPosition] })
      : isMovingACardToAnotherPosition(coordinates) &&
        onCardDragEnd({ ...coordinates, subject: getCard(board, coordinates.source) });
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className={classes.board}>
        <DroppableBoard droppableId="board-droppable" direction="horizontal" type="BOARD">
          {board.columns.map(
            (column: Column, index): JSX.Element => (
              <ColumnUI
                key={column._id}
                index={index}
                renderCard={renderCard}
                renderColumnHeader={(column: {
                  _id: number;
                  title: string;
                  cards: { _id: number; title: string; description: string }[];
                }) =>
                  renderColumnHeader ? renderColumnHeader(column) : <DefaultColumnHeader>{column}</DefaultColumnHeader>
                }
                disableColumnDrag={disableColumnDrag}
                disableCardDrag={disableCardDrag}
              >
                {column}
              </ColumnUI>
            ),
          )}
        </DroppableBoard>
      </div>
    </DragDropContext>
  );
}

interface UncontrolledBoardProps {
  initialBoard: Board;
  onCardDragEnd: CallableFunction;
  onColumnDragEnd: CallableFunction;
  renderColumnHeader: CallableFunction;
  renderCard: CallableFunction;
  disableCardDrag: boolean;
  disableColumnDrag: boolean;
}

function UncontrolledBoard({
  initialBoard,
  onCardDragEnd,
  onColumnDragEnd,
  renderColumnHeader,
  renderCard,
  disableCardDrag,
  disableColumnDrag,
}: UncontrolledBoardProps): JSX.Element {
  const { currentBoard, setBoard } = useBoard();
  const handleOnCardDragEnd = partialRight(handleOnDragEnd, { moveCallback: moveCard, notifyCallback: onCardDragEnd });
  const handleOnColumnDragEnd = partialRight(handleOnDragEnd, {
    moveCallback: moveColumn,
    notifyCallback: onColumnDragEnd,
  });

  function handleOnDragEnd(
    { source, destination, subject }: { source: unknown; destination: unknown; subject: unknown },
    { moveCallback, notifyCallback }: { moveCallback: CallableFunction; notifyCallback: CallableFunction },
  ): void {
    const reorderedBoard = moveCallback(currentBoard, source, destination);
    when(notifyCallback)((callback: (arg0: unknown, arg1: unknown, arg2: unknown, arg3: unknown) => unknown) =>
      callback(reorderedBoard, subject, source, destination),
    );
    setBoard(reorderedBoard);
  }

  return (
    <BoardContainer
      onCardDragEnd={handleOnCardDragEnd}
      onColumnDragEnd={handleOnColumnDragEnd}
      {...(renderColumnHeader && {
        renderColumnHeader: (column: unknown) => renderColumnHeader(column, {}),
      })}
      renderCard={(_column: unknown, card: Record<string, React.ReactNode>, dragging: boolean) => {
        if (renderCard) return renderCard(card, { dragging });
        return <DefaultCard dragging={dragging}>{card}</DefaultCard>;
      }}
      disableColumnDrag={disableColumnDrag}
      disableCardDrag={disableCardDrag}
    >
      {currentBoard}
    </BoardContainer>
  );
}

function BoardUI(
  props: JSX.IntrinsicAttributes & {
    initialBoard: Board;
    onCardDragEnd: CallableFunction;
    onColumnDragEnd: CallableFunction;
    renderColumnHeader: CallableFunction;
    renderCard: CallableFunction;
    disableCardDrag: boolean;
    disableColumnDrag: boolean;
  },
): JSX.Element {
  return <UncontrolledBoard {...props} />;
}

export default BoardUI;
