import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';
import { Typography } from '@material-ui/core';

interface Props {
  linkTo: string;
  asideText: string;
  btnText: string;
}

const AuthHeader = ({ linkTo, asideText, btnText }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box p={1} className={classes.authHeader}>
      <Grid container className={classes.root} direction="column">
        <Grid item>
          <Typography className={classes.accAside}>{asideText}</Typography>
        </Grid>
        <Grid item>
          <Link to={linkTo} className={classes.link}>
            {btnText}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthHeader;
