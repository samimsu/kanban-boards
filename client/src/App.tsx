import { MuiThemeProvider } from '@material-ui/core';
import { theme } from './themes/theme';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from './pages/Login/Login';
import Signup from './pages/SignUp/SignUp';
// import Dashboard from './pages/Dashboard/Dashboard';
import TestDashboard from './pages/TestDashboard/TestDashboard';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import { SocketProvider } from './context/useSocketContext';
import { SnackBarProvider } from './context/useSnackbarContext';

import React, { useEffect, useState } from 'react';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import TestLogin from './pages/TestLogin/TestLogin';

import './App.css';

function App(): JSX.Element {
  const [user, setUser] = useState(false);

  useEffect(() => {
    setUser(Boolean(Number(window.localStorage.getItem('user'))) || false);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('user', JSON.stringify(Number(user)));
  }, [user]);

  const handleLogout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    <Redirect to="/test-login" />;
    setUser(false);
  };

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
              <Route
                exact
                path="/test-login"
                render={(props) => <TestLogin {...props} user={user} handleLogin={handleLogin} />}
              />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <ProtectedRoute
                exact
                path="/test-dashboard"
                user={user}
                handleLogout={handleLogout}
                component={TestDashboard}
              />
              <Route exact path="/unauthorized" component={Unauthorized} />
            </Switch>
          </SocketProvider>
        </SnackBarProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
