import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FindId from 'components/FindId';
import * as authActions from 'store/modules/auth';

class FindIdContainer extends Component {
  constructor() {
    super();
    this.state = { userId: null };
  }

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
      const { data } = await AuthActions.accountFind(formData);
      this.setState({ userId: data.success });
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
    const { history, accountFindSuccess, findIdFromEmailSuccess } = this.props;
    const { userId } = this.state;
    return (
      <>
        <FindId
          history={history}
          sendEmailForId={this.sendEmailForId}
          accountFind={this.accountFind}
          checkEmail={this.checkEmail}
          accountFindSuccess={accountFindSuccess}
          userId={userId}
          findIdFromEmailSuccess={findIdFromEmailSuccess}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({
    accountFindSuccess: state.pender.success['auth/ACCOUNT_FIND'],
    findIdFromEmailSuccess: state.pender.success['auth/SEND_EMAIL_FOR_ID'],
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(FindIdContainer);
