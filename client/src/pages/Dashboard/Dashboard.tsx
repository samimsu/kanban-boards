import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import DashboardAppBar from '../../components/DashboardAppBar/DashboardAppBar';
import BoardUI from '../../components/BoardUI/BoardUI';
import Box from '@material-ui/core/Box';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const [columnTitle, setColumnTitle] = useState('');

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />

      {console.log('loggedInUser board data', loggedInUser.boards)}
      <Grid item xs={12}>
        <DashboardHeader loggedInUser={loggedInUser} />
        <DashboardAppBar />
      </Grid>

      <Box className={classes.board} display={'flex'} justifyContent={'space-between'}>
        <Grid item xs={12}>
          <BoardUI />
        </Grid>
      </Box>
    </Grid>
  );
}
