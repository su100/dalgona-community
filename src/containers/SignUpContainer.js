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
      userNameUnique,
      emailUnique,
      nicknameUnique,
      AuthActions,
      signup_success,
      signUpSuccess,
    } = this.props;
    return (
      <>
        <SignUp
          history={history}
          location={location}
          userNameUnique={userNameUnique}
          emailUnique={emailUnique}
          nicknameUnique={nicknameUnique}
          signUp={this.signUp}
          checkUsername={this.checkUsername}
          checkEmail={this.checkEmail}
          checkNickname={this.checkNickname}
          setUnique={AuthActions.setUnique}
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
    userNameUnique: state.auth.get('userNameUnique'),
    emailUnique: state.auth.get('emailUnique'),
    nicknameUnique: state.auth.get('nicknameUnique'),
    signUpSuccess: state.auth.get('signUpSuccess'),
    signup_success: state.pender.success['auth/SIGN_UP'],
    signup_failure: state.pender.failure['auth/SIGN_UP'],
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(SignUpContainer);
