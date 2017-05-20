import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Redirect, Link } from 'react-router-dom';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signup: false,
      login: false,
    };
    this.toLogin = this.toLogin.bind(this);
  }
  // let condRender;
  // if (!props.loginS) {
  //   condRender = (<FlatButton
  //     label="Login / Sign up"
  //     onClick={props.changetoLogin}
  //   />);
  // }
  // else if (path === "/loginSignup") {
  //   condRender = (<FlatButton
  //     label="Back"
  //     onClick={props.changetoLogin}
  //   />)
  // } else if (props.isRedirect) {
  //   condRender = (<FlatButton
  //     label="Logout"
  //     onClick={props.changetoLogin}
  //   />)
  // }

  toLogin() {
    console.log('to sign up');
    this.setState({ login: true });
    // return <Link to="/signup" />;
  }

  render() {
    const login = this.state.login;
    let condRender;
    if (login) {
      return <Redirect push to="/loginSignup" />;
    }
    if (!login) {
      condRender = (<FlatButton
        label="Login / Sign up"
        onClick={this.toLogin}
      />);
    }
    return (
      <div>
        <AppBar
          title="moo2d5"
          iconElementLeft={<img
            src="./img/cow.png"
            width="50"
            height="50"
          />}
          iconElementRight={condRender}
        />
      </div>
    )
  }
}

export default Header;
