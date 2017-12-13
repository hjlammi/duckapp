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
import Sightings from './Sightings';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Duck from './img/ducky.svg';
import {fade} from 'material-ui/utils/colorManipulator';
import { darkBlack, deepOrange600, teal400, teal300 } from 'material-ui/styles/colors';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  onTabChange = (value) => {
    this.props.history.push(value);
  }

  render() {

    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: teal300,
        primary2Color: teal400,
        primary3Color: teal400,
        accent1Color: deepOrange600,
        disabledColor: fade(darkBlack, 0.55),
        pickerHeaderColor: teal400
      }
    });


    const pathnames = ["/home", "/report", "/list"];

    let currentTab;

    if (pathnames.includes(this.props.location.pathname)) {
      currentTab = this.props.location.pathname;
    } else {
      return (
        <Redirect to="/home" />
      )
    }

    const paperStyle = {
      maxWidth: "800px",
      margin: "0 auto",
      minWidth: "300px",
      padding: "10px"
   }

    return (

      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <div>
            <AppBar
              className="appBar"
              title="DuckApp"
              iconElementLeft={
                <img
                  className="duckImg"
                  src={Duck}
                  style={{
                    width: "50px",
                    display: "inline-block"}}
                />
              }
            />
          </div>
          <Tabs
            value={currentTab}
            onChange={this.onTabChange}>
            <Tab label="home" value="/home">
              <Paper style={paperStyle} className="paper">
                <Home />
              </Paper>
            </Tab>
            <Tab label="report" value="/report">
              <Paper style={paperStyle} className="paper">
                <Report />
              </Paper>
            </Tab>
            <Tab label="list" value="/list">
              <Paper style={paperStyle} className="paper">
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
