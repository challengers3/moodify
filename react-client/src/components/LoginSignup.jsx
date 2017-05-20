import React from 'react';
import axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import Header from './Header';

const config = require('../../../config/index.js');
const Facebook_key = config.Facebook_key;

const testAPI = () => {
  FB.api('/me', (response) => {
    console.log('Successful login: ', response.name);
  });
};


class LoginSignup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameL: '',
      passwordL: '',
      usernameS: '',
      passwordS: '',
      redirect: false,
      directSignup: false,
      userError: '',
      signError: ''
    };

    this.loginFB = this.loginFB.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
    this.usernameChangeL = this.usernameChangeL.bind(this);
    this.passwordChangeL = this.passwordChangeL.bind(this);
  }


  componentDidMount() {
    window.fbAsyncInit = () => {
      FB.init({
        appId: Facebook_key,
        cookie: true,
        xfbml: true,
        version: 'v2.1',
      });
      FB.getLoginStatus((response) => {
        this.statusChangeCallback(response);
      });
    };

    (function (d, s, id) {
      let js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  usernameChangeL(e) { this.setState({ usernameL: e.target.value }); }
  passwordChangeL(e) { this.setState({ passwordL: e.target.value }); }

  login(username, password) {
    const loginInfo = { username, password };
    axios.post('/login', loginInfo)
    .then((res) => {
      if (!res.data.errorMessage) {
        this.setState({ redirect: true });
        console.log('Login successful!');
      } else if (res.data.errorMessage) {
        this.setState({
          // userError: res.data.errorMessage,
          directSignup: true,
        });
      }
    });
  }

  statusChangeCallback(response) {
    console.log('this.statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      testAPI();
    } else if (response.status === 'not_authorized') {
      console.log('Please log ' +
        'into this app.');
    } else {
      console.log('Please log ' +
      'into Facebook.');
    }
  }

  loginFB() {
    FB.login((response) => {
      if (response.authResponse) {
        FB.api('/me', (response) => {
          console.log(`FB Login, username: ${response.name}.`);
          const user = {};
          user.username = response.name;
          user.password = response.id;
          axios.post('/login', user)
          .then((res) => {
            if (!res.data.errorMessage) {
              axios.post('/signup', user)
              .then(this.setState({ redirect: true }))
            }
          })
        });
      } else {
        console.log('User cancelled');
        this.setState({ redirect: true })
      }
      FB.getLoginStatus(() => {
        this.statusChangeCallback(response);
      });
    }, { auth_type: 'reauthenticate' });
  }

  handleLogin(e) {
    e.preventDefault();
    this.login(this.state.usernameL, this.state.passwordL);
  }

  handleSignup(e) {
    e.preventDefault();
    this.signup(this.state.usernameS, this.state.passwordS);
  }


  render() {
    const isRedirect = this.state.redirect;
    const isDirectSignup = this.state.directSignup;

    if (isRedirect) {
      return <Redirect push to="/" />;
    }
    // else if (!isRedirect) {
    //   return <Redirect push to="/loginSignup" />;
    // }
    if (isDirectSignup) {
      return <Redirect push to="/signup" />;
    }
    return (
      <div>
        <Header />
        <div className="forms">
          <div className="loginForm">
        Have an account?
        <br />
            <input
              type="text"
              className="inputText"
              name="usernameL" value={this.state.usernameL}
              placeholder="username"
              onChange={this.usernameChangeL}
            />
            <br />
            <input
              type="password"
              className="inputText"
              name="passwordL"
              value={this.state.passwordL}
              placeholder="password"
              onChange={this.passwordChangeL}
            />
            <br />
            <button
              onClick={this.handleLogin}
              className="loginButton"
            > Login </button>
            <br />
            <button onClick={this.loginFB} className="loginButton">Facebook Login</button>
          </div>
        </div></div>
    );
  }
}

export default LoginSignup;
