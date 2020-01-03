import React, { Component, useState } from 'react';
import './MySequences.css';
import Search from '../Search';
import { URL } from '../config.js';

// MySequences is our root component for the searchable table
// We first grab all the sequences, then we hand them to a Search component 
// that handles everything else
export default class MySequences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sequences: [],
      sequence: {},
      isOpen: false
    };
  }
  componentDidMount() {
    return fetch(URL + 'sequences/')
      .then(res => res.json())
      .then(response =>
        this.setState({
          sequences: response.map(r => {
            r['seq'] = this.truncate(r.sequence);
            return r;
          })
        })
      );
  }

  truncate = string => {
    return string.length > 10 ? string.substring(0, 7) + '...' : string;
  };

  render() {
    return (
      <div>
        <Search content={this.state.sequences} />
      </div>
    );
  }
}
