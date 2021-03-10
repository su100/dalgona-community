import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* 액션 타입 */
export const VIEW_BOARD = 'luna/VIEW_BOARD'; //게시판 정보 가져오기
export const LIST_BEST = 'luna/LIST_BEST'; //인기글 목록 가져오기
export const LIST_POST = 'luna/LIST_POST'; //글목록 가져오기
export const UPDATE_BOOKMARK = 'luna/UPDATE_BOOKMARK'; //즐겨찾기 추가 및 삭제

/* 액션 생성자 */
export const getBoardInfo = createAction(VIEW_BOARD, api.getBoardInfo);
export const getBestPostList = createAction(LIST_BEST, api.getBestPostList);
export const getPostList = createAction(LIST_POST, api.getPostList);
export const updateBookmark = createAction(UPDATE_BOOKMARK, api.updateBookmark);

/* 초기 상태 정의 */
const initialState = Map({
    boardInfo: {},
    bestPostList: [],
    postCount: 0,
    postList: [],
    bookmark: [],
});

/* reducer + pender */
export default handleActions(
    {
        ...pender({
            type: VIEW_BOARD,
            onSuccess: (state, action) => {
                return state.set('boardInfo', action.payload.data);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: LIST_BEST,
            onSuccess: (state, action) => {
                return state.set('bestPostList', action.payload.data);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: LIST_POST,
            onSuccess: (state, action) => {
                const { count, results } = action.payload.data;
                return state.set('postCount', count).set('postList', results);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: UPDATE_BOOKMARK,
            onSuccess: (state, action) => {
                return state.set('bookmark', action.payload.data);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
    },
    initialState
);
