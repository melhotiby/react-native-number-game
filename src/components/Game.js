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
    this.state = {
      selectedNumbers: []
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
      this.state.selectedNumbers.includes(index)
    )
  }

  getRandomNumbers() {
    return (
      Array.from({ length: this.props.randomNumberCount }).map(
        () => 1 + Math.floor(10 * Math.random())
      )
    )
  }

  selectNumber = (index) => {
    this.setState((previousState) => ({selectedNumbers: [...previousState.selectedNumbers, index]}))
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
        <View style={styles.randomContainer}>
          { this.randomNumbers.map((randomNumber, index) =>
            <RandomNumber
              key={index}
              id={index}
              isDisabled={this.isNumberSelected(index)}
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
    backgroundColor: '#bbb',
    margin: 50,
    textAlign: 'center',
  },

  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
});
