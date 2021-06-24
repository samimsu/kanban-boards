import { Draggable } from 'react-beautiful-dnd';
import NaturalDragAnimation from 'natural-drag-animation-rbdnd';
import useStyles from './useStyles';
import { CSSProperties, useState } from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import TextField from '@material-ui/core/TextField';
import * as yup from 'yup';
import { Card } from '../../interface/Card';

interface CardProps {
  children: Card;
  index: number;
  renderCard: CallableFunction;
  disableCardDrag: boolean;
  column: string;
}

function CardUI({ children, index, renderCard, disableCardDrag, column }: CardProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('lg'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionFormik = useFormik({
    initialValues: {
      description: children.description,
    },
    onSubmit: (values) => {
      alert(JSON.stringify({ ...children, ...values }, null, 2));
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
    <>
      <Draggable draggableId={children._id} index={index} isDragDisabled={disableCardDrag}>
        {(provided, snapshot) => {
          return (
            <NaturalDragAnimation style={provided.draggableProps.style} snapshot={snapshot}>
              {(style: CSSProperties): JSX.Element => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  data-testid={`card-${children._id}`}
                  style={style}
                  onClick={handleClickOpen}
                >
                  <div className={classes.cardWrapper}>{renderCard(snapshot.isDragging)}</div>
                </div>
              )}
            </NaturalDragAnimation>
          );
        }}
      </Draggable>
      <Dialog
        onClose={handleClose}
        aria-labelledby={`${children.name}-card-details`}
        open={open}
        fullScreen={fullScreen}
      >
        <DialogTitle id={`${children.name}-card-details`} onClick={handleClose}>
          {children.name} in list &quot;{column}&quot;
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3}>
            <Grid item xl={8}>
              <Typography gutterBottom>Description: {children.description}</Typography>
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
                <Button color="primary" variant="contained" fullWidth type="submit">
                  Save
                </Button>
              </form>
              <Typography gutterBottom>Deadline: {children.deadline}</Typography>
              <Typography gutterBottom>Comments:</Typography>
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
                  fullWidth
                  type="submit"
                  disabled={!(commentFormik.isValid && commentFormik.dirty)}
                >
                  Save
                </Button>
              </form>
            </Grid>
            <Grid item xl={4}>
              <Typography gutterBottom>Add to card:</Typography>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Tag
                </Button>
              </DialogActions>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Check-list
                </Button>
              </DialogActions>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Deadline
                </Button>
              </DialogActions>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Attachment
                </Button>
              </DialogActions>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cover
                </Button>
              </DialogActions>
              <Typography gutterBottom>Actions:</Typography>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Move
                </Button>
              </DialogActions>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Copy
                </Button>
              </DialogActions>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Share
                </Button>
              </DialogActions>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Delete
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default CardUI;
