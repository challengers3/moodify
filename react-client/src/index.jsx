import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router.jsx';
import pathToRegexp from 'path-to-regexp';
import { BrowserRouter } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

ReactDOM.render((
  <MuiThemeProvider>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </MuiThemeProvider>
), document.getElementById('root'));
