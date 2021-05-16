import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import Login from 'components/Login';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    const { isAuthenticated, history, match, location } = this.props;
    console.log(location);
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
      if (location.path === 'findpw') {
        history.replace('/');
      } else {
        history.goBack();
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
