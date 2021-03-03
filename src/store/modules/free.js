import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';
import { Storage } from 'lib/storage';

/* 액션 타입 */
export const SIGN_UP = 'auth/SIGN_UP'; //회원가입 

/* 액션 생성자 */
export const signUp = createAction(SIGN_UP, api.signUp); 

/* 초기 상태 정의 */
const initialState = Map({ 
});

/* reducer + pender */
export default handleActions(
    {
         
    },
    initialState
);
