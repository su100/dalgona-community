import axios from 'axios';

import { Storage } from 'lib/storage';
import { API_BASE_URL } from 'constants/index.js';

/* Auth */
const getToken = () => Storage.local.get('__AUTH__') || Storage.session.get('__AUTH__');

const getAccesesToken = () => {
  if (getToken()) {
    return `jwt ${getToken()}`;
  }
  return null;
};

export const isUserLoggedIn = () => {
  const token = getToken();
  if (token) {
    return true;
  }

  return false;
};

// 본인인증
export const checkUser = (formdata) => axios.post(`${API_BASE_URL}/accounts/certification`, formdata);

//  회원가입
export const signUp = (formdata) => axios.post(`${API_BASE_URL}/rest-auth/registration`, formdata);

//  아이디(username) 중복 여부 확인
export const checkUsername = (username) => axios.post(`${API_BASE_URL}/accounts/overlap/username`, { username });

//  이메일 중복 여부 확인
export const checkEmail = (email) => axios.post(`${API_BASE_URL}/accounts/overlap/email`, { email });

//  닉네임 중복 여부 확인
export const checkNickname = (nickname) => axios.post(`${API_BASE_URL}/accounts/overlap/nickname`, { nickname });

//  이메일 인증
export const confirmAccount = (key) => axios.get(`${API_BASE_URL}/account-confirm/${key}`);

//  로그인
export const signIn = (username, password) =>
  axios.post(`${API_BASE_URL}/rest-auth/login`, {
    username,
    password,
  });

//  사용자 프로필 정보
export const getProfile = () =>
  axios.get(`${API_BASE_URL}/accounts/profile`, {
    headers: { Authorization: getAccesesToken() },
  });

//  프로필 수정하기
export const updateProfile = (formData) =>
  axios.put(`${API_BASE_URL}/accounts/profile`, formData, {
    headers: { Authorization: getAccesesToken() },
  });

//  회원탈퇴
export const deleteUser = () =>
  axios.delete(`${API_BASE_URL}/accounts/profile`, {
    headers: { Authorization: getAccesesToken() },
  });

// 아이디 찾기 이메일 전송
export const sendEmailForId = (email) => axios.post(`${API_BASE_URL}/username-find`, { email });

// 비번 찾기 이메일 전송
export const sendEmailForPw = (username, email) => axios.post(`${API_BASE_URL}/password-reset`, { username, email });

// 아이디 비번 찾기 본인 인증
export const accountFind = (formData) => axios.post(`${API_BASE_URL}/account-find`, formData);

// 리셋? 비번찾기
export const resetPassWordEmail = (uid, token, formData) =>
  axios.post(`${API_BASE_URL}/password-reset-confirm/${uid}/${token}/`, formData);

/* home */
//  실시간 인기글 6개 가져오기
export const getHotPostList = (type) => axios.get(`${API_BASE_URL}/board/hot${type ? `/${type}` : ''}`);

//  사용자 정보 전부 가져오기: username, email, nickname, introduction, profile_image,bookmark,points,level
export const getUserInfo = () =>
  axios.get(`${API_BASE_URL}/accounts/user`, {
    headers: { Authorization: getAccesesToken() },
  });

/* home+issue */
//  실시간 인기 투표 가져오기
export const getHotVoteList = () => axios.get(`${API_BASE_URL}/battle/vote/best`);

//  실시간 연예뉴스 목록 가져오기  params: searchType,searchWord,page
export const getNewsList = (params) =>
  axios.get(`${API_BASE_URL}/news/list`, {
    params,
  });

/* search */
//  게시판 종류 별 검색
export const getSearchList = (searchWord, searchDivision, page, ordering = 'created_at', searchType = 'title-body') =>
  axios.get(`${API_BASE_URL}/board/search`, {
    params: { searchType, searchWord, searchDivision, page, ordering },
  });

/* issue */
// 기사 인기 키워드
export const getNewsKeyword = () => axios.get(`${API_BASE_URL}/news/popular-keyword`);

// 투표 목록 가져오기 params: searchType,searchWord,page,ordering
export const getVoteList = (params) =>
  axios.get(`${API_BASE_URL}/battle/vote/board`, {
    params,
  });

// 투표 정보 가져오기
export const getVoteInfo = (boardUrl) =>
  axios.get(`${API_BASE_URL}/battle/vote/board/${boardUrl}`, {
    headers: { Authorization: getAccesesToken() },
  });

// 투표 게시판 전체 댓글 가져오기
export const getVoteReply = (boardUrl, page, ordering = 'recommend_count') =>
  axios.get(`${API_BASE_URL}/battle/vote/board/${boardUrl}/reply`, {
    params: { page, ordering },
    headers: { Authorization: getAccesesToken() },
  });

// 투표 게시판 댓글 작성
export const postVoteReply = (formdata) =>
  axios.post(`${API_BASE_URL}/battle/vote/board/reply`, formdata, {
    headers: { Authorization: getAccesesToken() },
  });

//  투표 게시판 댓글 수정
export const updateVoteReply = (formdata, updateId) =>
  axios.put(`${API_BASE_URL}/battle/vote/board/reply/${updateId}`, formdata, {
    headers: { Authorization: getAccesesToken() },
  });

//  투표 게시판의 댓글 삭제
export const deleteVoteReply = (replyUrl) =>
  axios.delete(`${API_BASE_URL}/battle/vote/board/reply/${replyUrl}`, {
    headers: { Authorization: getAccesesToken() },
  });

//  투표 게시판 특정 댓글의 대댓글 작성
export const postVoteRereply = (formdata) =>
  axios.post(`${API_BASE_URL}/battle/vote/board/rereply`, formdata, {
    headers: { Authorization: getAccesesToken() },
  });

//  투표 게시판 특정 댓글의 대댓글 수정
export const updateVoteRereply = (formdata, replyUrl) =>
  axios.put(`${API_BASE_URL}/battle/vote/board/rereply/${replyUrl}`, formdata, {
    headers: { Authorization: getAccesesToken() },
  });

//  투표 게시판 특정 댓글의 대댓글 삭제
export const deleteVoteRereply = (reReplyUrl) =>
  axios.delete(`${API_BASE_URL}/battle/vote/board/rereply/${reReplyUrl}`, {
    headers: { Authorization: getAccesesToken() },
  });

//  투표 게시판 댓글 추천 추가 및 취소
export const replyRecommend = (replyUrl) =>
  axios.post(
    `${API_BASE_URL}/battle/vote/board/reply/recommend`,
    {
      voteboardreply_id: replyUrl,
    },
    {
      headers: { Authorization: getAccesesToken() },
    }
  );

//  투표 게시판 대댓글 추천 추가 및 취소
export const reReplyRecommend = (reReplyUrl) =>
  axios.post(
    `${API_BASE_URL}/battle/vote/board/rereply/recommend`,
    {
      voteboardrereply_id: reReplyUrl,
    },
    {
      headers: { Authorization: getAccesesToken() },
    }
  );
//  유저 투표하기
export const userVote = (voteitem) =>
  axios.post(
    `${API_BASE_URL}/battle/vote`,
    {
      voteitem_id: voteitem,
    },
    {
      headers: { Authorization: getAccesesToken() },
    }
  );

/* Board: luna, free, dalgona */
//  특정 게시판 정보 가져오기
export const getBoardInfo = (boardUrl) => axios.get(`${API_BASE_URL}/boardlist/${boardUrl}`);

//  특정 게시판 인기글 가져오기
export const getBestPostList = (boardUrl) => axios.get(`${API_BASE_URL}/board/${boardUrl}/best`);

//  게시글 내 들어갈 이미지 업로드
export const addPostImage = (formdata) =>
  axios.post(`${API_BASE_URL}/images/post`, formdata, {
    headers: { Authorization: getAccesesToken() },
  });

//  글목록 가져오기: 루나
export const getPostList = (boardUrl, params) =>
  axios.get(`${API_BASE_URL}/board/${boardUrl}`, {
    params,
  });
//  글 내용 가져오기: 루나
export const getPostInfo = (boardUrl, postId) =>
  axios.get(`${API_BASE_URL}/board/${boardUrl}/${postId}`, {
    headers: { Authorization: getAccesesToken() },
    withCredentials: true,
  });
// 댓글 목록 가져오기: 게시글
export const getPostReply = (postId, page, ordering = 'recommend_count') =>
  axios.get(`${API_BASE_URL}/board/${postId}/reply`, {
    params: { page, ordering },
    headers: { Authorization: getAccesesToken() },
  });
//  내가 쓴 글 조회
export const getMyPost = (page) =>
  axios.get(`${API_BASE_URL}/accounts/profile/mypost`, {
    params: { page },
    headers: { Authorization: getAccesesToken() },
  });
//  별 획득 내역 조회
export const getMyPoint = (type, page) =>
  axios.get(`${API_BASE_URL}/accounts/profile/mypoint/${type}`, {
    params: { page },
    headers: { Authorization: getAccesesToken() },
  });

/* write */
//  게시글 작성하기
export const addPost = (title, body, boardUrl, anonymous) =>
  axios.post(
    `${API_BASE_URL}/board/${boardUrl}/posts`,
    {
      title,
      body,
      anonymous,
      board_url: boardUrl,
    },
    {
      headers: { Authorization: getAccesesToken() },
    }
  );

//  게시글 수정하기
export const updatePost = (boardUrl, postId, title, body, anonymous) =>
  axios.put(
    `${API_BASE_URL}/board/${boardUrl}/${postId}`,
    {
      title,
      body,
      anonymous,
      board_url: boardUrl,
    },
    {
      headers: { Authorization: getAccesesToken() },
    }
  );

//  게시글 삭제하기
export const deletePost = (boardUrl, postId) =>
  axios.delete(`${API_BASE_URL}/board/${boardUrl}/${postId}`, {
    headers: { Authorization: getAccesesToken() },
  });

//  즐겨찾기 추가 및 삭제
export const updateBookmark = (bookmark) =>
  axios.post(
    `${API_BASE_URL}/accounts/profile/bookmark`,
    {
      bookmark,
    },
    {
      headers: { Authorization: getAccesesToken() },
    }
  );
//  댓글 작성하기
export const addPostReply = (formdata) =>
  axios.post(`${API_BASE_URL}/board/reply`, formdata, {
    headers: { Authorization: getAccesesToken() },
  });
//  댓글 수정하기
export const updatePostReply = (formdata, updateId) =>
  axios.put(`${API_BASE_URL}/board/reply/${updateId}`, formdata, {
    headers: { Authorization: getAccesesToken() },
  });
//  댓글 삭제하기
export const deletePostReply = (replyUrl) =>
  axios.delete(`${API_BASE_URL}/board/reply/${replyUrl}`, {
    headers: { Authorization: getAccesesToken() },
  });
//  대댓글 작성하기
export const addPostRereply = (formdata) =>
  axios.post(`${API_BASE_URL}/board/rereply`, formdata, {
    headers: { Authorization: getAccesesToken() },
  });
//  대댓글 수정하기
export const updatePostRereply = (formdata, replyUrl) =>
  axios.put(`${API_BASE_URL}/board/rereply/${replyUrl}`, formdata, {
    headers: { Authorization: getAccesesToken() },
  });
//  대댓글 삭제하기
export const deletePostRereply = (reReplyUrl) =>
  axios.delete(`${API_BASE_URL}/board/rereply/${reReplyUrl}`, {
    headers: { Authorization: getAccesesToken() },
  });
//  글 추천 추가 및 취소
export const recommendPostReply = (replyUrl) =>
  axios.post(
    `${API_BASE_URL}/board/reply/recommend`,
    {
      reply_id: replyUrl,
    },
    {
      headers: { Authorization: getAccesesToken() },
    }
  );
//  대댓글 추천 추가 및 취소
export const recommendPostRereply = (reReplyUrl) =>
  axios.post(
    `${API_BASE_URL}/board/rereply/recommend`,
    {
      rereply_id: reReplyUrl,
    },
    {
      headers: { Authorization: getAccesesToken() },
    }
  );

//  즐겨찾기 추가 및 삭제
export const getBookmarkList = () =>
  axios.get(`${API_BASE_URL}/accounts/profile/bookmark`, {
    headers: { Authorization: getAccesesToken() },
  });
//  게시글 추천
export const recommendPost = (boardUrl) =>
  axios.post(
    `${API_BASE_URL}/board/recommend`,
    {
      board_post_id: boardUrl,
    },
    {
      headers: { Authorization: getAccesesToken() },
    }
  );

//  루나, 자유, 공지 게시판에 있는 게시판만 보기
export const getLunaBoard = () => axios.get(`${API_BASE_URL}/boardlist/division/2`);
export const getFreeBoard = () => axios.get(`${API_BASE_URL}/boardlist/division/1`);
export const getDalgonaBoard = () => axios.get(`${API_BASE_URL}/boardlist/division/0`);
