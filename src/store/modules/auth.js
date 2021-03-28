import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';
import { Storage } from 'lib/storage';

/* 액션 타입 */
export const SIGN_UP = 'auth/SIGN_UP'; //회원가입
export const SIGN_IN = 'auth/SIGN_IN'; //로그인
export const SET_REMEMBER = 'auth/SET_REMEMBER'; //자동로그인 여부
export const SIGN_OUT = 'auth/SIGN_OUT'; //로그아웃
export const SET_USERNAME = 'auth/SET_USERNAME'; //로그인 후 이메일 인증 안 됐을 때 재인증에 사용할 아이디
export const GET_PROFILE = 'auth/GET_PROFILE'; //사용자 프로필 보기
export const UPDATE_PROFILE = 'auth/UPDATE_PROFILE'; //사용자 프로필 수정하기
export const CHECK_USERNAME = 'auth/CHECK_USERNAME'; //username(id) 중복 체크
export const CHECK_EMAIL = 'auth/CHECK_EMAIL'; //email 중복 체크
export const CHECK_NICKNAME = 'auth/CHECK_NICKNAME'; //nickname 중복 체크
export const CONFIRM_ACCOUNT = 'auth/CONFIRM_ACCOUNT'; //이메일 인증 확인
export const DELETE_USER = 'auth/DELETE_USER'; //회원탈퇴
export const SET_UNIQUE = 'auth/SET_UNIQUE'; //중복 체크 활성화
export const SET_AUTH = 'auth/SET_AUTH'; //로그인 여부 설정

/* 액션 생성자 */
export const signUp = createAction(SIGN_UP, api.signUp);
export const signIn = createAction(SIGN_IN, api.signIn);
export const setRemember = createAction(SET_REMEMBER);
export const signOut = createAction(SIGN_OUT);
export const setUsername = createAction(SET_USERNAME);
export const getProfile = createAction(GET_PROFILE, api.getProfile);
export const updateProfile = createAction(UPDATE_PROFILE, api.updateProfile);
export const checkUsername = createAction(CHECK_USERNAME, api.checkUsername);
export const checkEmail = createAction(CHECK_EMAIL, api.checkEmail);
export const checkNickname = createAction(CHECK_NICKNAME, api.checkNickname);
export const confirmAccount = createAction(CONFIRM_ACCOUNT, api.confirmAccount);
export const deleteUser = createAction(DELETE_USER, api.deleteUser);
export const setUnique = createAction(SET_UNIQUE);
export const setAuth = createAction(SET_AUTH);

/* 초기 상태 정의 */
const initialState = Map({
    isAuthenticated: false,
    isEmailNotCertified: false,
    rememberMe: false,
    userNameUnique: false,
    emailUnique: false,
    nicknameUnique: false,
    profile: Map({}),
    email: '',
    nickname: '',
    username: '',
    signUpSuccess: false,
});

/* reducer + pender */
export default handleActions(
    {
        [SET_REMEMBER]: (state, action) => {
            return state.set('rememberMe', action.payload);
        },
        [SIGN_OUT]: (state, action) => {
            //토큰 삭제
            if (Storage.local.get('__AUTH__')) {
                Storage.local.remove('__AUTH__');
            }
            if (Storage.session.get('__AUTH__')) {
                Storage.session.remove('__AUTH__');
            }
            //로그인 여부 false, profile 빈 값
            return state.set('isAuthenticated', false).set('profile', Map({}));
        },
        [SET_USERNAME]: (state, action) => {
            return state.set('username', action.payload);
        },
        [SET_UNIQUE]: (state, action) => {
            if (action.payload === 'username') {
                return state.set('userNameUnique', false);
            } else if (action.payload === 'email') {
                return state.set('emailUnique', false);
            } else {
                return state.set('nicknameUnique', false);
            }
        },
        [SET_AUTH]: (state, action) => {
            if (api.isUserLoggedIn()) {
                //로그인  여부 store에 재저장
                return state.set('isAuthenticated', true);
            }
            return state;
        },
        ...pender({
            type: SIGN_IN,
            onSuccess: (state, action) => {
                const data = action.payload.data;
                //access token 저장
                if (state.get('rememberMe')) {
                    Storage.local.set('__AUTH__', data.token);
                } else {
                    Storage.session.set('__AUTH__', data.token);
                }
                const profile = Map({
                    nickname: data.user.nickname,
                    introduction: data.user.introduction,
                    profile_image: data.user.profile_image,
                });
                //받아온 회원정보 sessionStorage에 저장(사이드바에서 사용될것)
                return state.set('isAuthenticated', true).set('profile', profile);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                if (data.non_field_errors?.includes('Unable to log in with provided credentials.'))
                    alert('존재하지 않는 아이디이거나 잘못된 패스워드입니다.');
                else if (data.non_field_errors?.includes('E-mail is not verified.')) {
                    return state.set('isEmailNotCertified', true);
                } else {
                    alert('로그인 에러');
                }
                return state.set('isAuthenticated', false);
            },
        }),
        ...pender({
            type: SIGN_UP,
            onSuccess: (state, action) => {
                return state
                    .set('signUpSuccess', true)
                    .set('email', action.payload.data.email)
                    .set('userNameUnique', false)
                    .set('emailUnique', false)
                    .set('nicknameUnique', false);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                if (data.username?.includes('This field is required.')) {
                    alert('아이디를 입력해주세요');
                } else if (data.password1?.includes('This field is required.')) {
                    alert('비밀번호를 입력해주세요');
                } else if (data.password2?.includes('This field is required.')) {
                    alert('비밀번호 확인을 입력해주세요');
                } else if (data.nickname?.includes('This field is required.')) {
                    alert('닉네임을 입력해주세요');
                } else if (data.email?.includes('This field is required.')) {
                    alert('이메일을 입력해주세요');
                } else if (data.password1?.includes('This password is too common.')) {
                    alert('패스워드가 너무 단순합니다');
                } else if (
                    data.password1?.includes('This password is too short. It must contain at least 8 characters.')
                ) {
                    alert('패스워드는 8글자 이상입니다.');
                } else if (data.password1?.includes('This password is entirely numeric.')) {
                    alert('패스워드는 숫자만으로 설정할 수 없습니다.');
                } else if (
                    data.profile_image?.includes(
                        'The submitted data was not a file. Check the encoding type on the form.'
                    )
                ) {
                    alert('프로필 사진이 file형태가 아닙니다');
                } else {
                    console.log(data);
                    alert('회원가입 에러');
                }
                return state.set('userNameUnique', false).set('emailUnique', false).set('nicknameUnique', false);
            },
        }),
        ...pender({
            type: GET_PROFILE,
            onSuccess: (state, action) => {
                return state.set('profile', Map(action.payload.data));
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                if (data.detail?.includes('Invalid signature.')) {
                    alert('유효하지 않은 사용자입니다.');
                } else {
                    console.log(data);
                    alert('사용자 정보 가져오기 에러');
                }
                return state;
            },
        }),
        ...pender({
            type: UPDATE_PROFILE,
            onSuccess: (state, action) => {
                alert('프로필이 수정되었습니다.');
                return state.set('profile', Map(action.payload.data));
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                if (data.nickname?.includes('This field may not be blank.')) {
                    alert('닉네임을 입력해주세요');
                } else {
                    console.log(data);
                    alert('사용자 정보 가져오기 에러');
                }
                return state;
            },
        }),
        ...pender({
            type: DELETE_USER,
            onSuccess: (state, action) => {
                alert('성공적으로 탈퇴되었습니다.');
                return state;
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                alert('회원탈퇴 에러');
                return state;
            },
        }),
        ...pender({
            type: CHECK_USERNAME,
            onSuccess: (state, action) => {
                //중복 여부 알림
                alert('사용 가능한 아이디입니다.');
                return state.set('userNameUnique', true);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                if (data.detail?.includes('This field must be unique.')) {
                    alert('이미 존재하는 아이디입니다.');
                } else if (data.detail?.includes('Ensure this field has at least 5 characters.')) {
                    alert('아이디는 최소 5글자입니다');
                } else {
                    console.log(data);
                    alert('아이디 확인 에러');
                }
                return state.set('userNameUnique', false);
            },
        }),
        ...pender({
            type: CHECK_EMAIL,
            onSuccess: (state, action) => {
                //중복 여부 알림
                alert('사용 가능한 이메일입니다.');
                return state.set('emailUnique', true);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                if (data.detail?.includes('Enter a valid email address.')) {
                    alert('유효하지 않은 이메일입니다');
                } else if (data.detail?.includes('This field must be unique.')) {
                    alert('이미 존재하는 이메일입니다.');
                } else {
                    console.log(data);
                    alert('이메일 확인 에러');
                }
                return state.set('emailUnique', false);
            },
        }),
        ...pender({
            type: CHECK_NICKNAME,
            onSuccess: (state, action) => {
                //중복 여부 알림
                alert('사용 가능한 닉네임입니다.');
                return state.set('nicknameUnique', true);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                if (data.detail?.includes('This field must be unique.')) {
                    alert('이미 존재하는 닉네임입니다.');
                } else {
                    console.log(data);
                    alert('닉네임 확인 에러');
                }
                return state.set('nicknameUnique', false);
            },
        }),
        ...pender({
            type: CONFIRM_ACCOUNT,
            onSuccess: (state, action) => {
                //가입 성공
                return state.set('nickname', action.payload.data.nickname);
            },
            onFailure: (state, action) => {
                const data = action.payload.response.data;
                console.log(data);
                alert('이메일 인증 에러');
                return state;
            },
        }),
    },
    initialState
);
