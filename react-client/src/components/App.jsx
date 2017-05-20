import React from 'react';
import Router from './Router';
import Header from '../components/Header';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      main: false,
    };
    this.toLogin = this.toLogin.bind(this);
  }

  toLogin() {
    console.log('STATE FOR BAR', this.state.login)
    this.setState({
      login: !this.state.login,
    })
  }

  render() {
    return (
      <div>
        <Header
          {...this.state}
          toLogin={this.toLogin}
        />
        {this.props.children}
        <Router
          toLogin={this.toLogin}
        />
      </div>
    );
  }
}

export default App;
