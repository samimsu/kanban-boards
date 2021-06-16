import Column from './Column';

export default interface Board {
  title: string;
  columns?: Column[];
  columns_id?: string[];
}
