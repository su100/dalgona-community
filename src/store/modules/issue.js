import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';
import { Storage } from 'lib/storage';

/* 액션 타입 */
export const LIST_NEWS = 'issue/LIST_NEWS'; //실시간 연예뉴스 목록 가져오기
export const LIST_KEYWORD = 'issue/LIST_KEYWORD'; //기사 인기 키워드 가져오기
export const LIST_HOT_VOTE = 'issue/LIST_HOT_VOTE'; //실시간 인기 투표 목록 가져오기
export const LIST_VOTE = 'issue/LIST_VOTE'; //투표 목록 가져오기
export const VOTE_INFO = 'issue/VOTE_INFO'; //투표 정보 가져오기

/* 액션 생성자 */
export const getNewsList = createAction(LIST_NEWS, api.getNewsList);
export const getNewsKeyword = createAction(LIST_KEYWORD, api.getNewsKeyword);
export const getHotVoteList = createAction(LIST_HOT_VOTE, api.getHotVoteList);
export const getVoteList = createAction(LIST_VOTE, api.getVoteList);
export const getVoteInfo = createAction(VOTE_INFO, api.getVoteInfo);

/* 초기 상태 정의 */
const initialState = Map({
    newsCount: 0,
    newsList: [],
    newsKeyword: [],
    hotVoteList: [],
    voteCount: 0,
    voteList: [],
    voteInfo: [],
});

/* reducer + pender */
export default handleActions(
    {
        ...pender({
            type: LIST_NEWS,
            onSuccess: (state, action) => {
                const { count, results } = action.payload.data;
                return state.set('newsCount', count).set('newsList', results);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: LIST_KEYWORD,
            onSuccess: (state, action) => {
                return state.set('newsKeyword', action.payload.data);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
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
            type: LIST_VOTE,
            onSuccess: (state, action) => {
                const { count, results } = action.payload.data;
                return state.set('voteCount', count).set('voteList', results);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: VOTE_INFO,
            onSuccess: (state, action) => {
                return state.set('voteInfo', action.payload.data);
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
