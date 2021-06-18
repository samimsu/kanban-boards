import { ReactNode } from 'react';
import useStyles from './useStyles';

interface ColumnTitleProps {
  children: ReactNode;
}

interface ColumnHeaderProps {
  children: { _id: number; title: string; cards: { _id: number; title: string; description: string }[] };
}

function ColumnTitle({ children: title }: ColumnTitleProps): JSX.Element {
  return <span>{title}</span>;
}

export default function ColumnHeader({ children: column }: ColumnHeaderProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={classes.columnHeader}>
      <ColumnTitle>{column.title}</ColumnTitle>
    </div>
  );
}
