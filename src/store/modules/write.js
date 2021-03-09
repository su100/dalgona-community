import { createAction, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';
import { Storage } from 'lib/storage';

/* 액션 타입 */
export const ADD_POST = 'write/ADD_POST'; //실시간 인기투표

/* 액션 생성자 */
export const addPost = createAction(ADD_POST, api.addPost);

/* 초기 상태 정의 */
const initialState = Map({});

/* reducer + pender */
export default handleActions(
    {
        ...pender({
            type: ADD_POST,
            onSuccess: (state, action) => {
                const data = action.payload;
                console.log('gg');
                console.log(data);
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log('gg');
                console.log(data);
                return state;
            },
        }),
    },
    initialState
);
