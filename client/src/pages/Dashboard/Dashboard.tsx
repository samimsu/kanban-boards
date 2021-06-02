import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Box from '@material-ui/core/Box';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import CircularProgress from '@material-ui/core/CircularProgress';
import useStyles from './useStyles';
// import { useAuth } from '../../context/useAuthContext';
// import { useSocket } from '../../context/useSocketContext';
// import { useHistory } from 'react-router-dom';
// import ChatSideBanner from '../../components/ChatSideBanner/ChatSideBanner';
// import { useEffect } from 'react';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import DashboardAppBar from '../../components/DashboardAppBar/DashboardAppBar';
import BoardUI from '../../components/BoardUI/BoardUI';
import CreateBoardDialog from '../../components/CreateBoardDialog/CreateBoardDialog'
import CreateColumnDialog from '../../components/CreateColumnDialog/CreateColumnDialog'

export default function Dashboard(): JSX.Element {
  const classes = useStyles();

  // const { loggedInUser } = useAuth();
  // const { initSocket } = useSocket();

  // const history = useHistory();

  /* useEffect(() => {
    initSocket();
  }, [initSocket]); */

  /*if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  } */

  return (
    <Grid container component="main" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />

      <Grid item xs={12}>
        <DashboardHeader />
        <DashboardAppBar />
      </Grid>

      <Grid item>
        <CreateBoardDialog />
      </Grid>

      <Grid item>
      <CreateColumnDialog />
      </Grid>
      
      
      <Grid item xs={12}>
        <BoardUI />
      </Grid>

      
      
      {/*<Grid item className={classes.drawerWrapper}>
        <ChatSideBanner loggedInUser={loggedInUser} />
      </Grid>*/}
    </Grid>
  );
}