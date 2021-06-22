// import { useState } from 'react';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import useStyles from './useStyles';
import TextField from '@material-ui/core/TextField';

// const Container = ({ children }) => <div className='column-container'>{children}</div>;
// const Title = ({ children }) => <h3 className='column-title'>{children}</h3>;

// eslint-disable-next-line
const Column = ({ column, tasks, index, handleSubmit, handleInput }) => {
  const classes = useStyles();
  // const [taskTitle, setTaskTitle] = useState('');

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef} className={classes.columnContainer}>
          <div {...provided.dragHandleProps} className={classes.columnTitle}>
            {column.title}
          </div>
          <Droppable droppableId={column.id} type="task">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={snapshot.isDraggingOver ? classes.taskListDraggingOver : classes.taskList}
              >
                {tasks.map((task, index) => (
                  <Task key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <form onSubmit={handleSubmit}>
            <TextField
              id={column.id}
              className={classes.addCardField}
              placeholder="Add a card..."
              InputProps={{ disableUnderline: true }}
              onInput={handleInput}
            />
          </form>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
