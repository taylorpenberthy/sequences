import React, { Component } from 'react';
import logo from './logo.svg';
import {Link, Route, Switch} from 'react-router-dom'
import './App.css';
import AddSequence from './AddSequence/AddSequence'
import Sequences from './Sequences/Sequences'
import MySequences from './MySequences/MySequences'
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
        <nav>
          <Link to='/'>
            <h2>Home</h2>
          </Link>
          <Link to ='/new'>
            <h2>Add Sequence</h2>
          </Link>
          <Link to ='/sequences'>
            <h2>My Sequences</h2>
          </Link>
        </nav>
        </div>
        <main>
          <Switch>
            <Route exact path='/' component={Sequences}/>
            <Route path='/new' component={AddSequence}/>
            <Route exact path='/sequences' component={MySequences}/>
          </Switch>
        </main>
      </div>
    )
  }
}


