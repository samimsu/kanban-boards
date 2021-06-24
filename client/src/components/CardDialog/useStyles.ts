import { makeStyles } from '@material-ui/core/styles';

const marginComponent = 15;

const useStyles = makeStyles((theme) => ({
  dialog: {
    margin: 0,
    paddingTop: 25,
    paddingBottom: 25,
    paddingLeft: 10,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(2),
    top: theme.spacing(2),
    borderRadius: 1,
    width: 1,
    height: 1,
    color: 'lightgrey',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  header: {
    fontWeight: 'bold',
  },
  icon: {
    color: '#33aaff',
  },
  button: {
    margin: theme.spacing(2),
  },
}));

export default useStyles;
