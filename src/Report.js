import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      species: [],
      speciesIndex: null,
      countError: ""
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

  selectSpecies = (event, index, speciesIndex) => {
    console.log(index);
    this.setState({
      speciesIndex: index,
    });
  }

  checkCount = (event, count) => {
    if (count === "") {
      this.setState({
        countError: ""
      });
    } else if (parseInt(count, 10) <= 0) {
      this.setState({
        countError: "The value must be at least 1"
      });
    } else if (!/^\d+$/.test(count)) {
      this.setState({
        countError: "Only numbers can be used"
      });
    } else {
      this.setState({
        countError: ""
      })
    }
  }

  render() {
    let DateTimeFormat = global.Intl.DateTimeFormat;
    console.log(this.state);
    return (
      <div>
        <h2>Report a duck sighting</h2>
        <p>
          Have you caught sight of a duck? Here you can report your sighting.
        </p>
        <SelectField
          floatingLabelText="Duck species:"
          value={this.state.speciesIndex}
          onChange={this.selectSpecies}
        >
          {this.state.species.map((sp, index) => {
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
        <TextField
          floatingLabelText="Description:"
          fullWidth={true} />
        <TextField
          floatingLabelText="Duck count:"
          errorText={this.state.countError}
          onChange={this.checkCount} />
      </div>
    );
  }
}

export default Report;
