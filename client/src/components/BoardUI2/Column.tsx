import React, { useState, CSSProperties } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import Card from './Card';
import withDroppable from './withDroppable';
import { pickPropOut } from '../../helpers/Board/utils';
import useStyles from './useStyles';
import CreateCardDialog from '../CreateCardDialog/CreateCardDialog';

interface ColumnProps {
  children: { id: number; title: string; cards: { id: number; title: string; description: string }[] };
  index: number;
  renderCard: CallableFunction;
  renderColumnHeader: CallableFunction;
  disableColumnDrag: boolean;
  disableCardDrag: boolean;
  cardsTotal: number;
  setCardsCount: (count: number) => void;
}

function Column({
  children,
  index: columnIndex,
  renderCard,
  renderColumnHeader,
  disableColumnDrag,
  disableCardDrag,
  cardsTotal,
  setCardsCount,
}: ColumnProps): JSX.Element {
  const [open, setOpen] = useState(false);

  const handleClickOpenCardDialog = () => {
    setOpen(true);
  };

  const handleCloseCardDialog = () => {
    setOpen(false);
  };
  const classes = useStyles();

  const ColumnEmptyPlaceholder = React.forwardRef<HTMLDivElement, unknown>((props, ref) => (
    <div ref={ref} className={classes.columnEmptyPlaceholder} {...props} />
  ));

  ColumnEmptyPlaceholder.displayName = 'ColumnEmptyPlaceholder';

  const DroppableColumn = withDroppable(ColumnEmptyPlaceholder);

  console.log('children.cards', children.cards);

  // eslint-disable-next-line
  const handleCardDialogClick = (title: any) => {
    const cardId = cardsTotal + 1;
    setCardsCount(cardId);
    console.log('cardsTotal', cardsTotal);
    children.cards.push({ id: cardId, title: title, description: '' });
    console.log('children.cards', children.cards);
    setOpen(false);
  };

  return (
    <Draggable draggableId={`column-draggable-${children.id}`} index={columnIndex} isDragDisabled={disableColumnDrag}>
      {(columnProvided, snapshot) => {
        {
          console.log('draggable column index', columnIndex);
        }
        const draggablePropsWithoutStyle = pickPropOut(columnProvided.draggableProps, 'style');

        return (
          <NaturalDragAnimation style={columnProvided.draggableProps.style} snapshot={snapshot}>
            {(style: CSSProperties): JSX.Element => (
              <div
                ref={columnProvided.innerRef}
                {...draggablePropsWithoutStyle}
                style={{
                  ...columnProvided.draggableProps.style,
                  ...style,
                }}
                className={classes.column}
                data-testid={`column-${children.id}`}
              >
                <div {...columnProvided.dragHandleProps}>{renderColumnHeader(children)}</div>
                <DroppableColumn droppableId={String(children.id)}>
                  {children.cards.length ? (
                    children.cards.map(
                      (card, index): JSX.Element => (
                        <Card
                          key={card.id}
                          index={index}
                          renderCard={(dragging: boolean) => renderCard(children, card, dragging)}
                          disableCardDrag={disableCardDrag}
                        >
                          {card}
                        </Card>
                      ),
                    )
                  ) : (
                    <div className={classes.cardSkeleton} />
                  )}
                  <CreateCardDialog
                    open={open}
                    handleClick={handleCardDialogClick}
                    handleClickOpen={handleClickOpenCardDialog}
                    handleClose={handleCloseCardDialog}
                  />
                </DroppableColumn>
              </div>
            )}
          </NaturalDragAnimation>
        );
      }}
    </Draggable>
  );
}

export default Column;
