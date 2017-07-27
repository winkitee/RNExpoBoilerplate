/**
 * Copyright 2017 KIM SEUNG YEON.
 * manbo91@naver.com
 * https://github.com/manbo91
 * @flow
 */

'use strict';

import type { Action } from '../actions/types';

type State = {
  uid: string;
  isLoggedIn: boolean;
}

const initialState = {
  uid: '',
  isLoggedIn: false,
};

export default (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case 'LOGGED_IN':
      return { ...state, isLoggedIn: true, uid: action.uid };
    case 'LOGGED_OUT':
      return initialState;
    default:
      return state;
  }
};
