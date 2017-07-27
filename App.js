/**
 * Copyright 2017 KIM SEUNG YEON.
 * manbo91@naver.com
 * https://github.com/manbo91
 * @flow
 */

'use strict';

import React from 'react';
import { View, StyleSheet } from 'react-native';
import * as firebase from 'firebase';
import { Constants } from 'expo';
import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';
import Home from './src/Home';

function app(): ReactClass<{}> {
  // Add user firebase project config
  const config: Object = {
    apiKey: 'AIzaSyB__xzNTaCyzPrgDBtq_4Qzym-YXdEU9Sg',
    authDomain: 'rnexpoboilerplate.firebaseapp.com',
    databaseURL: 'https://rnexpoboilerplate.firebaseio.com',
    projectId: 'rnexpoboilerplate',
    storageBucket: 'rnexpoboilerplate.appspot.com',
    messagingSenderId: '693864273617'
  };

  firebase.initializeApp(config);

  class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: true,
        store: configureStore(() => this.setState({ isLoading: false })),
      };
    }

    state: {
      isLoading: boolean;
      store: any;
    }

    render() {
      if (this.state.isLoading) return null;
      return (
        <Provider store={this.state.store}>
          <View style={styles.container}>
            <Home />
          </View>
        </Provider>
      );
    }
  }

  return App;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  }
});

export default app();
