import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

class RandomNumber extends Component {

  static propType = {
    randomNumber: PropTypes.number.isRequired,
  }

  handlePress = () => {
    console.log(this.props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={[styles.random, this.props.selected && styles.selected]}>{this.props.randomNumber}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  random: {
    backgroundColor: '#999',
    width: 100,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },
  selected: {
    opacity: 0.3,
  }
});

export default RandomNumber;
