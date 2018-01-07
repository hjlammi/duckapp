// Component representing all the duck sigtings.

import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Sighting from './Sighting';

class Sightings extends Component {
  constructor(props) {
    super();

    this.state = {
      sortOrder: 1
    }
  }

  handleOrderChange = (event, index, value) => {
    this.setState({
      sortOrder: value
    });
  }

  static sortAlphabetically(sightings) {
    sightings.sort((a, b) => {
      const speciesA = a.species.toUpperCase();
      const speciesB = b.species.toUpperCase();
      if (speciesA < speciesB) {
        return -1;
      } else if (speciesA > speciesB) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  static sortFromLatestToOldest(sightings) {
    sightings.sort((a, b) => {
      if (a.dateTime > b.dateTime) {
        return -1;
      } else if (a.dateTime < b.dateTime) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  static sortFromOldestToLatest(sightings) {
    sightings.sort((a, b) => {
      if (a.dateTime < b.dateTime) {
        return -1;
      } else if (a.dateTime > b.dateTime) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  render() {
    const sightings = this.props.sightings;
    // Let's make a clone of the sightings array to avoid modifying the original sightings in the App component.
    const sightingsClone = sightings.slice(0);
    // Sightings can be ordered either alphabetically, from latest to the oldest or from oldest to the latest sightings.
    if (this.state.sortOrder === 3) {
      Sightings.sortAlphabetically(sightingsClone);
    } else if (this.state.sortOrder === 1) {
      Sightings.sortFromLatestToOldest(sightingsClone);
    } else if (this.state.sortOrder === 2) {
      Sightings.sortFromOldestToLatest(sightingsClone);
    }

    return (
      <div>
        <div>
          <Subheader style={{lineHeight: "1em", paddingTop: "15px"}}>List sightings:</Subheader>
          <DropDownMenu value={this.state.sortOrder} onChange={this.handleOrderChange}>
            <MenuItem value={1} primaryText="latest sighting first"/>
            <MenuItem value={2} primaryText="oldest sighting first"/>
            <MenuItem value={3} primaryText="in alphabetical order"/>
          </DropDownMenu>
        </div>
        <ul>
          {sightingsClone.map(sighting =>
            <Sighting
              key={sighting.id}
              species={sighting.species}
              description={sighting.description}
              count={sighting.count}
              dateTime={sighting.dateTime}
            />
          )}
        </ul>
      </div>
    )
  }
}

export default Sightings;
