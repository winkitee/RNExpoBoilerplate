/**
 * Copyright 2017 KIM SEUNG YEON.
 * manbo91@naver.com
 * https://github.com/manbo91
 * @flow
 */

'use strict';

import { TabNavigator } from 'react-navigation';

import Main from '../containers/Main';

export default TabNavigator({
  Home: { screen: Main }
});
