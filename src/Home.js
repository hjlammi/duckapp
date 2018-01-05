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
        <p>Here you can <Link to="/report">report</Link> a duck sighting you made and <Link to="/list">browse a list</Link> of all the reported duck sightings.</p>
      </div>
    );
  }
}

export default Home;
