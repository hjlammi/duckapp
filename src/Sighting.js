import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import Redhead from './img/redhead.jpg'; // Image source: https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Redhead_-_Aythya_americana%2C_Oakley_Street%2C_Cambridge%2C_Maryland.jpg/1280px-Redhead_-_Aythya_americana%2C_Oakley_Street%2C_Cambridge%2C_Maryland.jpg
import Gadwall from './img/gadwall.jpg'; // Image source: https://upload.wikimedia.org/wikipedia/commons/d/d0/Gadwall_pair_RWD.jpg
import LesserScaup from './img/lesser_scaup.jpg'; // Image source: https://upload.wikimedia.org/wikipedia/commons/6/67/Lesser_Scaup_-_Aythya_affinis%2C_Oakley_Street%2C_Cambridge%2C_Maryland.jpg
import Canvasback from './img/canvasback.jpg'; // Image source: https://upload.wikimedia.org/wikipedia/commons/6/6a/Canvasback_pair2.jpg
import Mallard from './img/mallard.jpg'; // Image source: https://upload.wikimedia.org/wikipedia/commons/b/bf/Anas_platyrhynchos_male_female_quadrat.jpg
import RubberDuck from './img/duck.png'; // Image source: https://pixabay.com/en/duck-duckling-toy-rubber-baby-146967/

class Sighting extends Component {
  constructor(props) {
    super();

    this.state = {
      id: 0,
      dateTime: null,
      description: "",
      species: "",
      count: 0
    }
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      dateTime: this.props.dateTime,
      description: this.props.description,
      species: this.props.species,
      count: this.props.count
    })
  }

  render() {
    let duckImg;
    if (this.state.species === 'redhead') {
      duckImg = Redhead;
    } else if (this.state.species === 'gadwall') {
      duckImg = Gadwall;
    } else if (this.state.species === 'lesser scaup') {
      duckImg = LesserScaup;
    } else if (this.state.species === 'canvasback') {
      duckImg = Canvasback;
    } else if (this.state.species === 'mallard') {
      duckImg = Mallard;
    } else {
      duckImg = RubberDuck;
    }

    return (
      <div>
        <Card>
          <CardMedia
            overlay={<CardTitle
                      title={this.state.species}
                      subtitle={"Count: " + this.state.count + " duck" + ((this.state.count === 1) ? "" : "s")} />}
          >
            <img src={duckImg} alt=""/>
          </CardMedia>
          <CardText>
          {this.state.description}
          {this.state.dateTime}
          </CardText>
        </Card>
      </div>
    )
  }
}

export default Sighting;