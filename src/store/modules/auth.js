import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { pender } from 'redux-pender';

import * as api from 'lib/api';
import { Storage } from 'lib/storage';

/* 액션 타입 */
export const CHECK_USER = 'auth/CHECK_USER'; //  회원가입
export const SIGN_UP = 'auth/SIGN_UP'; //  회원가입
export const SIGN_IN = 'auth/SIGN_IN'; //  로그인
export const SET_REMEMBER = 'auth/SET_REMEMBER'; //  자동로그인 여부
export const SIGN_OUT = 'auth/SIGN_OUT'; //  로그아웃
export const SET_USERNAME = 'auth/SET_USERNAME'; //  로그인 후 이메일 인증 안 됐을 때 재인증에 사용할 아이디
export const GET_PROFILE = 'auth/GET_PROFILE'; //  사용자 프로필 보기
export const UPDATE_PROFILE = 'auth/UPDATE_PROFILE'; //  사용자 프로필 수정하기
export const CHECK_USERNAME = 'auth/CHECK_USERNAME'; //  username(id) 중복 체크
export const CHECK_EMAIL = 'auth/CHECK_EMAIL'; //  email 중복 체크
export const CHECK_NICKNAME = 'auth/CHECK_NICKNAME'; //  nickname 중복 체크
export const CONFIRM_ACCOUNT = 'auth/CONFIRM_ACCOUNT'; //  이메일 인증 확인
export const DELETE_USER = 'auth/DELETE_USER'; //  회원탈퇴
export const SET_UNIQUE = 'auth/SET_UNIQUE'; //  중복 체크 활성화
export const SET_AUTH = 'auth/SET_AUTH'; //  로그인 여부 설정
export const SEND_EMAIL_FOR_ID = 'auth/SEND_EMAIL_FOR_ID'; // 이메일로 아이디 찾기
export const SEND_EMAIL_FOR_PW = 'auth/SEND_EMAIL_FOR_PW'; // 이메일로 비밀번호 찾기
export const ACCOUNT_FIND = 'auth/ACCOUNT_FIND'; // 본인인증 아이디 비번 찾기
export const RESET_PASSWORD_EMAIL = 'auth/RESET_PASSWORD_EMAIL'; // 이메일 패스워드 재설정

/* 액션 생성자 */
export const checkUser = createAction(CHECK_USER, api.checkUser);
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
export const sendEmailForId = createAction(SEND_EMAIL_FOR_ID, api.sendEmailForId);
export const sendEmailForPw = createAction(SEND_EMAIL_FOR_PW, api.sendEmailForPw);
export const accountFind = createAction(ACCOUNT_FIND, api.accountFind);
export const resetPassWordEmail = createAction(RESET_PASSWORD_EMAIL, api.resetPassWordEmail);

/* 초기 상태 정의 */
const initialState = Map({
  isAuthenticated: false,
  // isEmailNotCertified: false,
  rememberMe: false,
  userNameUnique: false,
  emailUnique: false,
  nicknameUnique: false,
  profile: Map({}),
  email: '',
  nickname: '',
  username: '',
  signUpSuccess: false,
  checkedUser: Map({}),
  resetPwSuccess: false,
});

/* reducer + pender */
export default handleActions(
  {
    [SET_REMEMBER]: (state, action) => state.set('rememberMe', action.payload),
    [SIGN_OUT]: (state) => {
      console.log('SIGN_OUT');
      //  토큰 삭제
      if (Storage.local.get('__AUTH__')) {
        Storage.local.remove('__AUTH__');
      }
      if (Storage.session.get('__AUTH__')) {
        Storage.session.remove('__AUTH__');
      }

      window.location.reload();
      // 다른 탭에서도 토큰 지워 로그아웃시키기
      Storage.local.set('REMOVE_CREDENTIALS', Date.now().toString());
      Storage.local.remove('REMOVE_CREDENTIALS');
      //  로그인 여부 false, profile 빈 값
      return state.set('isAuthenticated', false).set('profile', Map({}));
    },
    [SET_USERNAME]: (state, action) => state.set('username', action.payload),
    [SET_UNIQUE]: (state, action) => {
      if (action.payload === 'username') return state.set('userNameUnique', false);
      if (action.payload === 'email') return state.set('emailUnique', false);
      return state.set('nicknameUnique', false);
    },
    [SET_AUTH]: (state) => {
      if (api.isUserLoggedIn()) {
        //  로그인  여부 store에 재저장
        return state.set('isAuthenticated', true);
      }
      return state;
    },
    ...pender({
      type: CHECK_USER,
      onSuccess: (state, action) => {
        const { data } = action.payload; // imp_uid, unique_key, gender, birthday
        return state.set('checkedUser', Map(data));
      },
      onFailure: (state, action) => {
        const { data } = action.payload.response;
        console.log(data);
        if (data.error) {
          alert(data.error);
        }
        return state;
      },
    }),
    ...pender({
      type: SIGN_IN,
      onSuccess: (state, action) => {
        const { data } = action.payload;
        //  access token 저장
        if (state.get('rememberMe')) {
          Storage.local.set('__AUTH__', data.token);
          Storage.local.set('LOGIN', `local|${data.token}`);
        } else {
          Storage.session.set('__AUTH__', data.token);
          Storage.local.set('LOGIN', `session|${data.token}`);
        }
        Storage.local.remove('LOGIN');
        return state.set('isAuthenticated', true);
      },
      onFailure: (state, action) => {
        const { data } = action.payload.response;
        console.log(data);
        if (data.non_field_errors?.includes('Unable to log in with provided credentials.'))
          alert('존재하지 않는 아이디이거나 잘못된 패스워드입니다.');
        // else if (data.non_field_errors?.includes('E-mail is not verified.')) {
        //   return state.set('isEmailNotCertified', true);
        // }
        else {
          alert('로그인 에러');
        }
        return state.set('isAuthenticated', false);
      },
    }),
    ...pender({
      type: SIGN_UP,
      onSuccess: (state, action) =>
        state
          .set('signUpSuccess', true)
          .set('email', action.payload.data.email)
          .set('userNameUnique', false)
          .set('emailUnique', false)
          .set('nicknameUnique', false),
      onFailure: (state, action) => {
        const { data } = action.payload.response;
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
        } else if (data.password1?.includes('This password is too short. It must contain at least 8 characters.')) {
          alert('패스워드는 8글자 이상입니다.');
        } else if (data.password1?.includes('This password is entirely numeric.')) {
          alert('패스워드는 숫자만으로 설정할 수 없습니다.');
        } else if (
          data.profile_image?.includes('The submitted data was not a file. Check the encoding type on the form.')
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
      onSuccess: (state, action) => state.set('profile', Map(action.payload.data)),
      onFailure: (state, action) => {
        const { data } = action.payload.response;
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
        const { data } = action.payload.response;
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
      onSuccess: (state) => {
        alert('성공적으로 탈퇴되었습니다.');
        return state;
      },
      onFailure: (state, action) => {
        const { data } = action.payload.response;
        console.log(data);
        alert('회원탈퇴 에러');
        return state;
      },
    }),
    ...pender({
      type: CHECK_USERNAME,
      onSuccess: (state) => {
        //  중복 여부 알림
        alert('사용 가능한 아이디입니다.');
        return state.set('userNameUnique', true);
      },
      onFailure: (state, action) => {
        const { data } = action.payload.response;
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
      onSuccess: (state) => {
        //  중복 여부 알림
        alert('사용 가능한 이메일입니다.');
        return state.set('emailUnique', true);
      },
      onFailure: (state, action) => {
        const { data } = action.payload.response;
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
      onSuccess: (state) => {
        //  중복 여부 알림
        alert('사용 가능한 닉네임입니다.');
        return state.set('nicknameUnique', true);
      },
      onFailure: (state, action) => {
        const { data } = action.payload.response;
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
      onSuccess: (state, action) =>
        //  가입 성공
        state.set('nickname', action.payload.data.nickname),
      onFailure: (state, action) => {
        const { data } = action.payload.response;
        console.log(data);
        alert('이메일 인증 에러');
        return state;
      },
    }),
    ...pender({
      type: SEND_EMAIL_FOR_ID,
      onSuccess: (state, action) => {
        const {
          data: { result },
        } = action.payload;
        alert(result);
        return state;
      },
      onFailure: (state, action) => {
        const {
          data: { result },
        } = action.payload.response;
        alert(result);
        return state;
      },
    }),
    ...pender({
      type: SEND_EMAIL_FOR_PW,
      onSuccess: (state, action) => {
        const {
          data: { result },
        } = action.payload;
        alert(result);
        return state;
      },
      onFailure: (state, action) => {
        const { data } = action.payload;
        console.log(data);
        alert('이메일 인증 에러');
        return state;
      },
    }),
    ...pender({
      type: ACCOUNT_FIND,
      onSuccess: (state, action) => {
        const { data } = action.payload;
        return state.set('userId', data.success);
      },
      onFailure: (state, action) => {
        const { data } = action.payload;
        console.log(data);
        alert('인증 에러');
        return state;
      },
    }),
    ...pender({
      type: RESET_PASSWORD_EMAIL,
      onSuccess: (state) => {
        alert('비밀번호를 수정하셨습니다');
        return state.set('resetPwSuccess', true);
      },
      onFailure: (state, action) => {
        const { data } = action.payload;
        console.log(data);
        alert('인증 에러');
        return state;
      },
    }),
  },
  initialState
);
