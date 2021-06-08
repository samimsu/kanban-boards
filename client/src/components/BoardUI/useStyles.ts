import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  board: { overflowY: 'hidden', display: 'flex', alignItems: 'flex-start', padding: '5px' },
  columnEmptyPlaceholder: { minHeight: 'inherit', height: 'inherit' },
  columnHeader: {
    paddingBottom: '10px',
    fontWeight: 'bold',
  },
  column: {
    height: '100%',
    minHeight: '28px',
    display: 'inline-block',
    verticalAlign: 'top',
    padding: '15px',
    borderRadius: '10px',
    backgroundColor: '#f4f6ff',
    margin: '5px',
  },
  columns: { whiteSpace: 'nowrap' },
  cardSkeleton: {
    boxSizing: 'border-box',
    maxWidth: '250px',
    minWidth: '250px',
  },
  cardWrapper: { display: 'inline-block', whiteSpace: 'normal' },
  cardTitle: {
    borderBottom: '1px solid #eee',
    paddingBottom: '5px',
    fontWeight: 'bold',
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardDescription: { paddingTop: '10px' },
  card: {
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    padding: '10px',
    marginBottom: '7px',
    boxSizing: 'border-box',
    maxWidth: '250px',
    minWidth: '250px',
  },
  draggingCard: {
    background: '#fcfcfc',
    boxShadow: '2px 2px grey',
  },
  addCardButton: {
    color: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#759CFC',
  },
}));

export default useStyles;
