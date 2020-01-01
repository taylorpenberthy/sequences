import React, { Component, useState } from 'react';
import './MySequences.css';
import ReactDataGrid from 'react-data-grid';
import Search from '../Search'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SpringModal from '../SpringModal';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const DNAFormatter = ({ value }) => {
  return SpringModal(value);
  return <SpringModal text={value} />;
};

const columns = [
  { key: 'name', name: 'Name', editable: true, sortable: true, filterable: true },
  { key: 'description', name: 'Description', editable: true },
  { key: 'sequence', name: 'Sequence', editable: true, formatter: DNAFormatter }
];

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
    return fetch('http://localhost:8000/api/sequences/')
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
        <div>
        <ReactDataGrid
          columns={columns}
          rowGetter={i => this.state.sequences[i]}
          rowsCount={3}
          
        />
        </div>
       
      </div>
    );
  }
}
