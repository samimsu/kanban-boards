import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';

const DashboardAppBar = (): JSX.Element => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography>
          My School Board
        </Typography>

        <IconButton>
          <MenuIcon />
          <Menu open={false}></Menu>
        </IconButton>
      </Toolbar>
      
    </AppBar>
  );
};

export default DashboardAppBar;
