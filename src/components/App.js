import React, { Component } from 'react';
import Game from './Game';

class App extends Component {
  constructor(props){
    super(props);
    this.resetGame = this.resetGame.bind(this);
    this.state = {
      gameId: 1,
    }
  }
  resetGame(){
    this.setState((previousState) => {
      return { gameId: previousState.gameId + 1 };
    });
  }
  render() {
    return (
      <Game onPlayAgain={this.resetGame}
            key={this.state.gameId}
            randomNumberCount={6}
            initialSeconds={10}
      />
    );
  }
}

export default App;
