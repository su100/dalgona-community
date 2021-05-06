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

  render() {
    const { history, accountFindSuccess } = this.props;
    return (
      <>
        <FindPw
          history={history}
          sendEmailForPw={this.sendEmailForPw}
          accountFind={this.accountFind}
          accountFindSuccess={accountFindSuccess}
        />
      </>
    );
  }
}
export default connect(
  (state) => ({
    accountFindSuccess: state.pender.success['auth/ACCOUNT_FIND'],
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(FindPwContainer);
