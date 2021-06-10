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
import IconButton from '@material-ui/core/IconButton';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Box from '@material-ui/core/Box';
import CreateColumnDialog from '../../components/CreateColumnDialog/CreateColumnDialog';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const [createColumnOpen, setCreateColumnOpen] = useState(false);

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const history = useHistory();

  const handleClickCreateColumn = () => {
    setCreateColumnOpen(true);
  };

  const handleCloseCreateColumn = () => {
    setCreateColumnOpen(false);
  };

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

      <Grid item xs={12}>
        <DashboardHeader />
        <DashboardAppBar />
      </Grid>

      <Box className={classes.board} display={'flex'} justifyContent={'space-between'}>
        <Grid item>
          <IconButton className={classes.addColumnButton} onClick={handleClickCreateColumn}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
          <CreateColumnDialog createColumnOpen={createColumnOpen} handleCloseCreateColumn={handleCloseCreateColumn} />
        </Grid>

        <Grid item>
          <BoardUI />
        </Grid>

        <Grid item>
          <IconButton className={classes.addColumnButton} onClick={handleClickCreateColumn}>
            <AddCircleOutlineIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Box>
    </Grid>
  );
}
