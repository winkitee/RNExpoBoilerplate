/**
 * Copyright 2017 KIM SEUNG YEON.
 * manbo91@naver.com
 * https://github.com/manbo91
 * @flow
 */

'use strict';

import React from 'react';
import { connect } from 'react-redux';

import { logged } from './actions';
import LoginScreen from './login/root';
import AppNavigator from './navigator/stack';

class Home extends React.Component {
  componentWillMount() {
    this.props.logged();
  }

  props: {
    isLoggedIn: boolean;
    logged: Function;
  }

  render() {
    if (!this.props.isLoggedIn) return <LoginScreen />;
    return <AppNavigator />;
  }
}

function mapStateToProps(state: Object): Object {
  const { isLoggedIn } = state.user;
  return { isLoggedIn };
}

export default connect(mapStateToProps, { logged })(Home);
