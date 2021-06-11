import { makeStyles } from '@material-ui/core/styles';
import { theme } from '../../themes/theme';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 50,
  },
  dashboardButton: {
    color: theme.palette.primary.main,
    marginRight: 15,
  },
  calendarButton: {
    marginLeft: 15,
  },
  createBoardButton: {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 20,
    paddingLeft: 20,
  },
  avatar: {
    alignSelf: 'flex-end',
    marginLeft: 50,
    marginRight: 50,
  },
}));

export default useStyles;
