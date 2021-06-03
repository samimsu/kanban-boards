import { Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import useStyles from './useStyles';
import { CSSProperties, ReactNode } from 'react';

interface CardProps {
  children: Record<string, ReactNode>;
  index: number;
  renderCard: CallableFunction;
  disableCardDrag: boolean;
}

function Card({ children, index, renderCard, disableCardDrag }: CardProps): JSX.Element {
  const classes = useStyles();
  return (
    <Draggable draggableId={String(children.id)} index={index} isDragDisabled={disableCardDrag}>
      {(provided, snapshot) => {
        return (
          <NaturalDragAnimation style={provided.draggableProps.style} snapshot={snapshot}>
            {(style: CSSProperties): JSX.Element => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                data-testid={`card-${children.id}`}
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

export default Card;
