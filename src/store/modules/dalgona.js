import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';
import { Storage } from 'lib/storage';

/* 액션 타입 */
export const LIST_NOTICE = 'dalgona/LIST_NOTICE'; //공지사항 글목록 가져오기
export const LIST_EVENT = 'dalgona/LIST_EVENT'; //이벤트 글목록 가져오기
export const LIST_POST = 'dalgona/LIST_POST'; //글목록 가져오기
export const POST_INFO = 'dalgona/POST_INFO'; //글 정보 가져오기
export const GET_POST_REPLY = 'dalgona/GET_POST_REPLY'; //댓글 리스트 가져오기
/* 액션 생성자 */
export const getNoticeList = createAction(LIST_NOTICE, api.getPostList);
export const getEventList = createAction(LIST_EVENT, api.getPostList);
export const getPostList = createAction(LIST_POST, api.getPostList);
export const getPostInfo = createAction(POST_INFO, api.getPostInfo);
export const getPostReply = createAction(GET_POST_REPLY, api.getPostReply);

/* 초기 상태 정의 */
const initialState = Map({
    noticeCount: 0,
    noticeList: [],
    eventCount: 0,
    eventList: [],
    postInfo: [],
    postReplyList: [],
    postReplyCount: 0,
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
                console.log(action.payload.data);
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
