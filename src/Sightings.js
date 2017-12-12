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
      value: 1
    }
  }

  sortSightings = (event, index, value) => {
    let sightings = this.state.sightings;
    if (value === 2) {
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
    } else if (value === 3) {
      sightings.sort((a, b) => {
        if (a.dateTime > b.dateTime) {
          return -1;
        } else if (a.dateTime < b.dateTime) {
          return 1;
        } else {
          return 0;
        }
      });
    } else if (value === 4) {
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
    this.setState({
      value: value,
      sightings: sightings
    });
  }

  componentDidMount() {
    const address = "http://localhost:8081/sightings";
    fetch(address).then(response => {
      return response.json();
    }).then(sightings => {
      this.setState({
        sightings: sightings
      });
    });
  }

  render() {
    return (
      <div>
        <Subheader style={{padding: "0", lineHeight: "36px"}}>Order duck sightings:</Subheader>
        <DropDownMenu value={this.state.value} onChange={this.sortSightings}>
          <MenuItem value={1} primaryText=""/>
          <MenuItem value={2} primaryText="in alphabetical order"/>
          <MenuItem value={3} primaryText="latest sighting first"/>
          <MenuItem value={4} primaryText="oldest sighting first"/>
        </DropDownMenu>
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
