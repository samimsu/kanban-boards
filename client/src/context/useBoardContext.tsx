import { useState, useContext, createContext, FunctionComponent } from 'react';
import { Board } from '../interface/Board';

interface IBoardContext {
  currentBoard: Board;
  setBoard: (data: Board) => void;
  publishBoard: () => void;
}

export const BoardContext = createContext<IBoardContext>({
  currentBoard: { _id: '', title: '', columns: [] },
  setBoard: () => null,
  publishBoard: () => null,
});

export const BoardProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [currentBoard, setCurrentBoard] = useState<Board>({ _id: '', title: '', columns: [] });

  const setBoard = (data: Board) => {
    setCurrentBoard(data);
  };

  const publishBoard = () => {
    console.log(currentBoard);
  };

  return <BoardContext.Provider value={{ currentBoard, setBoard, publishBoard }}>{children}</BoardContext.Provider>;
};

export function useBoard(): IBoardContext {
  return useContext(BoardContext);
}
