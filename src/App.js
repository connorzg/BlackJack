import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cards: []
    }
  }

  _getCards() {
    axios.get('../public/images/cards/2C.png')
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });     
    // this.setState({ cards });
  }

  componentDidMount() {
    this._getCards();
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Blackjack Baby</h2>
        </div>
      </div>
    );
  }
}

export default App;
