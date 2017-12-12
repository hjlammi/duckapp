/* This is a web application for everyone who loves ducks!
   Created by Heidi Lammi-Mihaljov (heidi.lammi@mihaljov.info) 22 November 2017.
   Last modified 23.11.2017.
*/

import injectTapEventPlugin from 'react-tap-event-plugin';
import React, { Component } from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import { Redirect } from 'react-router-dom';
import Home from './Home';
import Report from './Report';
import List from './List';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Duck from './img/duck.png';

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
          <AppBar
            title="DuckApp"
            iconElementLeft={
               <img
               src={Duck}
               style={{
                  width: "50px",
                  display: "inline-block"
                  }}
               />}
          />
          <Tabs
            value={currentTab}
            onChange={this.onTabChange}>
            <Tab label="home" value="/home">
              <Paper>
                <Home />
              </Paper>
            </Tab>
            <Tab label="report" value="/report">
              <Paper>
                <Report />
              </Paper>
            </Tab>
            <Tab label="list" value="/list">
              <Paper>
                <List />
              </Paper>
            </Tab>
          </Tabs>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
