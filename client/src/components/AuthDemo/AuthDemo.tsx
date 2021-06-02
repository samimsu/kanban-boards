import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { Formik, FormikHelpers } from 'formik';
import { CircularProgress } from '@material-ui/core';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';

import useStyles from './useStyles';
import login from '../../helpers/APICalls/login';

const AuthDemo = (): JSX.Element => {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Formik
      initialValues={{
        email: 'admin@example.com',
        password: 'password',
      }}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <Box textAlign="right">
            <Button type="submit" className={classes.submit}>
              {isSubmitting ? <CircularProgress /> : 'Demo User'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default AuthDemo;
