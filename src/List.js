import React, { Component } from 'react';
import Sightings from './Sightings';

class List extends Component {
  render() {
    return (
      <div>
        <h2>List all duck sightings</h2>
        <p>
          Here you can list a duck sighting.
        </p>
        <Sightings />
      </div>
    );
  }
}

export default List;
