import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import Login from 'components/Login';

class LoginContainer extends Component {
  componentDidMount() {
    const { history, isAuthenticated } = this.props;
    if (isAuthenticated) {
      //  권한 있을 때 접근하면 뒤로가기
      alert('이미 로그인된 상태입니다.');
      history.goBack();
    }
  }

  componentDidUpdate() {
    const { success, history } = this.props;
    if (success) {
      //  로그인 성공시 뒤로가기
      const { location } = this.props;
      const { state } = location;

      if (state?.prevPath) {
        // 기본 이동: 이전 경로 있음
        /*
        if (
          state?.prevPath === '/find/id' ||
          state?.prevPath === '/find/pw' ||
          state?.prevPath.includes('/password-reset-confirm')
        ) {
          // 아이디 비밀번호 찾기 || 비밀번호 재설정 페이지는 home으로 replace
          history.replace('/');
        } else {
           */
        // 이전 페이지로 이동
        history.push(state.prevPath);
        /* } */
      } else {
        // 예외 이동: 이전 경로 없음 -> home
        history.push('/');
      }
    }
  }

  signIn = async (username, password) => {
    const { AuthActions, failure, isEmailNotCertified, history } = this.props;
    try {
      await AuthActions.signIn(username, password);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    if (failure && isEmailNotCertified) {
      AuthActions.setUsername(username);
      history.push('/signup');
    }
  };

  render() {
    const { AuthActions } = this.props;
    return (
      <>
        <Login signIn={this.signIn} setRemember={AuthActions.setRemember} />
      </>
    );
  }
}

export default connect(
  (state) => ({
    // isEmailNotCertified: state.auth.get('isEmailNotCertified'),
    isAuthenticated: state.auth.get('isAuthenticated'),
    rememberMe: state.auth.get('rememberMe'),
    success: state.pender.success['auth/SIGN_IN'],
    failure: state.pender.failure['auth/SIGN_IN'],
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(LoginContainer);
