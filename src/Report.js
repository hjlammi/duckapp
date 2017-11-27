import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';

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
    let DateTimeFormat = global.Intl.DateTimeFormat;
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
              <MenuItem
                value={index}
                key={sp.name}
                primaryText={sp.name} />
            )
          })}
        </SelectField>
        <DatePicker
          floatingLabelText="Date of the sighting:"
          formatDate={new DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          }).format}
        />
        <TimePicker
          format="24hr"
          floatingLabelText="Time of the sighting:"
        />
      </div>
    );
  }
}

export default Report;
