/* This is a web application for everyone who loves ducks!
   Created by Heidi Lammi-Mihaljov (heidi.lammi@mihaljov.info) 22 November 2017.
   Last modified 23.11.2017.
*/

import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import { Redirect } from 'react-router-dom';
import Home from './Home';
import Report from './Report';
import List from './List';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  onTabChange = (value) => {
    this.props.history.push(value);
  }

  render() {
    const pathnames = ["/home", "/report", "/list"];

    let currentTab;

    if (pathnames.includes(this.props.location.pathname)) {
      currentTab = this.props.location.pathname;
    } else {
      return (
        <Redirect to="/home" />
      )
    }

    return (
      <MuiThemeProvider>
        <div>
          <Tabs
            value={currentTab}
            onChange={this.onTabChange}>
            <Tab label="home" value="/home">
              <Home />
            </Tab>
            <Tab label="report" value="/report">
              <Report />
            </Tab>
            <Tab label="list" value="/list">
              <List />
            </Tab>
          </Tabs>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
