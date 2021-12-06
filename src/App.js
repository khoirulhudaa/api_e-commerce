import React, { Component } from 'react';
import './App.css';
import { Homepage } from './components';


export default class App extends Component {
 
  render() {
    return (
      <div className="App">
        <Homepage/>
      </div>
    )
  }
}