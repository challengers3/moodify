import React from 'react';
import { Switch, Route } from 'react-router-dom';

import LoginSignup from './LoginSignup';
import Main from './Main';
import Signup from './Signup';

const Router = (props) => (
  <Switch>
    <Route
      exact path="/"
      component={Main}
    />
    <Route
      path="/loginSignup"
      // component={LoginSignup}
    ><LoginSignup toLogin={props.toLogin}/></Route>
    <Route
      path="/signup"
      component={Signup}
    />
  </Switch>
);


export default Router;
