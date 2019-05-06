/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-elements';
import { AppStyles } from './App.styles'

let timer;

export default class App extends Component {

  constructor() {
    super();
    this.initialCounter = {
      millisecond: 0,
      second: '00',
      minutes: 0
    };

    this.state = {
      counter: Object.assign({}, this.initialCounter),
      showStartBtn: true,
      actionBtnSize: 50
    }
  }

  startTimer() {
    this.setState({ showStartBtn: false });
    timer = setInterval(() => {
      this.setCounter();
    }, 1)
  }

  stopTimer() {
    this.setState({ showStartBtn: true });
    clearInterval(timer);
  }

  resetTimer() {
    this.setState({
      counter: Object.assign({}, this.initialCounter),
      showStartBtn: true
    });
    this.stopTimer();
  }

  setCounter() {
    let { millisecond, second, minutes } = Object.assign({}, this.state.counter);

    millisecond += 1;
    if (millisecond > 60) {
      millisecond = 0;
      second = Number(second) + 1;
      if (second < 9) {
        second = `0${second}`;
      }
    }
    if (Number(second) > 60) {
      millisecond = 0;
      second = '00';
      minutes += 1;
    }
    this.setState({ counter: { millisecond, second, minutes } });
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.counter}>
          <Text h1 style={styles.minutes}>{this.state.counter.minutes}</Text>
          <Text h1 style={styles.second}>:{this.state.counter.second}.</Text>
          <Text h4 style={styles.millisecond}>{this.state.counter.millisecond}</Text>
        </View>
        <View style={styles.actionBar}>
          {(this.state.showStartBtn) ?
            <Icon iconStyle={styles.actionBtn}
              name='play-circle'
              type='font-awesome' 
              size={this.state.actionBtnSize}
              onPress={() => this.startTimer()}></Icon> :
            <Icon iconStyle={styles.actionBtn}
              name='pause'
              size={this.state.actionBtnSize}
              onPress={() => this.stopTimer()}></Icon>}

          <Icon iconStyle={styles.actionBtn} name='autorenew'
            size={this.state.actionBtnSize} onPress={() => this.resetTimer()}></Icon>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create(AppStyles);
