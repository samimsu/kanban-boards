import clsx from 'clsx';
import { ReactNode } from 'react';
import useStyles from './useStyles';

interface DefaultCardProps {
  children: Record<string, ReactNode>;
  dragging: boolean;
}

export default function DefaultCard({ children: card, dragging }: DefaultCardProps): JSX.Element {
  const classes = useStyles();
  return (
    <div className={clsx(classes.card, { [classes.draggingCard]: dragging })}>
      <span>
        <div className={classes.cardTitle}>
          <span>{card.title}</span>
        </div>
      </span>
      <div className={classes.cardDescription}>{card.description}</div>
    </div>
  );
}
