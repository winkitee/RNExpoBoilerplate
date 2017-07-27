/**
 * Copyright 2017 KIM SEUNG YEON.
 * manbo91@naver.com
 * https://github.com/manbo91
 * @flow
 */

'use strict';

import Navigator from '../navigator/stack';

type State = any;
type Action = any;

export default function navigation(state: State, action: Action): State {
  return Navigator.router.getStateForAction(action, state);
}
