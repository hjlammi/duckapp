/* This is a web application for everyone who loves ducks!
   Created by Heidi Lammi-Mihaljov (heidi.lammi@mihaljov.info) 22 November 2017.
   Last modified 22.11.2017.
*/

import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <p>Hello Ducks!</p>
      </MuiThemeProvider>
    );
  }
}

export default App;
