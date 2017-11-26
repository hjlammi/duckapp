import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      species: [],
      value: null
    }
  }

  componentDidMount() {
    const address = "http://localhost:8081/species";
    fetch(address).then(response => {
      return response.json();
    }).then(species => {
      this.setState({
        species: species
      });
    });
  }

  selectSpecies = (event, index, value) => {
    this.setState({
      value: value,
    });
  }

  render() {
    let index = 1;
    return (
      <div>
        <h2>Report a duck sighting</h2>
        <p>
          Have you caught sight of a duck? Here you can report your sighting.
        </p>
        <SelectField
          floatingLabelText="Duck species:"
          value={this.state.value}
          onChange={this.selectSpecies}
        >
          {this.state.species.map(sp => {
            index++;
            return (
              <MenuItem value={index} key={sp.name} primaryText={sp.name} />
            )
          })}
        </SelectField>
      </div>
    );
  }
}

export default Report;
