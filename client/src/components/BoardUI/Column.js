/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import styled from 'styled-components';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from './Card';

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  background-color: white;
  border-radius: 2px;
  width: 220px;
  display: flex;
  flex-direction: column;
`;
const Title = styled.h3`
  padding: 8px;
`;
const CardList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? 'lightgrey' : 'inherit')};
  flex-grow: 1;
  min-height: 100px;
`;

class InnerList extends React.Component {
  shouldComponentUpdate(nextProps) {
    if (nextProps.cards === this.props.cards) {
      return false;
    }
    return true;
  }
  render() {
    return this.props.cards.map((card, index) => <Card key={card.id} card={card} index={index} />);
  }
}

export default class Column extends React.Component {
  render() {
    return (
      <Draggable draggableId={this.props.column.id} index={this.props.index}>
        {(provided) => (
          <Container {...provided.draggableProps} innerRef={provided.innerRef}>
            <Title {...provided.dragHandleProps}>{this.props.column.title}</Title>
            <Droppable droppableId={this.props.column.id} type="card">
              {(provided, snapshot) => (
                <CardList
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <InnerList cards={this.props.cards} />
                  {provided.placeholder}
                </CardList>
              )}
            </Droppable>
          </Container>
        )}
      </Draggable>
    );
  }
}
