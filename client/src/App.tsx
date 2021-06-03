import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';

import React, { useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import TestProtectedRoute from './pages/TestProtectedRoute/TestProtectedRoute';

import './App.css';

function App(): JSX.Element {
  const [user, setUser] = useState(false);

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setUser(!user);
  };

  return (
    <MuiThemeProvider theme={theme}>
    
      <BrowserRouter>
        <SnackBarProvider>
          <SocketProvider>
            <Switch>
              <Route exact path="/test-protected-route" render={props => (
            <TestProtectedRoute
              {...props}
              user={user}
              handleLogin={handleLogin}
            />
          )}/>
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <ProtectedRoute exact path='/dashboard' user={user} component={Dashboard} />
              <Route exact path='/unauthorized' component={Unauthorized} />
            </Switch>
          </SocketProvider>
      </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
