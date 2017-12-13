import React, { Component } from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Subheader from 'material-ui/Subheader';
import Sighting from './Sighting';

class Sightings extends Component {
  constructor(props) {
    super();

    this.state = {
      sightings: [],
      value: 0
    }
  }

  sortSightings = (event, index, value) => {
    let sightings = this.state.sightings;
    if (value === 3) {
      Sightings.sortAlphabetically(sightings);
    } else if (value === 1) {
      Sightings.sortFromLatestToOldest(sightings);
    } else if (value === 2) {
      Sightings.sortFromOldestToLatest(sightings);
    }
    this.setState({
      value: value,
      sightings: sightings
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

  componentDidMount() {
    const address = "http://localhost:8081/sightings";
    fetch(address).then(response => {
      return response.json();
    }).then(sightings => {
      this.setState({
        sightings: sightings,
        value: 1
      });
    });
  }

  render() {
    return (
      <div>
        <div>
          <Subheader style={{lineHeight: "1em", paddingTop: "15px"}}>List sightings:</Subheader>
          <DropDownMenu value={this.state.value} onChange={this.sortSightings}>
            <MenuItem value={1} primaryText="latest sighting first"/>
            <MenuItem value={2} primaryText="oldest sighting first"/>
            <MenuItem value={3} primaryText="in alphabetical order"/>
          </DropDownMenu>
        </div>
        <ul>
          {this.state.sightings.map(sighting =>
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
