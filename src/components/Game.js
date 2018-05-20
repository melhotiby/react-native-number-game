import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';

import RandomNumber from './RandomNumber';

class Game extends Component {
  constructor(props){
    super(props);
    this.randomNumbers = this.getRandomNumbers();
    this.target = this.getTarget();
    this.gameStatus = this.gameStatus.bind(this);
    this.state = {
      selectedIds: []
    }
  }

  static propType = {
    randomNumberCount: PropTypes.number.isRequired,
  }

  getTarget() {
    return (
      this.randomNumbers
        .slice(0, 4)
        .reduce((acc, val) => acc + val, 0)
    )
  }

  isNumberSelected(index) {
    return (
      this.state.selectedIds.includes(index)
    )
  }

  getRandomNumbers() {
    return (
      Array.from({ length: this.props.randomNumberCount }).map(
        () => 1 + Math.floor(10 * Math.random())
      )
    )
  }

  // PLAYING, WON, LOST
  gameStatus(){
    const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr]
    }, 0)

    if(sumSelected < this.target) return "PLAYING";
    if(sumSelected === this.target) return "WON";
    if(sumSelected > this.target) return "LOST";
  }

  selectNumber = (index) => {
    this.setState((previousState) => ({selectedIds: [...previousState.selectedIds, index]}))
  }

  render() {
    const gameStatus = this.gameStatus();

    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.randomContainer}>
          { this.randomNumbers.map((randomNumber, index) =>
            <RandomNumber
              key={index}
              id={index}
              isDisabled={this.isNumberSelected(index) || gameStatus != 'PLAYING'}
              randomNumber={randomNumber}
              onPress={this.selectNumber}
              key={index}
            />
          )}
        </View>
      </View>
    );
  }
}

export default Game;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
  },

  target: {
    fontSize: 50,
    margin: 50,
    textAlign: 'center',
  },

  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  STATUS_PLAYING: {
    backgroundColor: '#999',
  },

  STATUS_WON: {
    backgroundColor: '#008080',
  },

  STATUS_LOST: {
    backgroundColor: '#800000',
  },
});
