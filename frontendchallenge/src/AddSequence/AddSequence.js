import React, { Component } from 'react';
import axios from 'axios'
import './AddSequence.css'
export default class AddSequence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      sequence: '',
    };
  }
  handleSubmit = event => {
    console.log(this.state.name + 'this state')
    event.preventDefault();
    return axios
      .post('http://localhost:8000/api/sequences/', {
        name: this.state.name,
        description: this.state.description,
        sequence: this.state.sequence
      }
      )
      .then(response => console.log(response))
      .catch(err => console.log(err))
  }
  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // handleSequenceChange = event => {
  //   var regex = /(bdefhijklmnopqrsuvwxyz)/g
  //   if (event.target.value.includes(regex) === true) {
  //     console.log('nope!!!')
  //   }else {
  //     this.setState({
  //       [event.target.name]: event.target.value
  //     })
  //   }

  // }
  render() {
    return (
      <div className='form'>
        <div>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Sequence Name: </label>
              <br/>
              <input
                type='text'
                className='form'
                name='name'
              
                onChange={this.handleInputChange}
              />
            </div>

            <div>
            <label>Sequence Description: </label>
              <br/>
              <input
                type='text'
                className='form'
                name='description'
                
                onChange={this.handleInputChange}
              />
            </div>
            <div>
            <label>Sequence: </label>
              <br/>
              <input
                type='text'
                className='form'
                name='sequence'
           
                onChange={this.handleSequenceChange}
              />
            </div>
            <div>
              <button type='submit' onClick={this.handleSubmit}>
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
