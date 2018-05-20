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
    isDisabled: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired,
  }

  handleSubmit = () => {
    this.props.onPress(this.props.id)
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handleSubmit}>
        <Text style={[styles.random, this.props.isDisabled && styles.disabled]}>{this.props.randomNumber}</Text>
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
  disabled: {
    opacity: 0.3,
  }
});

export default RandomNumber;
