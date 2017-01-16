import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      deck: [],
      playerCount: 1,
      player1: [],
      score: 0
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

  _handleStay() {
    // TODO when math incorporated
  }

  // Dynamically render the cards in a player's hand
  _renderPlayerHand() {
    let p1 = this.state.player1
    let hand = [];
    let score = this.state.score;
    for (var i = 0; i < p1.length; i++) {
      // the deck array matches the filename. Suits are irrelevent so value only needs first character.
      let value = this._getCardValue(p1[i]);
      score += value;
      hand.push(<img key={i} value={value} src={require(`../public/images/cards/${p1[i]}.png`)} role="presentation" />)
    }
    console.log(score);
    return hand;
  }

  _getCardValue(cardValue) {
    if (cardValue[0] + cardValue[1] !== "10") {
      cardValue = cardValue[0]
    }

    if (cardValue.match(/[A-Z]/)) {
      // TODO Ace logic
      return 10
    } else {
      return +cardValue
    }
  }

  _calculateScore () {
    // Need to figure out how to add card values and save to state
  }

  // build the shuffled deck on app start
  componentWillMount() {
    this._buildDeck();
  }

  // Currently will render 3 random cards
  render() {
    let hand = this._renderPlayerHand();

    return (
      <div className="App">
        <div className="App-header">
          <h2>Blackjack Baby</h2>
        </div>
        <div ref="p1" className="Player1">
          {hand}
        </div>
        <button onClick={() => this._handleHit()}>Hit</button>
        <button onClick={() => this._handleStay()}>Stay</button>
      </div>
    );
  }
}

export default App;
