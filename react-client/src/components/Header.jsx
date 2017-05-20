import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import LoginSignup from './LoginSignup';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.redirect = this.redirect.bind(this);
  }

  redirect() {
    this.props.login()
  }

  render() {
    return (
      <div>
        <AppBar
          title="moo2d5"
          iconElementLeft={<img
            src="./img/cow.png"
            width="50"
            height="50"
          />}
          iconElementRight={<FlatButton
            label="Login / Sign up"
            onClick={this.redirect} />}
        />
      </div>
    );
  }
}
export default Header;
