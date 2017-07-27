/**
 * Copyright 2017 KIM SEUNG YEON.
 * manbo91@naver.com
 * https://github.com/manbo91
 * @flow
 */

'use strict';

import { StackNavigator } from 'react-navigation';

import Main from '../containers/Main';

export default StackNavigator({
  Home: { screen: Main }
});
