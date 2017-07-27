/**
 * Copyright 2017 KIM SEUNG YEON.
 * manbo91@naver.com
 * https://github.com/manbo91
 * @flow
 */

'use strict';

export type Action =
    { type: 'LOGGED_IN', uid: string }
  | { type: 'LOGGED_OUT' }
  ;

export type Dispatch = (action: Action | ThunkAction) => any;
export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
