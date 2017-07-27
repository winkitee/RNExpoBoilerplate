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
import Expo from 'expo';
import { connect } from 'react-redux';
import { login } from '../actions';
import {
  FACEBOOK_APP_ID,
  ANDROID_CLIENT_ID,
  IOS_CLIENT_ID
} from './config';

class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
  }

  constructor(props) {
    super(props);
    this.state = {
      user: '',
    };
  }

  async FacebookLogIn() {
    const { type, token } =
    await Expo.Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
        permissions: ['public_profile', 'email'],
        behavior: 'native'
    });
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential).then(() => {
        this.props.login();
      }).catch((err) => {
        console.log(err);
      });
    }
  }

  async GoogleLogIn() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: ANDROID_CLIENT_ID,
        iosClientId: IOS_CLIENT_ID,
        scopes: ['profile', 'email'],
        behavior: 'web',
      });

      if (result.type === 'success') {
        const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken);
        firebase.auth().signInWithCredential(credential).then(() => {
          this.props.login();
        }).catch((err) => {
          console.log(err);
        });
      }
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <Text>{this.state.user}</Text>
        <Button
          title="Login with Facebook"
          onPress={() => this.FacebookLogIn()}
        />
        <Button
          title="Login with Google"
          onPress={() => this.GoogleLogIn()}
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

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps, { login })(Login);
