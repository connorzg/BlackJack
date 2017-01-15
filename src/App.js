import React, { Component } from 'react';
import './App.css';
const cards = ['2C','QC'];

class App extends Component {
  constructor() {
    super();
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
        <img src={require(`../public/images/cards/${cards[1]}.png`)} role="presentation" />
      </div>
    );
  }
}

export default App;
