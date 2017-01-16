import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      deck: [],
      playerCount: 1,
      player1: []
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
      });
    });

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
    let player1= [deck.pop(), deck.pop()];
    this.setState({ deck, player1 }, () => console.log(this.state.player1));
  }

  // "HIT ME"
  _handleHit() {
    let deck = this.state.deck;
    let player1 = this.state.player1;
    let newCard = deck.pop();
    player1.push(newCard);
    this.setState({player1, deck},() => {
      console.log(this.state.player1, this.state.deck)
    })
  }

  // Dynamically render the cards in a player's hand
  _handlePlayerHand() {
    let p1 = this.state.player1
    let hand = [];
    for (var i = 0; i < p1.length; i++) {
      hand.push(<img key={i} src={require(`../public/images/cards/${p1[i]}.png`)} role="presentation" />)
    }
    return hand;
  }

  // build the shuffled deck on app start
  componentWillMount() {
    this._buildDeck();
  }

  // Currently will render 3 random cards
  render() {
    let hand = this._handlePlayerHand()

    return (
      <div className="App">
        <div className="App-header">
          <h2>Blackjack Baby</h2>
        </div>
        <div className="Player1">
          {hand}
        </div>
        <button onClick={() => this._handleHit()}>Hit</button>
        <button>Stay</button>
      </div>
    );
  }
}

export default App;
