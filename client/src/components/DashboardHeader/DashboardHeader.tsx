// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import DashboardOutlinedIcon from '@material-ui/icons/DashboardOutlined';
import CalendarTodayOutlinedIcon from '@material-ui/icons/CalendarTodayOutlined';
import AddIcon from '@material-ui/icons/Add';
import Avatar from '@material-ui/core/Avatar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import logo from '../../Images/logo.png'

const DashboardHeader = (): JSX.Element => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box display="flex">
        <img src={logo} alt="Logo" />

        <Button startIcon={<DashboardOutlinedIcon />}>
            Dashboard
        </Button>

        <Button startIcon={<CalendarTodayOutlinedIcon />}>
            Calendar
        </Button>

        <Button startIcon={<AddIcon />}>
            Create board
        </Button>

        <Avatar alt="avatar" onClick={handleClick}>S</Avatar>
        
        <Menu 
            anchorEl={anchorEl} 
            open={open}
            onClose={handleClose}
        >
                <MenuItem>Logout</MenuItem>
                <MenuItem>Go to profile</MenuItem>
        </Menu>
    </Box>
  );
};

export default DashboardHeader;
