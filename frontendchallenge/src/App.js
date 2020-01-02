import React, { Component } from 'react';
import logo from './logo.svg';
import {Link, Route, Switch} from 'react-router-dom'
import './App.css';
import AddSequence from './AddSequence/AddSequence'
import Sequences from './Sequences/Sequences'
import MySequences from './MySequences/MySequences'
import SeqLogo from './SeqLogo1.png'
import * as config from './config.js' 
export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sequences: {}
    }
  }
  render() {
    return (
      <div>
        <div>
        <img src={SeqLogo} className='logo'></img>
        </div>
        <main>
          <Switch>
            <Route exact path='/' component={MySequences}/>
            <Route path='/new' component={AddSequence}/>
          </Switch>
        </main>
      </div>
    )
  }
}


