import React, { Component } from 'react';
import axios from 'axios';
import './AddSequence.css';
import { Redirect } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { URL } from '../config.js';

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export default class AddSequence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      sequence: '',
      redirect: false,
      helperText: 'Enter Sequence',
      error: false,
      sequences: []
    };
  }
  // Grab existing sequences to be checked against when we try to add new sequence
  componentDidMount() {
    return fetch(URL + 'sequences/')
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .then(response => this.setState({ sequences: response }));
  }
  handleSubmit = event => {
    event.preventDefault();
    let okay = true;
    for (let i = 0; i < this.state.sequences.length; i++) {
      if (this.state.sequences[i].sequence === this.state.sequence) {
        okay = false;
        this.setState({
          helperText: 'Sequence already exists',
          error: true,
          redirect: false
        });
      }
    }
    if (okay) {
      return axios
        .post(
          URL + 'sequences/',
          {
            name: this.state.name,
            description: this.state.description,
            sequence: this.state.sequence
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        .then(response => this.setState({ redirect: true }))
        .catch(err => console.log(err));
    }
  };

  // For each character entry on sequence field, check to make sure characters are DNA letters
  handleSequenceChange = event => {
    var regex = /^[ACTG]+$/i;
    if (!regex.test(event.target.value)) {
      this.setState({
        helperText: 'The sequence is invalid',
        error: true
      });
    } else {
      this.setState({
        [event.target.name]: event.target.value,
        helperText: 'Enter Sequence',
        error: false
      });
    }
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleCancel = event => {
    this.setState({
      redirect: true
    });
  };
  render() {
    if (this.state.redirect === true) {
      return <Redirect to='/' />;
    }
    return (
      <div className='fullForm'>
        <form className={useStyles.root} noValidate autoComplete='off'>
          <div className='textField'>
            <TextField
              required
              id='name'
              fullWidth
              name='name'
              onChange={this.handleInputChange}
              label='Name'
              helperText='Enter sequence name'
            />
          </div>
          <div className='textField'>
            <TextField
              required
              id='description'
              fullWidth
              name='description'
              label='Description'
              onChange={this.handleInputChange}
              helperText='Enter sequence description'
            />
          </div>
          <div className='textField'>
            <TextField
              required
              id='sequence'
              multiline
              rowsMax='10'
              fullWidth
              name='sequence'
              label='Sequence'
              onChange={this.handleSequenceChange}
              helperText={this.state.helperText}
              error={this.state.error}
            />
          </div>
          <div className='buttons'>
            <div className='createButton' onClick={this.handleCancel}>
              <Button
                variant='contained'
                color='secondary'
                style={{ marginRight: 10 }}
              >
                Cancel
              </Button>
            </div>
            <div onClick={this.handleSubmit} className='createButton'>
              <Button variant='contained' color='primary'>
                Create
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
