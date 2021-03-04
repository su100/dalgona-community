import React, { Component, Fragment } from 'react';
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
            console.log('error log:' + e);
        }
        if (this.props.success) {
            //이메일 발송 화면으로
            this.props.history.push('/SignUp');
        }
    };

    checkUsername = async (username) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkUsername(username);
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    checkEmail = async (email) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkEmail(email);
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    checkNickname = async (nickname) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkNickname(nickname);
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    render() {
        const { history, location, userNameUnique, emailUnique, nicknameUnique, AuthActions } = this.props;
        return (
            <Fragment>
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
                />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        isAuthenticated: state.auth.get('isAuthenticated'),
        userNameUnique: state.auth.get('userNameUnique'),
        emailUnique: state.auth.get('emailUnique'),
        nicknameUnique: state.auth.get('nicknameUnique'),
        success: state.pender.success['auth/SIGN_IN'],
        failure: state.pender.failure['auth/SIGN_IN'],
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(SignUpContainer);
