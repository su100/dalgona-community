import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';
import { Storage } from 'lib/storage';

/* 액션 타입 */
export const LIST_NEWS = 'issue/LIST_NEWS'; //실시간 연예뉴스 리스트 가져오기
export const LIST_KEYWORD = 'issue/LIST_KEYWORD'; //실시간 연예뉴스 리스트 가져오기

/* 액션 생성자 */
export const getNewsList = createAction(LIST_NEWS, api.getNewsList);
export const getNewsKeyword = createAction(LIST_KEYWORD, api.getNewsKeyword);

/* 초기 상태 정의 */
const initialState = Map({
    newsCount: 0,
    newsList: [],
    newsKeyword: [],
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
    },
    initialState
);
