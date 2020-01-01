import React, { Component } from 'react';
import { SeqViz } from 'seqviz';
import data from '../sequences.json';
import './Sequences.css';

export default class Sequences extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sequences: JSON.parse(JSON.stringify(data.sequences))
    };
  }
  render() {
    return (
      <div>
        <h1>Sequences</h1>

        {this.state.sequences.map((sequence, index) => {
          return (
            <div key={index} className='seqviz-container'>
              <p>{sequence.sequenceDescription}</p>
              <SeqViz
                name={sequence.sequenceName}
                seq={sequence.sequence}
                annotations={[
                  { name: 'promoter', start: 0, end: 34, direction: 1 }
                ]}
                size={{ height: 400, width: 400 }}
              />
            </div>
          );
        })}
      </div>
    );
  }
}
