import React, { Component, useState } from 'react';
import './MySequences.css';
import Search from '../Search';
import { URL } from '../config.js';

// Fetch existing DNA sequences from our storage and pass them as props to Search component
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
