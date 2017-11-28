import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      species: [],
      speciesIndex: null,
      speciesName: "",
      date: "",
      time: "",
      description: "",
      count: 0,
      countError: "",
      open: false,
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
      speciesName: event.target.textContent,
    });
  }

  selectDate = (event, date) => {
    this.setState({
      date: date
    });
  }

  selectTime = (event, date) => {
    this.setState({
      time: date
    });
  }

  updateDescription = (event, description) => {
    this.setState({
      description: description
    });
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
        count: parseInt(count, 10)
      });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const date = this.state.date.toISOString().split('T')[0];
    const time = this.state.time.toISOString().split('T')[1];
    const dateTime = date + "T" + time;

    const requestBody = {
      species: this.state.speciesName,
      description: this.state.description.trim(),
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
    });

    this.setState({
      open: false
    })
  }

  closeDialog = (event) => {
    this.setState({
      open: false
    });
  }

  openDialog = () => {
    this.setState({
      open: true
    });
  }

  render() {
    let DateTimeFormat = global.Intl.DateTimeFormat;

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.closeDialog}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit}
      />
    ];


    let disabled;
    if (this.state.description === "" || this.state.speciesName === "" || this.state.date === "" ||
    this.state.description === "" || this.state.count === 0) {
      disabled = true;
    } else {
      disabled = false;
    }

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
          <RaisedButton
            type="submit"
            label="Primary"
            primary={true}
            onClick={this.openDialog}
            disabled={disabled} />
          <Dialog
            title="Alert"
            actions={actions}
            modal={true}
            open={this.state.open}
          >
            Are you sure you want to send data?
          </Dialog>
      </div>
    );
  }
}

export default Report;
