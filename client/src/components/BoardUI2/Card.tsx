import { Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import useStyles from './useStyles';
import { CSSProperties } from 'react';
import { Card } from '../../interface/Card';

interface CardProps {
  children: Card;
  index: number;
  renderCard: CallableFunction;
  disableCardDrag: boolean;
}

function CardUI({ children, index, renderCard, disableCardDrag }: CardProps): JSX.Element {
  const classes = useStyles();
  return (
    <Draggable draggableId={String(children._id)} index={index} isDragDisabled={disableCardDrag}>
      {(provided, snapshot) => {
        {
          console.log('draggable card index', index);
        }
        return (
          <NaturalDragAnimation style={provided.draggableProps.style} snapshot={snapshot}>
            {(style: CSSProperties): JSX.Element => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                data-testid={`card-${children._id}`}
                style={style}
              >
                <div className={classes.cardWrapper}>{renderCard(snapshot.isDragging)}</div>
              </div>
            )}
          </NaturalDragAnimation>
        );
      }}
    </Draggable>
  );
}

export default CardUI;
