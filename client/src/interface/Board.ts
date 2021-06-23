import { Column } from './Column';

export interface Board {
  _id: string;
  title: string;
  columns: Column[];
}

export interface UpdateBoardApiData {
  success?: Board;
  error?: { message: string };
}

export interface BoardTitleApiData {
  success?: string[];
  error?: { message: string };
}
