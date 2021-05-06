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

  render() {
    const { history } = this.props;
    return (
      <>
        <FindPw history={history} sendEmailForPw={this.sendEmailForPw} />
      </>
    );
  }
}
export default connect(
  (state) => ({}),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
  })
)(FindPwContainer);
