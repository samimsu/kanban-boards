import { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Column from './Column';
import useStyles from './useStyles';
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateColumnDialog from '../CreateColumnDialog/CreateColumnDialog';

// eslint-disable-next-line
const Board = ({ boardData }) => {
  const classes = useStyles();
  const [board, setBoard] = useState(boardData);
  const [cardTitle, setCardTitle] = useState('');
  const [columnTitle, setColumnTitle] = useState('');
  const [createColumnOpen, setCreateColumnOpen] = useState(false);

  const handleClickCreateColumn = () => {
    setCreateColumnOpen(true);
  };

  const handleCloseCreateColumn = () => {
    setCreateColumnOpen(false);
  };

  // eslint-disable-next-line
  const handleColumnInput = (e) => {
    setColumnTitle(e.target.value);
  };

  // eslint-disable-next-line
  const handleColumnOnSubmit = (e) => {
    e.preventDefault();
    console.log(columnTitle);
    const totalColumnsLength = board.columnOrder.length;
    const newColumnId = `column-${totalColumnsLength + 1}`;
    const newColumn = { id: newColumnId, _id: newColumnId, title: columnTitle, cardIds: [] };
    console.log('columns length', totalColumnsLength);
    const newData = {
      ...board,
      columns: {
        ...board.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: board.columnOrder.concat(newColumnId),
    };
    console.log(newData);
    setBoard(newData);
    handleCloseCreateColumn();
  };

  const handleCardSubmit = (e) => {
    e.preventDefault();
    const totalCardsLength = Object.keys(board.cards).length;
    const columnId = e.target[0].id;
    const newCardId = `card-${totalCardsLength + 1}`;
    const newCard = { id: newCardId, title: cardTitle };
    const newData = {
      ...board,
      cards: {
        ...board.cards,
        [newCardId]: newCard,
      },
      columns: {
        ...board.columns,
        [columnId]: {
          ...board.columns[columnId],
          cardIds: board.columns[columnId].cardIds.concat(newCardId),
        },
      },
    };
    setBoard(newData);
    console.log(e);
    console.log(e.target[0].value);
    e.target[0].value = '';
  };

  const handleCardInput = (e) => {
    setCardTitle(e.target.value);
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(board.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newBoard = {
        ...board,
        columnOrder: newColumnOrder,
      };

      setBoard(newBoard);
      return;
    }

    const startColumn = board.columns[source.droppableId];
    const finishColumn = board.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      const newCardIds = Array.from(startColumn.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        cardIds: newCardIds,
      };

      const newData = {
        ...board,
        columns: {
          ...board.columns,
          [newColumn.id]: newColumn,
        },
      };

      setBoard(newData);
      return;
    }

    const startCardIds = Array.from(startColumn.cardIds);
    startCardIds.splice(source.index, 1);
    const newStartColumn = {
      ...startColumn,
      cardIds: startCardIds,
    };

    const finishCardIds = Array.from(finishColumn.cardIds);
    finishCardIds.splice(destination.index, 0, draggableId);
    const newFinishColumn = {
      ...finishColumn,
      cardIds: finishCardIds,
    };

    const newData = {
      ...board,
      columns: {
        ...board.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };

    setBoard(newData);
    return;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <IconButton onClick={handleClickCreateColumn}>
        <AddCircleOutlineIcon fontSize="large" />
      </IconButton>
      <CreateColumnDialog
        createColumnOpen={createColumnOpen}
        handleCloseCreateColumn={handleCloseCreateColumn}
        handleInput={handleColumnInput}
        handleOnSubmit={handleColumnOnSubmit}
      />
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className={classes.boardContainer}>
            {board.columnOrder.map((columnId, index) => {
              const column = board.columns[columnId];
              const cards = column.cardIds.map((cardId) => board.cards[cardId]);
              return (
                <Column
                  key={column.id}
                  column={column}
                  cards={cards}
                  index={index}
                  handleSubmit={handleCardSubmit}
                  handleInput={handleCardInput}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Board;
