import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';
import { Storage } from 'lib/storage';

/* 액션 타입 */
export const LIST_NOTICE = 'dalgona/LIST_NOTICE'; //공지사항 글목록 가져오기
export const LIST_EVENT = 'dalgona/LIST_EVENT'; //이벤트 글목록 가져오기

/* 액션 생성자 */
export const getNoticeList = createAction(LIST_NOTICE, api.getPostList);
export const getEventList = createAction(LIST_EVENT, api.getPostList);

/* 초기 상태 정의 */
const initialState = Map({
    noticeCount: 0,
    noticeList: [],
    eventCount: 0,
    eventList: [],
});

/* reducer + pender */
export default handleActions(
    {
        ...pender({
            type: LIST_NOTICE,
            onSuccess: (state, action) => {
                const { count, results } = action.payload.data;
                return state.set('noticeCount', count).set('noticeList', results);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: LIST_EVENT,
            onSuccess: (state, action) => {
                const { count, results } = action.payload.data;
                return state.set('eventCount', count).set('eventList', results);
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
