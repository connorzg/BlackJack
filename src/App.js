import React, { Component } from 'react';
import './App.css';
import fs from 'fs';

_getCards() {
  fs.readdir('../public/images/cards/', (err, cards) => {
    cards.forEach(card => {
      console.log(card);
    });
    this.setState({ cards });
  })
}

componentDidMount() {
  this._getCards();
}

class App extends Component {
  constructor() {
    this.state = {
      cards: []
    }
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
