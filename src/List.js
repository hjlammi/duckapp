import React, { Component } from 'react';
import Sightings from './Sightings';

class List extends Component {
  render() {
    return (
      <div className="sightings">
        <h2>All duck sightings</h2>
        <p>
          Here you can see a list of all the reported duck sightings.
        </p>
        <Sightings />
      </div>
    );
  }
}

export default List;
