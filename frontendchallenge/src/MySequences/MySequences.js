import React, { Component, useState } from 'react';
import './MySequences.css';
import ReactDataGrid from 'react-data-grid';
import Search from '../Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { URL }from '../config.js' 

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
  handleClick = event => {
    this.setState({
      show: true
    });
  };
  hideModal = () => {
    this.setState({ show: false });
  };

  truncate = string => {
    return string.length > 10 ? string.substring(0, 7) + '...' : string;
  };

  

  render() {
    return (
      <div>
          <Search content={this.state.sequences}/>
      </div>
    );
  }
}
