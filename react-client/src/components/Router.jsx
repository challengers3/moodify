import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginSignup from './LoginSignup';
import Main from './Main';
import Signup from './Signup';

const Router = () => (
  <Switch>
    <Route
      exact path="/"
      component={Main}
    />
    <Route
      path="/loginSignup"
      component={LoginSignup}
    />
    <Route
      path="/signup"
      component={Signup}
    />
  </Switch>
);


export default Router;
