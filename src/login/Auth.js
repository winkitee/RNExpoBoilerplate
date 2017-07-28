/**
 * Copyright 2017 KIM SEUNG YEON.
 * manbo91@naver.com
 * https://github.com/manbo91
 * @flow
 */

'use strict';

import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { login } from '../actions';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };

    (this: any).signUpEmail = this.signUpEmail.bind(this);
  }

  signUpEmail() {
    const { email, password } = this.state;
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      alert('Sign Up success');
    }).catch((error) => {
      const { message } = error;
      alert(message);
      console.log(message);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Auth</Text>
        <View style={styles.rowContainer}>
          <Text>id</Text>
          <TextInput
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={styles.input}
            keyboardType="email-address"
            placeholder="email"
          />
        </View>
        <View style={styles.rowContainer}>
          <Text>pw</Text>
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            style={styles.input}
            secureTextEntry
            placeholder="password"
          />
        </View>
        <Button
          title="Sign Up"
          onPress={this.signUpEmail}
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
  },
  rowContainer: {
    flexDirection: 'row',
  },
  input: {
    margin: 10,
    width: 200,
    height: 50,
    backgroundColor: '#fcfcfc',
  }
});

export default connect(null, { login })(Auth);
