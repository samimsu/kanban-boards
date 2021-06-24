import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import useStyles from './useStyles';
import IconButton from '@material-ui/core/IconButton';
import { Card } from '../../interface/Card';
import { useFormik } from 'formik';
import * as yup from 'yup';
import CloseIcon from '@material-ui/icons/Close';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

interface Props {
  open: boolean;
  handleClose: () => void;
  column: string;
  children: Card;
}

const CardDialog = ({ children, open, handleClose, column }: Props): JSX.Element => {
  const classes = useStyles();

  const descriptionFormik = useFormik({
    initialValues: {
      description: children.description,
    },
    onSubmit: (values) => {
      children.description = values.description;
    },
  });

  const commentValidationSchema = yup.object({
    comment: yup.string().min(1).required(),
  });

  const commentFormik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: commentValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify({ ...values }, null, 2));
    },
  });

  return (
    <Dialog onClose={handleClose} aria-labelledby={`${children.name}-card-details`} open={open}>
      <Box className={classes.dialog}>
        <IconButton className={classes.closeButton} aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogTitle id={`${children.name}-card-details`}>
          <Typography className={classes.title}>
            <AssignmentIcon className={classes.icon} /> {children.name}
          </Typography>
          <Typography>in list &quot;{column}&quot;</Typography>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xs={8}>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography gutterBottom className={classes.header}>
                    <ImportContactsIcon className={classes.icon} /> Description:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <form onSubmit={descriptionFormik.handleSubmit}>
                    <TextField
                      fullWidth
                      id="description"
                      name="description"
                      multiline
                      rows={4}
                      variant="outlined"
                      value={descriptionFormik.values.description}
                      onChange={descriptionFormik.handleChange}
                    />
                    <Button color="primary" variant="contained" type="submit" className={classes.button}>
                      Save
                    </Button>
                  </form>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom className={classes.header}>
                    <ScheduleIcon className={classes.icon} />
                    Deadline:
                  </Typography>
                  <Typography>{children.deadline ? children.deadline : 'Add Date'}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography gutterBottom className={classes.header}>
                    <ChatBubbleOutlineIcon className={classes.icon} /> Add Comment:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <form onSubmit={commentFormik.handleSubmit}>
                    <TextField
                      placeholder="Write a comment..."
                      fullWidth
                      id="comment"
                      name="comment"
                      multiline
                      rows={4}
                      variant="outlined"
                      value={commentFormik.values.comment}
                      onChange={commentFormik.handleChange}
                    />
                    <Button
                      color="primary"
                      variant="contained"
                      type="submit"
                      disabled={!(commentFormik.isValid && commentFormik.dirty)}
                      className={classes.button}
                    >
                      Save
                    </Button>
                  </form>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4}>
              <Typography gutterBottom>Add to card:</Typography>
              <DialogActions>
                <Button color="secondary" fullWidth variant="contained">
                  Tag
                </Button>
              </DialogActions>
              <DialogActions>
                <Button color="secondary" fullWidth variant="contained">
                  Check-list
                </Button>
              </DialogActions>
              <DialogActions>
                <Button color="secondary" fullWidth variant="contained">
                  Deadline
                </Button>
              </DialogActions>
              <DialogActions>
                <Button color="secondary" fullWidth variant="contained">
                  Attachment
                </Button>
              </DialogActions>
              <DialogActions>
                <Button color="secondary" fullWidth variant="contained">
                  Cover
                </Button>
              </DialogActions>
              <Typography gutterBottom>Actions:</Typography>
              <DialogActions>
                <Button color="secondary" fullWidth variant="contained">
                  Move
                </Button>
              </DialogActions>
              <DialogActions>
                <Button color="secondary" fullWidth variant="contained">
                  Copy
                </Button>
              </DialogActions>
              <DialogActions>
                <Button color="secondary" fullWidth variant="contained">
                  Share
                </Button>
              </DialogActions>
              <DialogActions>
                <Button color="secondary" fullWidth variant="contained">
                  Delete
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default CardDialog;
