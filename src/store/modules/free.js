import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';
import { Storage } from 'lib/storage';

/* 액션 타입 */
export const VIEW_BOARD = 'free/VIEW_BOARD'; //게시판 정보 가져오기
export const LIST_BEST = 'free/LIST_BEST'; //인기글 목록 가져오기
export const LIST_POST = 'free/LIST_POST'; //글목록 가져오기
export const POST_INFO = 'free/POST_INFO'; //글 정보 가져오기
export const GET_POST_REPLY = 'free/GET_POST_REPLY'; //댓글 리스트 가져오기

/* 액션 생성자 */
export const getBoardInfo = createAction(VIEW_BOARD, api.getBoardInfo);
export const getBestPostList = createAction(LIST_BEST, api.getBestPostList);
export const getPostList = createAction(LIST_POST, api.getPostList);
export const getPostInfo = createAction(POST_INFO, api.getPostInfo);
export const getPostReply = createAction(GET_POST_REPLY, api.getPostReply);

/* 초기 상태 정의 */
const initialState = Map({
    imageURL: '',
    boardInfo: {},
    bestPostList: [],
    postCount: 0,
    postList: [],
    postInfo: [],
    postReplyList: [],
    postReplyCount: 0,
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
            type: POST_INFO,
            onSuccess: (state, action) => {
                return state.set('postInfo', action.payload.data);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: GET_POST_REPLY,
            onSuccess: (state, action) => {
                return state
                    .set('postReplyList', action.payload.data.results)
                    .set('postReplyCount', action.payload.data.count);
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
