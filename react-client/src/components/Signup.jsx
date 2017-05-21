import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../../dist/css/styles';
import Paper from 'material-ui/Paper';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

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
        <Paper zDepth={1} style={styles.login}>
          <div style={{textAlign: 'center'}}>Need to sign up?
          <br />
          <TextField
            type="text"
            className="inputText"
            name="usernameS"
            value={this.state.usernameS}
            placeholder="username"
            onChange={this.usernameChangeS}
          />
          <br />
          <TextField
            type="password"
            className="inputText"
            name="passwordS"
            value={this.state.passwordS}
            placeholder="password"
            onChange={this.passwordChangeS}
          />
          <br />
          <FlatButton
            onClick={this.handleSignup}
            className="loginButton"
          > Signup </FlatButton>
        </div> 
      </Paper>
    );
  }
}

export default Signup;
