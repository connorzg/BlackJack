import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      deck: []
    }
  }

  // Generate a deck array
  _buildDeck() {
    let deck = [];
    let values = ["2","3","4","5","6","7","8","9","10","J","Q","K","A"];
    let suits = ["C","D","H","S"];

    values.forEach((value) => {
      suits.forEach((suit) => {
        deck.push(value + suit);
      })
    })

    // Deck is made, set it to state and shuffle it
    this.setState({ deck }, () => this._shuffle());
  }

  // Fisher–Yates Shuffle
  _shuffle() {
    let deck = this.state.deck;
    let currentIndex = deck.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = deck[currentIndex];
      deck[currentIndex] = deck[randomIndex];
      deck[randomIndex] = temporaryValue;
    }
    console.log(deck);
    this.setState({ deck });
  }

  componentWillMount() {
    this._buildDeck();
  }


  // Currently will render 3 random cards
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Blackjack Baby</h2>
        </div>
        <img src={require(`../public/images/cards/${this.state.deck[0]}.png`)} role="presentation" />
        <img src={require(`../public/images/cards/${this.state.deck[1]}.png`)} role="presentation" />
        <img src={require(`../public/images/cards/${this.state.deck[3]}.png`)} role="presentation" />
      </div>
    );
  }
}

export default App;
