import axios from 'axios';

import { Storage } from 'lib/storage';
import { API_BASE_URL } from 'constants/index.js';

/* Auth */
const getToken = () => {
    return Storage.local.get('__AUTH__') || Storage.session.get('__AUTH__');
};

const getAccesesToken = () => {
    if (getToken()) return 'jwt ' + getToken();
};

export const isUserLoggedIn = () => {
    const token = getToken();
    if (token) {
        return true;
    }

    return false;
};

//회원가입
export const signUp = (formdata) => axios.post(`${API_BASE_URL}/rest-auth/registration`, formdata);

//아이디(username) 중복 여부 확인
export const checkUsername = (username) => axios.post(`${API_BASE_URL}/accounts/overlap/username`, { username });

//이메일 중복 여부 확인
export const checkEmail = (email) => axios.post(`${API_BASE_URL}/accounts/overlap/email`, { email });

//닉네임 중복 여부 확인
export const checkNickname = (nickname) => axios.post(`${API_BASE_URL}/accounts/overlap/nickname`, { nickname });

//이메일 인증
export const confirmAccount = (key) => axios.get(`${API_BASE_URL}/account-confirm/${key}`);

//로그인
export const signIn = (username, password) =>
    axios.post(`${API_BASE_URL}/rest-auth/login`, {
        username,
        password,
    });

//사용자 프로필 정보
export const getProfile = () =>
    axios.get(`${API_BASE_URL}/accounts/profile`, {
        headers: { Authorization: getAccesesToken() },
    });

/* home */
//실시간 인기글 6개 가져오기
export const getHotPostList = (type) => axios.get(`${API_BASE_URL}/board/hot${type ? '/' + type : ''}`);

//사용자 정보 전부 가져오기: username, email, nickname, introduction, profile_image,bookmark,points,level
export const getUserInfo = () =>
    axios.get(`${API_BASE_URL}/accounts/user`, {
        headers: { Authorization: getAccesesToken() },
    });

/*home+issue*/
//실시간 인기 투표 가져오기
export const getHotVoteList = () => axios.get(`${API_BASE_URL}/battle/vote/best`);

//실시간 연예뉴스 목록 가져오기  params: searchType,searchWord,page
export const getNewsList = (params) =>
    axios.get(`${API_BASE_URL}/news/list`, {
        params: params,
    });

/*issue*/
//기사 인기 키워드
export const getNewsKeyword = () => axios.get(`${API_BASE_URL}/news/popular-keyword`);

//투표 목록 가져오기 params: searchType,searchWord,page,ordering
export const getVoteList = (params) =>
    axios.get(`${API_BASE_URL}/battle/vote/board`, {
        params: params,
    });

// 투표 정보 가져오기
export const getVoteInfo = (boardUrl) =>
    axios.get(`${API_BASE_URL}/battle/vote/board/${boardUrl}`, {
        headers: { Authorization: getAccesesToken() },
    });

// 투표 게시판 전체 댓글 가져오기
export const getVoteReply = (boardUrl) => axios.get(`${API_BASE_URL}/battle/vote/board/${boardUrl}/reply?page=1`);

// 투표 게시판 댓글 작성
export const postVoteReply = (voteboard_id, content, votereply_image, anonymous) => {
    console.log(voteboard_id, content, votereply_image, anonymous);
    axios.post(
        `${API_BASE_URL}/battle/vote/board/reply`,
        { voteboard_id, content, votereply_image, anonymous },
        {
            headers: { Authorization: getAccesesToken() },
        }
    );
};
//투표 게시판 댓글 수정
export const updateVoteReply = (formdata, replyUrl) => {
    axios.put(`${API_BASE_URL}/battle/vote/board/reply/${replyUrl}`, formdata);
};
//특정 게시판의 댓글 삭제
export const deleteVoteReply = (replyUrl) => {
    axios.delete(`${API_BASE_URL}/battle/vote/board/reply/${replyUrl}`);
};
//특정 댓글의 대댓글 작성
export const postVoteRereply = (voteboardreply_id, content, voterereply_image, anonymous) => {
    axios.post(
        `${API_BASE_URL}/battle/vote/board/rereply`,
        { voteboardreply_id, content, voterereply_image, anonymous },
        {
            headers: { Authorization: getAccesesToken() },
        }
    );
};
//특정 댓글의 대댓글 수정
export const updateVoteRereply = (formdata, replyUrl) => {
    axios.put(`${API_BASE_URL}/battle/vote/board/rereply/${replyUrl}`, formdata);
};
//특정 댓글의 대댓글 삭제
export const deleteVoteRereply = (reReplyUrl) => {
    axios.delete(`${API_BASE_URL}/battle/vote/board/rereply/${reReplyUrl}`);
};
//댓글 추천 추가 및 취소
export const replyRecommend = (replyUrl) => {
    console.log(replyUrl);
    axios.post(
        `${API_BASE_URL}/battle/vote/board/reply/recommend`,
        { replyUrl },
        {
            headers: { Authorization: getAccesesToken() },
        }
    );
};
//대댓글 추천 추가 및 취소
export const reReplyRecommend = (reReplyUrl) => {
    axios.post(`${API_BASE_URL}/battle/vote/board/rereply/recommend`, {
        voteboardrereply_id: reReplyUrl,
    });
};
/* Board: luna, free, dalgona*/
//특정 게시판 정보 가져오기
export const getBoardInfo = (boardUrl) => axios.get(`${API_BASE_URL}/boardlist/${boardUrl}`);

//특정 게시판 인기글 가져오기
export const getBestPostList = (boardUrl) => axios.get(`${API_BASE_URL}/board/${boardUrl}/best`);

//글목록 가져오기: 루나
export const getPostList = (boardUrl, params) =>
    axios.get(`${API_BASE_URL}/board/${boardUrl}`, {
        params: params,
    });
