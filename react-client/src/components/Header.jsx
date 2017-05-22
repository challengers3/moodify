import React from 'react';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';
import { Redirect, Link } from 'react-router-dom';

const Header = (props) => {

  const login = props.login;
  const inSession = props.inSession;
  let condRender;
  if (login) {
    condRender = (<FlatButton
      onClick={props.toLogin}
    ><Link to="/signup">Signup</Link></FlatButton>);
  } else {
    condRender = (<FlatButton
      onClick={props.toLogin}
    ><Link to="/loginSignup">Login</Link></FlatButton>);
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


export default Header;
