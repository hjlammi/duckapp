import React, { Component } from 'react';

class Sightings extends Component {
  constructor(props) {
    super();

    this.state = {
      sightings: []
    }
  }

  componentDidMount() {
    const address = "http://localhost:8081/sightings";
    fetch(address).then(response => {
      return response.json();
    }).then(sightings => {
      this.setState({
        sightings: sightings
      })
    })
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.sightings.map(sighting =>
            <li key={sighting.id}>{sighting.species}</li>
          )}
        </ul>
      </div>
    )
  }
}

export default Sightings;
