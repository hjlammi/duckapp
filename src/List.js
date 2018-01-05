/*This page component will allow the user see a list of reported sightings.*/

import React, { Component } from 'react';
import Sightings from './Sightings';
import ActionHome from 'material-ui/svg-icons/action/home';

class List extends Component {
  navigateToTop = () => {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="sightings">
        <h2>All duck sightings</h2>
        <p>
          Here you can see a list of all the reported duck sightings.
        </p>
        <Sightings />
        <div onClick={this.navigateToTop} style={{textAlign: "center"}} className="link">
          <ActionHome/>
          <p>Navigate to top</p>
        </div>
      </div>
    );
  }
}

export default List;
