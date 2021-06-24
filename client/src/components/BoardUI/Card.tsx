import { Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import useStyles from './useStyles';
import { CSSProperties, useState } from 'react';
import { Card } from '../../interface/Card';
import CardDialog from '../CardDialog/CardDialog';

interface CardProps {
  children: Card;
  index: number;
  renderCard: CallableFunction;
  disableCardDrag: boolean;
  column: string;
}

function CardUI({ children, index, renderCard, disableCardDrag, column }: CardProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Draggable draggableId={children._id} index={index} isDragDisabled={disableCardDrag}>
        {(provided, snapshot) => {
          return (
            <NaturalDragAnimation style={provided.draggableProps.style} snapshot={snapshot}>
              {(style: CSSProperties): JSX.Element => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  data-testid={`card-${children._id}`}
                  style={style}
                  onClick={handleClickOpen}
                >
                  <div className={classes.cardWrapper}>{renderCard(snapshot.isDragging)}</div>
                </div>
              )}
            </NaturalDragAnimation>
          );
        }}
      </Draggable>
      <CardDialog open={open} handleClose={handleClose} column={column}>
        {children}
      </CardDialog>
    </>
  );
}

export default CardUI;
