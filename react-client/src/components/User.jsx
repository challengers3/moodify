import React from 'react';
import renderif from 'render-if';
import axios from 'axios';
import PastSearches from './PastSearches.jsx';
import PastSearchResults from './PastSearchResults.jsx';
import { Redirect, Link } from 'react-router-dom';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      loggedIn: false,
      pastSearchResults: [],
      loading: false,
      loginFB: false,
    };
    this.logout = this.logout.bind(this);
    this.redirect = this.redirect.bind(this);
    this.pastSearch = this.pastSearch.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
    this.loginFB = this.loginFB.bind(this);
  }


  componentDidMount() {
    axios.get('/check').then((res) => {
      if (res.data.statusCode === 200) {
        this.setState({ loggedIn: true });
      }
    })
  }

  logout() {
    FB.logout(console.log('FB logout'));
    axios.get('/logout').then((res) => {
      this.setState({ loggedIn: false, pastSearchResults: [] });
    });
  }

  redirect() {
    this.setState({ redirect: true });
  }

  pastSearch() {
    this.setState({ loading: true });
    axios.get('/pastSearches').then((res) => {
      this.setState({ pastSearchResults: res.data, loading: false });
    }).catch((err) => {
      console.log(err);
    });
  }

  statusChangeCallback (response) {
    console.log('statusChangeCallback');
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
          user.password = '*FBDefault*';
          axios.post('/login', user)
          .then((res) => {
            if (!res.data.errorMessage) {
              this.setState({ loggedIn: true })
            }
            axios.post('/signup', user)
            .then(this.setState({ loggedIn: true }))
          })
        });
      } else {
        console.log('User cancelled');
      }
    });
  }

  render() {
    const isRedirect = this.state.redirect;
    const isLogin = this.state.loggedIn;
    if (isRedirect) {
      return <Redirect push to="/loginSignup" />;
    }
    // else if (isloginFB) {
    //   return <Redirect push to="/" />;
    // }
    return (
      <div className="allUser">
        <div className="user">
          {renderif(!isLogin)(
            <div>
              <button className="loginButton" onClick={this.redirect}>
                Login/Signup!
              </button>
              {/* <button onClick={this.loginFB} className="loginButton">Facebook Login</button> */}
            </div>,
          )}
          {renderif(isLogin)(
            <button className="loginButton" onClick={this.logout}>
              Logout!
            </button>,
          )}
          {renderif(isLogin)(<PastSearches
            search={this.props.search}
            prev={this.props.prev} upDown={this.props.upDown}
            runUpDown={this.props.runUpDown}
            pastSearch={this.pastSearch}
          />)}
        </div>
        <div>
          <br /> {renderif(this.props.showPrev)(<PastSearchResults
            results={this.state.pastSearchResults}
            loading={this.state.loading}
            loadPastSearchResults={this.props.loadPastSearchResults}
          />)}
        </div>
      </div>
    );
  }
}

export default User;
