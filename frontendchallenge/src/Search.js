import React, { Component, useState } from 'react';
import MySequences from './MySequences/MySequences';
import ReactDataGrid from 'react-data-grid';
import SpringModal from './SpringModal';
import './App.css';
import { Button } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd'
import { Redirect } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {URL} from './config.js'
import Upload from './Upload'
import { faUpload, faDownload } from '@fortawesome/free-solid-svg-icons';
const DNAFormatter = ({ value }) => {
  return SpringModal(value);
};

const columns = [
  {
    key: 'name',
    name: 'Name',
    editable: true,
    sortable: true,
    filterable: true
  },
  { key: 'description', name: 'Description', editable: true },
  { key: 'sequence', name: 'Sequence', editable: true, formatter: DNAFormatter }
];
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      initialRows: props.content,
      rows: props.content.slice(0),
      redirect: false,
      refresh: false
    };
  }
  handleChange = event => {
    this.setState({
      rows: [],
      query: event.target.value
    });
  };

  showSeq = seq => {
    let target = seq.name.toLowerCase();
    let term = this.state.query.toLowerCase();
    return target.search(term) !== -1;
  };

  handleGridSort = (sortColumn, sortDirection) => {
    const comparer = (a, b) => {
      let lowA = String(a[sortColumn]).toLowerCase();
      let lowB = String(b[sortColumn]).toLowerCase();
      if (sortDirection === 'ASC') {
        return lowA > lowB ? 1 : -1;
      }
      if (sortDirection === 'DESC') {
        return lowA < lowB ? 1 : -1;
      }
    };

    const rows =
      sortDirection === 'NONE'
        ? this.state.initialRows.slice(0)
        : this.state.rows.sort(comparer);

    this.setState({ rows });
  };

  rowGetter = i => {
    return this.state.rows[i];
  };
  showSequences = sequences => {
    // prevent squashing state once we have rows loaded

    if (this.state.rows.length < 1) {
      let shown = sequences.filter(this.showSeq);
      this.state.initialRows = shown;
      this.state.rows = shown.slice(0);
    }
    return (
        <div className='holder'>
      <ReactDataGrid
        columns={columns}
        rowGetter={this.rowGetter}
        rowsCount={this.state.rows.length}
        onGridSort={this.handleGridSort}
      /></div>
    );
  };

  downloadFile = () => {
      console.log('download')
      return fetch(URL + 'download/')
      .then(response => {
        response.blob().then(blob => {
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = 'sequences.json';
            a.click();
        })})
        .catch(err=> console.error(err))
  };

  goToAdd = () => {
      this.setState({
          redirect: true
      })
  }

  render() {
      {if (this.state.redirect === true) {
        return <Redirect to='/new' />;
      }}
      console.log('refreshing', this.state.refresh)
    return (
      <div>
        <form>
          <div className='topbar'>
            <Upload className='icon' style={{marginLeft: 10, marginBottom: 5, backgroundColor: 'white', float: 'right', position: 'absolute'}} state={this.state}/>
            <Button
              variant='contained'
              color='default'
              className='icon'
              onClick={this.downloadFile}
              style={{marginLeft: 10, marginBottom: 5, backgroundColor: 'white', float: 'right'}}
              startIcon={<CloudDownloadIcon />}
            >
              Download
            </Button>
         
            <span onClick={this.goToAdd}>
            <Button
              variant='contained'
              color='default'
              className='icon'
              style={{marginLeft: 10, marginBottom: 5, backgroundColor: 'white', float: 'right'}}
              startIcon={<PlaylistAddIcon />}
            >
              Add Sequence
            </Button>
            </span>
            <input
              placeholder='Search'
              className='searchbox'
              onChange={event => this.handleChange(event)}
              onKeyPress={this.props.onKeyPress}
              value={this.props.query}
            />
          </div>
        </form>
        {this.showSequences(this.props.content)}
      </div>
    );
  }
}

export default Search;
