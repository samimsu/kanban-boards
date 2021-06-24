import { Card } from './Card';

export interface Column {
  _id: string;
  title: string;
  cards: Card[];
}
