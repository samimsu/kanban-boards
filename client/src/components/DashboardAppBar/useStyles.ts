import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';

// const primaryColor = '#759CFC';

const useStyles = makeStyles(() => ({
  appbar: {
    position: 'static',
    backgroundColor: theme.palette.primary.main,
  },
  boardTitle: {
    color: 'white',
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
  },
  menuIcon: {
    color: 'white',
  },
}));

export default useStyles;
