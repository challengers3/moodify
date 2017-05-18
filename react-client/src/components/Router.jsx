import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import LoginSignup from './LoginSignup';
import App from './App';
import Signup from './Signup';

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" >
            <App />
          </Route>
          <Route path="/loginSignup">
            <LoginSignup />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default Router;
