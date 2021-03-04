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
