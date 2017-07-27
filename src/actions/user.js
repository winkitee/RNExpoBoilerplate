/**
 * Copyright 2017 KIM SEUNG YEON.
 * manbo91@naver.com
 * https://github.com/manbo91
 * @flow
 */

'use strict';

import * as firebase from 'firebase';
import type { Action, ThunkAction } from './types';

export const login = (uid: string): Action => ({ type: 'LOGGED_IN', uid });
export const logout = (): Action => ({ type: 'LOGGED_OUT' });

export function logged(): ThunkAction {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch({ type: 'LOGGED_IN', uid: user.uid });
      } else {
        dispatch({ type: 'LOGGED_OUT' });
      }
    });
  };
}
