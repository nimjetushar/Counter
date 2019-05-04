/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { AppStyles } from './App.styles'

let timer;

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      counter: {
        millisecond: 0,
        second: 0,
        minutes: 0
      }
    }
  }

  startTimer() {
    timer = setInterval(() => {
      this.setCounter();
    }, 1)
  }

  stopTimer() {
    clearInterval(timer);
  }

  setCounter() {
    const counter = Object.assign({}, this.state.counter);
    counter.millisecond += 1;
    if (counter.millisecond > 60) {
      counter.millisecond = 0;
      counter.second += 1;
    }
    if (counter.second > 60) {
      counter.millisecond = 0;
      counter.second = 0;
      counter.minutes += 1;
    }
    this.setState({ 'counter': counter });
  }

  componentDidMount() {
    this.stopTimer();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.counter}>
          <Text style={styles.minutes}>{this.state.counter.minutes}</Text>
          <Text style={styles.second}>:{this.state.counter.second}.</Text>
          <Text style={styles.millisecond}>{this.state.counter.millisecond}</Text>
        </View>
        <View style={styles.actionBar}>
          <Icon name='play-circle' type='font-awesome' size={42}></Icon>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(AppStyles);
