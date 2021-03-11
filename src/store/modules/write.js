import { createAction, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';
import { Storage } from 'lib/storage';

/* 액션 타입 */
export const ADD_POST_IMAGE = 'write/ADD_POST_IMAGE'; //이미지 ADD
export const ADD_POST = 'write/ADD_POST'; //게시물 작성
export const ADD_POST_REPLY = 'write/ADD_POST_REPLY'; //투표 게시판 댓글 POST
export const UPDATE_POST_REPLY = 'write/UPDATE_POST_REPLY'; //투표 게시판 댓글 POST
export const DELETE_POST_REPLY = 'write/DELETE_POST_REPLY'; //투표 게시판 댓글 POST
export const ADD_POST_REREPLY = 'write/ADD_POST_REREPLY'; //투표 게시판 댓글 POST
export const UPDATE_POST_REREPLY = 'write/UPDATE_POST_REREPLY'; //투표 게시판 댓글 POST
export const DELETE_POST_REREPLY = 'write/DELETE_POST_REREPLY'; //투표 게시판 댓글 POST

/* 액션 생성자 */
export const addPostImage = createAction(ADD_POST_IMAGE, api.addPostImage);
export const addPost = createAction(ADD_POST, api.addPost);
export const addPostReply = createAction(ADD_POST_REPLY, api.addPostReply);
export const updatePostReply = createAction(UPDATE_POST_REPLY, api.updatePostReply);
export const deletePostReply = createAction(DELETE_POST_REPLY, api.deletePostReply);
export const addPostRereply = createAction(ADD_POST_REREPLY, api.addPostRereply);
export const updatePostRereply = createAction(UPDATE_POST_REREPLY, api.updatePostRereply);
export const deletePostRereply = createAction(DELETE_POST_REREPLY, api.deletePostRereply);

/* 초기 상태 정의 */
const initialState = Map({
    imageURL: '',
});

/* reducer + pender */
export default handleActions(
    {
        ...pender({
            type: ADD_POST_IMAGE,
            onSuccess: (state, action) => {
                return state.set('imageURL', action.payload.data.image);
            },
            onFailure: (state, action) => {
                alert('사진 업로드 문제가 발생했습니다');
                console.log(action.payload.response.data);
                return state;
            },
        }),
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
        ...pender({
            type: ADD_POST_REPLY,
            onSuccess: (state, action) => {
                console.log(action.payload.data);
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: UPDATE_POST_REPLY,
            onSuccess: (state, action) => {
                console.log(action.payload.data);
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: DELETE_POST_REPLY,
            onSuccess: (state, action) => {
                console.log(action.payload.data);
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: ADD_POST_REREPLY,
            onSuccess: (state, action) => {
                console.log(action.payload.data);
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: UPDATE_POST_REREPLY,
            onSuccess: (state, action) => {
                console.log(action.payload.data);
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: DELETE_POST_REREPLY,
            onSuccess: (state, action) => {
                console.log(action.payload.data);
                return state;
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
