import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Button,
  Text
} from 'react-native';

import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle'

class Game extends Component {
  constructor(props){
    super(props);
    this.randomNumbers = this.getRandomNumbers();
    this.shuffledRandomNumbers = shuffle(this.randomNumbers);
    this.target = this.getTarget();
    this.gameStatus = 'PLAYING';
    this.calcGameStatus = this.calcGameStatus.bind(this);
    this.state = {
      selectedIds: [],
      remainingSeconds: this.props.initialSeconds
    }
  }

  componentDidMount(){
    this.intervalId = setInterval(() => {
      this.setState((previousState) => {
        return { remainingSeconds: previousState.remainingSeconds - 1};
      }, () => {
        if(this.state.remainingSeconds === 0){
          clearInterval(this.intervalId);
        }

      });
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  componentWillUpdate(nextProps, nextState) {
    if(
      nextState.selectedIds != this.state.selectedIds ||
      nextState.remainingSeconds === 0
    ) {
      this.gameStatus = this.calcGameStatus(nextState)
      if (this.gameStatus !== "PLAYING") {
        clearInterval(this.intervalId);
      }
      console.log(this.gameStatus);
    }
  }

  static propType = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
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
  calcGameStatus(nextState){
    const sumSelected = nextState.selectedIds.reduce((acc, curr) => {
      return acc + this.shuffledRandomNumbers[curr]
    }, 0)

    if(nextState.remainingSeconds === 0) return "LOST";
    if(sumSelected < this.target) return "PLAYING";
    if(sumSelected === this.target) return "WON";
    if(sumSelected > this.target) return "LOST";
  }

  selectNumber = (index) => {
    this.setState((previousState) => ({selectedIds: [...previousState.selectedIds, index]}))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${this.gameStatus}`]]}>{this.target}</Text>
        <View style={styles.randomContainer}>
          { this.shuffledRandomNumbers.map((randomNumber, index) =>
            <RandomNumber
              key={index}
              id={index}
              isDisabled={this.isNumberSelected(index) || this.gameStatus != 'PLAYING'}
              randomNumber={randomNumber}
              onPress={this.selectNumber}
              key={index}
            />
          )}
        </View>
        {this.gameStatus !== "PLAYING" && (
          <Button
            onPress={this.props.onPlayAgain}
            title="Play Again"
            color="#841584"
            accessibilityLabel="Play the random number game again"
          />
        )}
        <Text>{this.state.remainingSeconds}</Text>
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
