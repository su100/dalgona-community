import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* 액션 타입 */
export const LUNA_BOARD = 'nav/LUNA_BOARD'; //  루나 게시판 가져오기
export const FREE_BOARD = 'nav/FREE_BOARD'; //  자유 게시판 가져오기
export const DALGONA_BOARD = 'nav/DALGONA_BOARD'; //  달고나 게시판 가져오기

/* 액션 생성자 */
export const getLunaBoard = createAction(LUNA_BOARD, api.getLunaBoard);
export const getFreeBoard = createAction(FREE_BOARD, api.getFreeBoard);
export const getDalgonaBoard = createAction(DALGONA_BOARD, api.getDalgonaBoard);

/* 초기 상태 정의 */
const initialState = Map({
  lunaBoard: [],
  freeBoard: [],
  dalgonaBoard: [],
});

/* reducer + pender */
export default handleActions(
  {
    ...pender({
      type: LUNA_BOARD,
      onSuccess: (state, action) => {
        const { data } = action.payload;
        return state.set('lunaBoard', data);
      },
      onFailure: (state, action) => {
        const { data } = action.payload.response;
        console.log(data);
        return state;
      },
    }),
    ...pender({
      type: FREE_BOARD,
      onSuccess: (state, action) => {
        const { data } = action.payload;
        return state.set('freeBoard', data);
      },
      onFailure: (state, action) => {
        const { data } = action.payload.response;
        console.log(data);
        return state;
      },
    }),
    ...pender({
      type: DALGONA_BOARD,
      onSuccess: (state, action) => {
        const { data } = action.payload;
        return state.set('dalgonaBoard', data);
      },
      onFailure: (state, action) => {
        const { data } = action.payload.response;
        console.log(data);
        return state;
      },
    }),
  },
  initialState
);
