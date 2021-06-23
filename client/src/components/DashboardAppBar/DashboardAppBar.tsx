import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import useStyles from './useStyles';

const DashboardAppBar = (): JSX.Element => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { currentBoard, boardTitles, fetchBoard } = useBoard();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleMenuItem = (index: number) => {
    if (loggedInUser.boards && loggedInUser.boards.length > index) {
      fetchBoard(loggedInUser.boards[index]);
      handleCloseMenu();
    }
  };

  return (
    <AppBar className={classes.appbar}>
      <Toolbar className={classes.toolbar}>
        <Typography className={classes.boardTitle}>{currentBoard.title}</Typography>

        <IconButton onClick={handleClick}>
          <MenuIcon className={classes.menuIcon} />
        </IconButton>
        <Drawer anchor="right" open={open} onClose={handleCloseMenu}>
          <List>
            {boardTitles.map((text, index) => (
              <ListItem button key={text} onClick={() => handleMenuItem(index)}>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardAppBar;
