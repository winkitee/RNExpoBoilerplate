/**
 * Copyright 2017 KIM SEUNG YEON.
 * manbo91@naver.com
 * https://github.com/manbo91
 * @flow
 */

'use strict';

import React from 'react';
import { View, Text, StyleSheet, Alert, Button } from 'react-native';
import * as firebase from 'firebase';
import Expo from 'expo';
import { connect } from 'react-redux';

const APP_ID = '214793565713294';

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
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, {
        permissions: ['public_profile', 'email'],
        behavior: 'native'
    });
    if (type === 'success') {
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      // Alert.alert(
      //   'Logged in!',
      //   `Hi ${(await response.json()).name}!`,
      // );
      const result = await response.json();
      console.log(result);
      console.log(token);

      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential)
        .then(() => {
          Alert.alert('logged');
          this.setState({ user: 'hi logged' });
        }).catch((err) => {
          console.log(err);
        });
    }
  }

  async GoogleLogIn() {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: '693864273617-biv2tgqc7n74jd4f8b0i33rvk0ab662g.apps.googleusercontent.com',
        iosClientId: '693864273617-n19r6tfdg9bj2qoh2m56nlseqcd06s0p.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
        behavior: 'web',
      });

      if (result.type === 'success') {
        console.log(result);
        console.log(result.accessToken);
        const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken);
        firebase.auth().signInWithCredential(credential)
          .then(() => {
            Alert.alert('logged');
            this.setState({ user: 'hi google logged' });
          }).catch((err) => {
            console.log(err);
          });
        // return result.accessToken;
      }
        console.log('cancelled');
        return { cancelled: true };
    } catch (e) {
      console.log(e);
      return { error: true };
    }
  }

  logOut() {
    firebase.auth().signOut();
    alert('logOut');
    this.setState({ user: '' });
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

function mapStateToProps(state) {
  return { state };
}

export default connect(mapStateToProps, {})(Login);
