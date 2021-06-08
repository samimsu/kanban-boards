import React from 'react';
import useStyles from './useStyles';
import Button from '@material-ui/core/Button';

// interface Props {
//   // createBoardOpen: boolean;
//   // handleCloseCreateBoard: () => void;
// }

const AddCardButton = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <Button className={classes.addCardButton} variant="outlined" color="primary">
        Add card
      </Button>
    </div>
  );
};

export default AddCardButton;
