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

export const GET_VOTE_REPLY = 'issue/GET_VOTE_REPLY'; //투표 게시판 댓글 GET
export const POST_VOTE_REPLY = 'issue/POST_VOTE_REPLY'; //투표 게시판 댓글 POST
export const UPDATE_VOTE_REPLY = 'issue/UPDATE_VOTE_REPLY'; //투표 게시판 댓글 PUT
export const DELETE_VOTE_REPLY = 'issue/DELETE_VOTE_REPLY'; //투표 게시판 댓글 DELETE
export const POST_VOTE_REREPLY = 'issue/POST_VOTE_REREPLY'; //투표 게시판 대댓글 POST
export const UPDATE_VOTE_REREPLY = 'issue/UPDATE_VOTE_REREPLY'; //특정 댓글의 대댓글 UPDATE
export const DELETE_VOTE_REREPLY = 'issue/DELETE_VOTE_REREPLY'; //특성 댓글의 대댓글 DELETE
export const REPLY_RECOMMEND = 'issue/REPLY_RECOMMEND'; //댓글 추천 추가 및 취소
export const REREPLY_RECOMMEND = 'issue/REREPLY_RECOMMEND'; //대댓글 추천 추가 및 취소

/* 액션 생성자 */
export const getNewsList = createAction(LIST_NEWS, api.getNewsList);
export const getNewsKeyword = createAction(LIST_KEYWORD, api.getNewsKeyword);
export const getHotVoteList = createAction(LIST_HOT_VOTE, api.getHotVoteList);
export const getVoteList = createAction(LIST_VOTE, api.getVoteList);
export const getVoteInfo = createAction(VOTE_INFO, api.getVoteInfo);

export const getVoteReply = createAction(GET_VOTE_REPLY, api.getVoteReply);
export const postVoteReply = createAction(POST_VOTE_REPLY, api.postVoteReply);
export const updateVoteReply = createAction(UPDATE_VOTE_REPLY, api.updateVoteReply);
export const deleteVoteReply = createAction(DELETE_VOTE_REPLY, api.deleteVoteReply);
export const postVoteRereply = createAction(POST_VOTE_REREPLY, api.postVoteRereply);
export const updateVoteRereply = createAction(UPDATE_VOTE_REREPLY, api.updateVoteRereply);
export const deleteVoteRereply = createAction(DELETE_VOTE_REREPLY, api.deleteVoteRereply);
export const replyRecommend = createAction(REPLY_RECOMMEND, api.replyRecommend);
export const reReplyRecommend = createAction(REREPLY_RECOMMEND, api.reReplyRecommend);

/* 초기 상태 정의 */
const initialState = Map({
    newsCount: 0,
    newsList: [],
    newsKeyword: [],
    hotVoteList: [],
    voteCount: 0,
    voteList: [],
    voteInfo: [],
    voteReplyList: [],
    voteReplyCount: 0,
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
                console.log(action.payload.data);
                return state.set('voteInfo', action.payload.data);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: GET_VOTE_REPLY,
            onSuccess: (state, action) => {
                console.log(action.payload.data);
                return state
                    .set('voteReplyList', action.payload.data.results)
                    .set('voteReplyCount', action.payload.data.count);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                return state;
            },
        }),
        ...pender({
            type: POST_VOTE_REPLY,
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
            type: REPLY_RECOMMEND,
            onSuccess: (state, action) => {
                console.log(action.payload.data);
                if (action.payload.data.result.includes('recommend created')) {
                    alert('추천완료');
                }
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                if (data.result.includes('recommend deleted')) {
                    alert('추천취소');
                }
                return state;
            },
        }),
    },
    initialState
);
