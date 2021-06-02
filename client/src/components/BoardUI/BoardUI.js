/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import mockData from './mock-data';
import Column from './Column';

const Container = styled.div`
  display: flex;
`;

class InnerList extends React.PureComponent {
  render() {
    const { column, cardMap, index } = this.props;
    const cards = column.cardIds.map((cardId) => cardMap[cardId]);
    return <Column column={column} cards={cards} index={index} />;
  }
}

export default class BoardUI extends React.Component {
  state = mockData;

  onDragStart = (start, provided) => {
    provided.announce(`You have lifted the card in position ${start.source.index + 1}`);
  };

  onDragUpdate = (update, provided) => {
    const message = update.destination
      ? `You have moved the card to position ${update.destination.index + 1}`
      : `You are currently not over a droppable area`;

    provided.announce(message);
  };

  onDragEnd = (result, provided) => {
    const message = result.destination
      ? `You have moved the card from position
        ${result.source.index + 1} to ${result.destination.index + 1}`
      : `The card has been returned to its starting position of
        ${result.source.index + 1}`;

    provided.announce(message);

    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(this.state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder,
      };
      this.setState(newState);
      return;
    }

    const home = this.state.columns[source.droppableId];
    const foreign = this.state.columns[destination.droppableId];

    if (home === foreign) {
      const newCardIds = Array.from(home.cardIds);
      newCardIds.splice(source.index, 1);
      newCardIds.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        cardIds: newCardIds,
      };

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newHome.id]: newHome,
        },
      };

      this.setState(newState);
      return;
    }

    // moving from one list to another
    const homeCardIds = Array.from(home.cardIds);
    homeCardIds.splice(source.index, 1);
    const newHome = {
      ...home,
      cardIds: homeCardIds,
    };

    const foreignCardIds = Array.from(foreign.cardIds);
    foreignCardIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      cardIds: foreignCardIds,
    };

    const newState = {
      ...this.state,
      columns: {
        ...this.state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    this.setState(newState);
  };

  render() {
    return (
      <div>
        <DragDropContext onDragStart={this.onDragStart} onDragUpdate={this.onDragUpdate} onDragEnd={this.onDragEnd}>
          <Droppable droppableId="all-columns" direction="horizontal" type="column">
            {(provided) => (
              <Container {...provided.droppableProps} innerRef={provided.innerRef}>
                {this.state.columnOrder.map((columnId, index) => {
                  const column = this.state.columns[columnId];
                  return <InnerList key={column.id} column={column} cardMap={this.state.cards} index={index} />;
                })}
                {provided.placeholder}
              </Container>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
}
