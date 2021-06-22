import React from 'react';
import { Droppable, DroppableId } from 'react-beautiful-dnd';

interface WrapperComponentProps {
  children: unknown;
  droppableId: DroppableId;
}

export default function withDroppable(DroppableComponent: React.ElementType): CallableFunction {
  return function WrapperComponent({ children, ...droppableProps }: WrapperComponentProps): JSX.Element {
    return (
      <Droppable {...droppableProps}>
        {(provided): JSX.Element => (
          <DroppableComponent ref={provided.innerRef} {...provided.droppableProps}>
            {children}
            {provided.placeholder}
          </DroppableComponent>
        )}
      </Droppable>
    );
  };
}

// export default withDroppable;
