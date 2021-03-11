import { createAction, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';
import { Storage } from 'lib/storage';

/* 액션 타입 */
export const LIST_HOT_VOTE = 'home/LIST_HOT_VOTE'; //실시간 인기투표
export const LIST_HOT_POST = 'home/LIST_HOT_POST'; //실시간 인기글
export const LIST_BOOKMARK = 'home/LIST_BOOKMARK'; //즐겨찾기 가져오기
export const LIST_NEWS = 'home/LIST_NEWS'; //실시간 연예뉴스 리스트 가져오기

/* 액션 생성자 */
export const getHotVoteList = createAction(LIST_HOT_VOTE, api.getHotVoteList);
export const getHotPostList = createAction(LIST_HOT_POST, api.getHotPostList);
export const getBookmarkList = createAction(LIST_BOOKMARK, api.getBookmarkList);
export const getNewsList = createAction(LIST_NEWS, api.getNewsList);

/* 초기 상태 정의 */
const initialState = Map({
    hotVoteList: [],
    hotPostList: [],
    bookmarkList: [],
    newsList: [],
});

/* reducer + pender */
export default handleActions(
    {
        ...pender({
            type: LIST_HOT_VOTE,
            onSuccess: (state, action) => {
                return state.set('hotVoteList', action.payload.data);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: LIST_HOT_POST,
            onSuccess: (state, action) => {
                return state.set('hotPostList', action.payload.data);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: LIST_BOOKMARK,
            onSuccess: (state, action) => {
                return state.set('bookmarkList', action.payload.data.bookmark);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: LIST_NEWS,
            onSuccess: (state, action) => {
                return state.set('newsList', action.payload.data.results.slice(0, 15));
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
