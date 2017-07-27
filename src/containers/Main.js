/**
 * Copyright 2017 KIM SEUNG YEON.
 * manbo91@naver.com
 * https://github.com/manbo91
 * @flow
 */

'use strict';

import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import * as firebase from 'firebase';

class Main extends React.Component {
  static navigationOptions = {
    title: 'Main',
  }

  logOut() {
    firebase.auth().signOut();
    alert('logOut');
    this.setState({ user: '' });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Main</Text>
        <Button
          title="Logout"
          onPress={() => this.logOut()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default Main;
