/**
 * Copyright 2017 KIM SEUNG YEON.
 * manbo91@naver.com
 * https://github.com/manbo91
 * @flow
 */

'use strict';

import { StackNavigator } from 'react-navigation';

import Login from './Login';
import Auth from './Auth';

export default StackNavigator({
  Login: { screen: Login },
  Auth: { screen: Auth },
});
