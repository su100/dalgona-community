import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';

/* 액션 타입 */
export const ADD_POST_IMAGE = 'luna/ADD_POST_IMAGE';
export const VIEW_BOARD = 'luna/VIEW_BOARD'; //  게시판 정보 가져오기
export const LIST_BEST = 'luna/LIST_BEST'; //  인기글 목록 가져오기
export const LIST_POST = 'luna/LIST_POST'; //  글목록 가져오기
export const POST_INFO = 'luna/POST_INFO'; //  글 정보 가져오기
export const GET_POST_REPLY = 'luna/GET_POST_REPLY'; //  댓글 리스트 가져오기
export const LIST_BOOKMARK = 'luna/LIST_BOOKMARK'; //  즐겨찾기 가져오기
export const UPDATE_BOOKMARK = 'luna/UPDATE_BOOKMARK'; //  즐겨찾기 추가 및 삭제
export const RECOMMEND_POST = 'write/RECOMMEND_POST'; //  게시글 추천
/* 액션 생성자 */
export const addPostImage = createAction(ADD_POST_IMAGE, api.addPostImage);
export const getBoardInfo = createAction(VIEW_BOARD, api.getBoardInfo);
export const getBestPostList = createAction(LIST_BEST, api.getBestPostList);
export const getPostList = createAction(LIST_POST, api.getPostList);
export const getPostInfo = createAction(POST_INFO, api.getPostInfo);
export const getPostReply = createAction(GET_POST_REPLY, api.getPostReply);
export const getBookmarkList = createAction(LIST_BOOKMARK, api.getBookmarkList);
export const updateBookmark = createAction(UPDATE_BOOKMARK, api.updateBookmark);
export const recommendPost = createAction(RECOMMEND_POST, api.recommendPost);

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
  bookmarkList: [],
});

/* reducer + pender */
export default handleActions(
  {
    ...pender({
      type: ADD_POST_IMAGE,
      onSuccess: (state, action) => state.set('imageURL', action.payload.data.image),
      onFailure: (state, action) => {
        alert('사진 업로드 문제가 발생했습니다');
        console.log(action.payload.response.data);
        return state;
      },
    }),
    ...pender({
      type: VIEW_BOARD,
      onSuccess: (state, action) => state.set('boardInfo', action.payload.data),
      onFailure: (state, action) => {
        const { data } = action.payload.response;
        console.log(data);
        return state;
      },
    }),
    ...pender({
      type: LIST_BEST,
      onSuccess: (state, action) => state.set('bestPostList', action.payload.data),
      onFailure: (state, action) => {
        const { data } = action.payload.response;
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
        const { data } = action.payload.response;
        console.log(data);
        return state;
      },
    }),
    ...pender({
      type: LIST_BOOKMARK,
      onSuccess: (state, action) => state.set('bookmarkList', action.payload.data.bookmark),
      onFailure: (state, action) => {
        const { data } = action.payload.response;
        console.log(data);
        return state;
      },
    }),
    ...pender({
      type: UPDATE_BOOKMARK,
      onSuccess: (state, action) => state.set('bookmarkList', action.payload.data.bookmark),
      onFailure: (state, action) => {
        const { data } = action.payload.response;
        console.log(data);
        return state;
      },
    }),
    ...pender({
      type: POST_INFO,
      onSuccess: (state, action) => state.set('postInfo', action.payload.data),
      onFailure: (state, action) => {
        const { data } = action.payload.response;
        console.log(data);
        return state;
      },
    }),
    ...pender({
      type: GET_POST_REPLY,
      onSuccess: (state, action) =>
        state.set('postReplyList', action.payload.data.results).set('postReplyCount', action.payload.data.count),
      onFailure: (state, action) => {
        const { data } = action.payload.response;
        console.log(data);
        return state;
      },
    }),
    ...pender({
      type: RECOMMEND_POST,
      onSuccess: (state) => state,
      onFailure: (state, action) => {
        const { data } = action.payload.response;
        console.log(data);
        if (data.detail?.includes('Authentication credentials were not provided.')) {
          alert('로그인이 필요합니다.');
        }
        return state;
      },
    }),
  },
  initialState
);
