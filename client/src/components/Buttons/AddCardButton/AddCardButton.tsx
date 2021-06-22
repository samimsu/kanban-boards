import Button from '@material-ui/core/Button';
import useStyles from './useStyles';

const AddCardButton = (): JSX.Element => {
  const classes = useStyles();

  const handleClick = () => {
    console.log('clicked');
  };

  return (
    <Button className={classes.addCardButton} variant="contained" color="primary" onClick={handleClick}>
      Add a card
    </Button>
  );
};

export default AddCardButton;
