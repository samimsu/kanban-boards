import React, { CSSProperties } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import CardUI from './Card';
import withDroppable from './withDroppable';
import { pickPropOut } from '../../helpers/Board/utils';
import useStyles from './useStyles';
import CreateCardDialog from '../CreateCardDialog/CreateCardDialog';
import { Column } from '../../interface/Column';

interface ColumnProps {
  children: Column;
  index: number;
  renderCard: CallableFunction;
  renderColumnHeader: CallableFunction;
  disableColumnDrag: boolean;
  disableCardDrag: boolean;
}

function ColumnUI({
  children,
  index: columnIndex,
  renderCard,
  renderColumnHeader,
  disableColumnDrag,
  disableCardDrag,
}: ColumnProps): JSX.Element {
  const classes = useStyles();

  const ColumnEmptyPlaceholder = React.forwardRef<HTMLDivElement, unknown>((props, ref) => (
    <div ref={ref} className={classes.columnEmptyPlaceholder} {...props} />
  ));

  ColumnEmptyPlaceholder.displayName = 'ColumnEmptyPlaceholder';

  const DroppableColumn = withDroppable(ColumnEmptyPlaceholder);

  return (
    <Draggable draggableId={`column-draggable-${children._id}`} index={columnIndex} isDragDisabled={disableColumnDrag}>
      {(columnProvided, snapshot) => {
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
                data-testid={`column-${children._id}`}
              >
                <div {...columnProvided.dragHandleProps}>{renderColumnHeader(children)}</div>
                <DroppableColumn droppableId={String(children._id)}>
                  {children.cards.length ? (
                    children.cards.map(
                      (card, index): JSX.Element => (
                        <CardUI
                          key={card._id}
                          index={index}
                          renderCard={(dragging: boolean) => renderCard(children, card, dragging)}
                          disableCardDrag={disableCardDrag}
                          column={children.title}
                        >
                          {card}
                        </CardUI>
                      ),
                    )
                  ) : (
                    <div className={classes.cardSkeleton} />
                  )}
                  <CreateCardDialog />
                </DroppableColumn>
              </div>
            )}
          </NaturalDragAnimation>
        );
      }}
    </Draggable>
  );
}

export default ColumnUI;
