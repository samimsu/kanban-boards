import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// eslint-disable-next-line
const ProtectedRoute = ({
  component: Component,
  user,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user) {
          return <Component {...rest} {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/unauthorized',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
      }}
    />
  );
};

export default ProtectedRoute;
