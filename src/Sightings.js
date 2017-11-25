import React, { Component } from 'react';
import Sighting from './Sighting';

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
            <Sighting
              key={sighting.id}
              species={sighting.species}
              description={sighting.description}
              count={sighting.count}
              dateTime={sighting.dateTime}/>
          )}
        </ul>
      </div>
    )
  }
}

export default Sightings;
