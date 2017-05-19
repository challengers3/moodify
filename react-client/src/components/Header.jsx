import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
    this.redirect = this.redirect.bind(this);
    this.state.url = window.location.href;
  }

  redirect() {
    this.setState({redirect: true});
  }

  render() {
    if (this.state.redirect && this.state.url !== this.props.url) {
      return <Redirect push to="/"/>;
    }
    return (
      <AppBar 
        title='moo2d5'
        iconElementLeft={<img src="./img/cow.png" width="50" height="50"/>}
        iconElementRight={<FlatButton label="Login / Sign up" onTouchTap={this.redirect}/>}
      />
    );
  }
}
export default Header;
