import React, { Component } from 'react';
import './App.css';
const cards = ['2C','QC'];

class App extends Component {
  constructor() {
    super();
    this.state = {
      deck: []
    }
  }

  _shuffle() {}

  _buildDeck() {
    let deck = [];
    let values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
    let suits = ["C","D","H","S"];

    values.forEach((value) => {
      suits.forEach((suit) => {
        deck.push(value + suit);
      })
    })

    this.setState({ deck })
    // this.shuffle();
  }

  componentDidMount() {
    this._buildDeck();
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
