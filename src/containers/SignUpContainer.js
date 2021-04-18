import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import SignUp from 'components/SignUp';

class SignUpContainer extends Component {
  signUp = async (formdata) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.signUp(formdata);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  checkUser = async (imp_uid, func) => {
    const { AuthActions } = this.props;
    const formData = new FormData();
    formData.append('imp_uid', imp_uid);
    try {
      await AuthActions.checkUser(formData);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    const { user_success } = this.props;
    if (user_success) {
      // 본인인증 성공시 다음 컴포넌트 넘기기
      func();
    }
  };

  checkUsername = async (username) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkUsername(username);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  checkEmail = async (email) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkEmail(email);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  checkNickname = async (nickname) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkNickname(nickname);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  render() {
    const {
      history,
      location,
      checkedUser,
      userNameUnique,
      emailUnique,
      nicknameUnique,
      AuthActions,
      user_success,
      signup_success,
      signUpSuccess,
    } = this.props;
    return (
      <>
        <SignUp
          history={history}
          location={location}
          checkedUser={checkedUser}
          userNameUnique={userNameUnique}
          emailUnique={emailUnique}
          nicknameUnique={nicknameUnique}
          checkUser={this.checkUser}
          signUp={this.signUp}
          checkUsername={this.checkUsername}
          checkEmail={this.checkEmail}
          checkNickname={this.checkNickname}
          setUnique={AuthActions.setUnique}
          user_success={user_success}
          signup_success={signup_success}
          signUpSuccess={signUpSuccess}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
    checkedUser: state.auth.get('checkedUser'),
    userNameUnique: state.auth.get('userNameUnique'),
    emailUnique: state.auth.get('emailUnique'),
    nicknameUnique: state.auth.get('nicknameUnique'),
    signUpSuccess: state.auth.get('signUpSuccess'),
    user_success: state.pender.success['auth/CHECK_USER'],
    signup_success: state.pender.success['auth/SIGN_UP'],
    signup_failure: state.pender.failure['auth/SIGN_UP'],
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(SignUpContainer);
