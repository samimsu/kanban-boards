import Card from './Card';

export default interface Column {
  title: string;
  cards?: Card[];
  cards_id?: string[];
}
