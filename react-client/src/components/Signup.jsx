import React from 'react';
import Header from './Header.jsx';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameS: '',
      passwordS: '',
      redirect: false,
    };
    this.usernameChangeS = this.usernameChangeS.bind(this);
    this.passwordChangeS = this.passwordChangeS.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  usernameChangeS(e) { this.setState({ usernameS: e.target.value }); }
  passwordChangeS(e) { this.setState({ passwordS: e.target.value }); }

  signup(username, password) {
    const signupInfo = { username, password };
    axios.post('/signup', signupInfo)
    .then((res) => {
      if (!res.data.errorMessage) {
        this.setState({ redirect: true });
        console.log('Welcome!');
      } else if (res.data.errorMessage) {
        // this.setState({ signError: res.data.errorMessage });
      }
    });
  }

  handleSignup(e) {
    e.preventDefault();
    this.signup(this.state.usernameS, this.state.passwordS);
  }

  render() {
    const isRedirect = this.state.redirect;
    if (isRedirect) {
      return <Redirect push to="/" />;
    }
    return (
      <div className="forms">
        <div className="signupForm">
          Need to sign up?
          <br />
          <input
            type="text"
            className="inputText"
            name="usernameS"
            value={this.state.usernameS}
            placeholder="username"
            onChange={this.usernameChangeS}
          />
          <br />
          <input
            type="password"
            className="inputText"
            name="passwordS"
            value={this.state.passwordS}
            placeholder="password"
            onChange={this.passwordChangeS}
          />
          <br />
          <button
            onClick={this.handleSignup}
            className="loginButton"
          > Signup </button>
          <br />
        </div>
      </div>
    );
  }
}

export default Signup;
