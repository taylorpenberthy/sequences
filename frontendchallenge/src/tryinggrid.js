import React, { Component } from 'react';
import './MySequences.css';
import ReactDataGrid from 'react-data-grid'
import {ReactTable} from 'react-table'
const columns = [
    {key: 'name', name: 'Name', editable: true},
    {key: 'description', name: "Description", editable: true},
    {key: 'sequence', name: 'Sequence', editable: function(rowData){
        return 
    }}
]
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
          sequences: response
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
  
  getCellActions = (column, row) => {

  }
  render() {

    return (

      <div>
          <ReactDataGrid 
                columns={columns}
                rowGetter={i => this.state.sequences[i]}
                rowsCount={3}
                enableCellSelect={true}
                
                />
        {/* {this.state.sequences.map(sequence => {
          return (
            <div>
              <button
                onClick={() =>
                  this.setState({ sequence: sequence, isOpen: true })
                }
                className='hiddenModal'
              >
                Name: {sequence.name}
              </button>
            </div>
          );
        })} */}
        {this.state.isOpen && (
          <div className='modal'>
            <div className='innerModal'>
              <h3>Name: {this.state.sequence.name}</h3>
              <p>Description: {this.state.sequence.description}</p>
              <p className='sequence'>
                Sequence: {this.truncate(this.state.sequence.sequence)}
              </p>
            </div>
            <button onClick={() => this.setState({ isOpen: false })}>
              Close
            </button>
          </div>
        )}
      </div>
    );
  }
}
