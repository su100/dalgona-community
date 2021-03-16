import { createAction, handleActions } from 'redux-actions';
import { List, Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* 액션 타입 */
export const LIST_SEARCH = 'search/LIST_SEARCH'; //검색한 글목록 가져오기

/* 액션 생성자 */
export const getSearchList = createAction(LIST_SEARCH, api.getSearchList);

/* 초기 상태 정의 */
const initialState = Map({
    searchCount: 0,
    searchList: [],
});

/* reducer + pender */
export default handleActions(
    {
        ...pender({
            type: LIST_SEARCH,
            onSuccess: (state, action) => {
                const { count, results } = action.payload.data;
                return state.set('searchCount', count).set('searchList', results);
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
