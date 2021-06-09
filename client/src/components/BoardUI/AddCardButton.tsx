import React from 'react';
import useStyles from './useStyles';
import Button from '@material-ui/core/Button';
import CreateCardDialog from '../CreateCardDialog/CreateCardDialog';

const AddCardButton = (): JSX.Element => {
  const classes = useStyles();

  return (
    <div>
      <Button variant="outlined" color="primary">
        Add a card
      </Button>
      <CreateCardDialog />
    </div>
  );
};

export default AddCardButton;
