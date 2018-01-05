/*The welcome page component that is rendered initially.*/

import React, { Component } from 'react';
// Let's me navigate inside my app.
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="home">
        <h2>What's up, duck!</h2>
        <p>
          Welcome to the greatest duck sighting app ever!
        </p>
        <h3 style={{marginBottom: "5px"}}>Here you can</h3>
          <ul style={{marginTop: "5px", marginLeft: "10px"}}>
            <li style={{marginBottom: "5px"}}><Link to="/report">report</Link> a duck sighting you made and</li>
            <li><Link to="/list">browse a list</Link> of all the reported duck sightings.</li>
          </ul>
      </div>
    );
  }
}

export default Home;
