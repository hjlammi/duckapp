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
      date: null,
      time: null,
      description: "",
      count: "",
      countError: "",
      open: false,
      errorOpen: false,
      successOpen: false
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
        count: ""
      });
    } else if (parseInt(count, 10) <= 0) {
      this.setState({
        countError: "The value must be at least 1",
        count: ""
      });
    } else if (!/^\d+$/.test(count)) {
      this.setState({
        countError: "Only numbers can be used",
        count: ""
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
      if (res.status >= 400 && res.status < 600) {
        this.setState({
          errorOpen: true
        });
      } else {
        this.setState({
          successOpen: true
        });
      }
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

  closeSuccessDialog = () => {
    this.setState({
      successOpen: false,
      speciesIndex: null,
      date: null,
      time: null,
      description: "",
      count: "",
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
    if (this.state.description === "" || this.state.speciesName === "" || this.state.date === null ||
    this.state.time === null || this.state.count === "") {
      disabled = true;
    } else {
      disabled = false;
    }

    return (
      <div className="report">
        <h2>Report a duck sighting</h2>
        <p>
          Have you caught sight of a duck? We'd love to hear about it! Here you can report your sighting.
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
            value={this.state.date}
          />
          <TimePicker
            format="24hr"
            floatingLabelText="Time of the sighting:"
            onChange={this.selectTime}
            value={this.state.time}
          />
          <TextField
            floatingLabelText="Description:"
            fullWidth={true}
            onChange={this.updateDescription}
            value={this.state.description} />
          <TextField
            floatingLabelText="Duck count:"
            errorText={this.state.countError}
            onChange={this.checkCount}
            value={this.state.count} />
          <br />
          <RaisedButton
            type="submit"
            label="Submit"
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
          <Dialog
            title="Something went wrong!"
            actions={
              <FlatButton
              label="Ok"
              primary={true}
              onClick={() => this.setState({ errorOpen: false})}
              />
            }
            modal={true}
            open={this.state.errorOpen}
          >
            Unfortunately something went wrong and the data was not sent
          </Dialog>
          <Dialog
            title="Success!"
            actions={
              <FlatButton
              label="Ok"
              primary={true}
              onClick={this.closeSuccessDialog}
              />
            }
            modal={true}
            open={this.state.successOpen}
          >
            Data was sent succesfully!
          </Dialog>
      </div>
    );
  }
}

export default Report;
