import { useState, FunctionComponent } from 'react';
import { BoardContext } from '../context/useBoardContext';
import { Board } from '../interface/Board';
import mockBoard from './mockBoard';

const MockUseBoardProvider: FunctionComponent = ({ children }) => {
  const [board, setBoard] = useState(mockBoard);

  return (
    <BoardContext.Provider
      value={{
        currentBoard: board,
        setBoard: setBoard,
        publishBoard: () => {
          console.log('publish');
        },
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};

export default MockUseBoardProvider;
