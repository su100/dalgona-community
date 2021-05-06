import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FindPw from 'components/FindPw';
import * as authActions from 'store/modules/auth';

class FindPwContainer extends Component {
  sendEmailForPw = async (username, email) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.sendEmailForPw(username, email);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  accountFind = async (formData) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.accountFind(formData);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  resetPassWordEmail = async (uid, token, formData) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.resetPassWordEmail(uid, token, formData);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  render() {
    const { history, location, accountFindSuccess, resetPwSuccess } = this.props;
    return (
      <>
        <FindPw
          history={history}
          pathname={location.pathname}
          sendEmailForPw={this.sendEmailForPw}
          accountFind={this.accountFind}
          resetPassWordEmail={this.resetPassWordEmail}
          accountFindSuccess={accountFindSuccess}
          resetPwSuccess={resetPwSuccess}
        />
      </>
    );
  }
}
export default connect(
  (state) => ({
    accountFindSuccess: state.pender.success['auth/ACCOUNT_FIND'],
    resetPwSuccess: state.pender.success['auth/RESET_PASSWORD_EMAIL'],
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(FindPwContainer);
