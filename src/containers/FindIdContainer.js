import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ProgressCircle from 'components/common/ProgressCircle';
import FindId from 'components/FindId';
import * as authActions from 'store/modules/auth';

class FindIdContainer extends Component {
  sendEmailForId = async (email) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.sendEmailForId(email);
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

  checkEmail = async (email) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkEmail(email);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  render() {
    const { history, emailLoading, accountFindSuccess, findIdFromEmailSuccess } = this.props;
    return (
      <>
        {emailLoading && <ProgressCircle />}
        <FindId
          history={history}
          sendEmailForId={this.sendEmailForId}
          accountFind={this.accountFind}
          checkEmail={this.checkEmail}
          accountFindSuccess={accountFindSuccess}
          findIdFromEmailSuccess={findIdFromEmailSuccess}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({
    emailLoading: state.pender.pending['auth/SEND_EMAIL_FOR_ID'],
    accountFindSuccess: state.pender.success['auth/ACCOUNT_FIND'],
    findIdFromEmailSuccess: state.pender.success['auth/SEND_EMAIL_FOR_ID'],
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(FindIdContainer);
