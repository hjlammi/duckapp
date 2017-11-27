import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      species: [],
      speciesIndex: null,
      speciesName: "",
      date: null,
      description: "",
      count: 0,
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
    this.setState({
      speciesIndex: index,
      speciesName: event.target.textContent
    });
  }

  selectDate = (event, date) => {
    this.setState({
      date: date.toISOString().split('T')[0]
    });
  }

  selectTime = (event, date) => {
    this.setState({
      time: date.toISOString().split('T')[1]
    });
  }

  updateDescription = (event, description) => {
    this.setState({
      description: description
    })
  }

  checkCount = (event, count) => {
    if (count === "") {
      this.setState({
        countError: "",
        count: 0
      });
    } else if (parseInt(count, 10) <= 0) {
      this.setState({
        countError: "The value must be at least 1",
        count: 0
      });
    } else if (!/^\d+$/.test(count)) {
      this.setState({
        countError: "Only numbers can be used",
        count: 0
      });
    } else {
      this.setState({
        countError: "",
        count: parseInt(count)
      });
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    const date = this.state.date;
    const time = this.state.time;
    const dateTime = date + "T" + time;

    const requestBody = {
      species: this.state.speciesName,
      description: this.state.description,
      dateTime: dateTime,
      count: this.state.count
    };

    const address = "http://localhost:8081/sightings";
    fetch(address, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => {
      console.log(res);
    })
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
        <form onSubmit={this.onSubmit}>
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
            onChange={this.selectDate}
          />
          <TimePicker
            format="24hr"
            floatingLabelText="Time of the sighting:"
            onChange={this.selectTime}
          />
          <TextField
            floatingLabelText="Description:"
            fullWidth={true}
            onChange={this.updateDescription} />
          <TextField
            floatingLabelText="Duck count:"
            errorText={this.state.countError}
            onChange={this.checkCount} />
          <br />
          <RaisedButton type="submit" label="Primary" primary={true} />
        </form>
      </div>
    );
  }
}

export default Report;
