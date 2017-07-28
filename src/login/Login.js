/**
 * Copyright 2017 KIM SEUNG YEON.
 * manbo91@naver.com
 * https://github.com/manbo91
 * @flow
 */

'use strict';

import React from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
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
      email: '',
      password: '',
    };

    (this: any).onPressNavAuth = this.onPressNavAuth.bind(this);
    (this: any).logInEmail = this.logInEmail.bind(this);
    (this: any).logInFacebook = this.logInFacebook.bind(this);
    (this: any).logInGoogle = this.logInGoogle.bind(this);
  }

  state: {
    email: string;
    password: string;
  }

  onPressNavAuth(): void {
    this.setState({ email: '', password: '' });
    this.props.navigation.navigate('Auth');
  }

  logInEmail() {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
      const uid = firebase.auth().currentUser.uid;
      this.props.login(uid);
    }).catch((error) => {
      const { message } = error;
      alert(message);
      console.log(message);
    });
  }

  async logInFacebook() {
    const { type, token } =
    await Expo.Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
      permissions: ['public_profile', 'email'],
      behavior: 'native'
    });
    if (type === 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebase.auth().signInWithCredential(credential).then(() => {
        const uid = firebase.auth().currentUser.uid;
        this.props.login(uid);
      }).catch((error) => {
        const { message } = error;
        alert(message);
        console.log(message);
      });
    } else {
      alert('login failed');
    }
  }

  async logInGoogle() {
    const result = await Expo.Google.logInAsync({
      androidClientId: ANDROID_CLIENT_ID,
      iosClientId: IOS_CLIENT_ID,
      scopes: ['profile', 'email'],
      behavior: 'web',
    });

    if (result.type === 'success') {
      const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken);
      firebase.auth().signInWithCredential(credential).then(() => {
        const uid = firebase.auth().currentUser.uid;
        this.props.login(uid);
      }).catch((error) => {
        const { message } = error;
        alert(message);
        console.log(message);
      });
    } else {
      alert('login failed');
    }
  }

  props: {
    login: Function;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Login with Email</Text>
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
          title="Login with Email"
          onPress={this.logInEmail}
        />
        <Button
          title="Login with Facebook"
          onPress={this.logInFacebook}
        />
        <Button
          title="Login with Google"
          onPress={this.logInGoogle}
        />
        <Button
          title="Sign Up"
          onPress={this.onPressNavAuth}
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

export default connect(null, { login })(Login);
