import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      deck: [],
      player1: [],
      hand: [],
      dealer: [],
      dealerHand: [],
      bust: false,
      money: 2500,
      handValue: 0,
      dealerHandValue: 0
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
    let dealer = [deck.pop(), deck.pop()];
    console.log(player1);
    this.setState({ deck, player1, dealer }, () => {
      this._renderPlayerHand();
      this._renderDealerHand();
    })
  }

  // "HIT ME"
  _handleHit() {
    let deck = this.state.deck;
    let player1 = this.state.player1;
    let newCard = deck.pop();
    player1.push(newCard);
    this.setState({player1, deck},() => {
      console.log(this.state.player1, this.state.deck);
      this._renderPlayerHand();
      this._renderDealerHand();
    })
  }

  _handleStay() {
    // TODO when math incorporated
  }

  // Dynamically render the cards in a player's hand
  _renderPlayerHand() {
    let p1 = this.state.player1;
    let hand = [];
    let handValue = 0;
    for (var i = 0; i < p1.length; i++) {
      let value = this._getCardValue(p1[i], handValue);
      handValue += value;
      // the deck array values match the image filenames
      hand.push(<img key={i} value={value} src={require(`../public/images/cards/${p1[i]}.png`)} alt={p1[i]} />)
    }
    console.log(handValue);
    if (handValue > 21) {
      console.log("BUST");
      this.setState({ bust: true });
    }
    this.setState({ hand, handValue });
  }

  _renderDealerHand() {
    let dealer = this.state.dealer;
    let dealerHand = [];
    let dealerHandValue = this.state.dealerHandValue;
    for (var i = 0; i < dealer.length; i++) {
      let value = this._getCardValue(dealer[i], dealerHandValue);
      dealerHandValue += value;
      dealerHand.push(<img key={i} value={value} src={require(`../public/images/cards/${dealer[i]}.png`)} alt={dealer[i]} />)
    }
    console.log(dealerHandValue, dealer);
    this.setState({ dealerHand });

  }

  _getCardValue(cardValue, handValue) {
    // Suits are irrelevent so value only needs the first character (except 10)
    if (cardValue[0] + cardValue[1] !== "10") {
      cardValue = cardValue[0];
    } else {
      return +(cardValue[0] + cardValue[1]);
    }
    // Ace Logic
    if (cardValue === "A") {
      cardValue = 11;
      if (handValue + cardValue > 21) {
        return cardValue = 1;
      } else {
        return cardValue;
      }
    // Handles Facecards
    } else if (cardValue.match(/[QKJ]/)) {
      return 10;
    // Return all other number Cards
    } else {
      return +cardValue;
    }
  }

  // Reset the game after player/dealer busts or deal is won/lost
  resetGame() {
    if (this.state.bust) {
      this._buildDeck();
    }
  }

  // build the shuffled deck on app start
  componentWillMount() {
    this._buildDeck();
  }

  // Currently will render 3 random cards
  render() {
    let roundOver;

    if (this.state.bust) {
      roundOver = <h1>BUST</h1>
    }

    if (this.state.handValue === 21) {
      roundOver = <h1>BLACKJACK</h1>
    }

    return (
      <div className="App">
        <div className="App-header">
          <h2>Blackjack Baby</h2>
        </div>
        <div className="Board">
          <button onClick={() => this._handleHit()}>Hit</button>
          <button onClick={() => this._handleStay()}>Stay</button>
          <button onClick={() => this.resetGame()}>Play Again?</button>
          <h4 className="Status">Total Value: {this.state.handValue}</h4>
          <h4 className="Status">Money: {this.state.money}</h4>

          <div ref="p1" className="Player1">
            {roundOver}
            {this.state.hand}
          </div>
          <div>
            {this.state.dealerHand}
          </div>
        </div>

      </div>
    );
  }
}

export default App;
