import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    const { history, accountFindSuccess, findIdRequest } = this.props;
    console.log(this.props);
    return (
      <>
        <FindId
          history={history}
          sendEmailForId={this.sendEmailForId}
          accountFind={this.accountFind}
          checkEmail={this.checkEmail}
          accountFindSuccess={accountFindSuccess}
          findIdRequest={findIdRequest}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({
    accountFindSuccess: state.pender.success['auth/ACCOUNT_FIND'],
    findIdRequest: state.pender.success['auth/SEND_EMAIL_FOR_ID'],
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(FindIdContainer);
