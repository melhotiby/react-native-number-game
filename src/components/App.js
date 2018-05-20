import React, { Component } from 'react';
import Game from './Game';

class App extends Component {
  render() {
    return (
      <Game randomNumberCount={6} initialSeconds={10}/>
    );
  }
}

export default App;
