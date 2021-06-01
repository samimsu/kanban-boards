import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import AddIcon from '@material-ui/icons/Add';
// import AvatarDisplay from '../AvatarDisplay/AvatarDisplay';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const DashboardHeader = (): JSX.Element => {

  return (
    <Box>
        <Button
            startIcon={<DashboardOutlinedIcon />}
        >
            Dashboard
        </Button>

        <Button
            startIcon={<CalendarTodayOutlinedIcon />}
        >
            Calendar
            </Button>

        <Button
            startIcon={<AddIcon />}
        >
            Create board
        </Button>

        {/* Commented to prevent code breaking />*/}
        {/* <AvatarDisplay />*/}
        <Menu open={false}>
            <MenuItem>Logout</MenuItem>
            <MenuItem>Go ot profile</MenuItem>
        </Menu>

    </Box>
  );
};

export default DashboardHeader;
