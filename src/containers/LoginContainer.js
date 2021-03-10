import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import Login from 'components/Login';

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        if (this.props.isAuthenticated) {
            //권한 있을 때 접근하면 뒤로가기
            alert('이미 로그인된 상태입니다.');
            this.props.history.goBack();
        }
    }
    signIn = async (username, password) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.signIn(username, password);
        } catch (e) {
            console.log('error log:' + e);
        }
        console.log(this.props.isEmailNotCertified);
        if (this.props.success) {
            //로그인 성공시 뒤로가기
            this.props.history.goBack();
            console.log(this.props.rememberMe);
        } else if (this.props.failure && this.props.isEmailNotCertified) {
            //이메일 인증 안 된 경우 재인증 페이지
            AuthActions.setUsername(username);
            this.props.history.push('/SignUp');
        }
    };
    render() {
        console.log('home container');
        return (
            <Fragment>
                <Login signIn={this.signIn} setRemember={this.props.AuthActions.setRemember} />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        isEmailNotCertified: state.auth.get('isEmailNotCertified'),
        isAuthenticated: state.auth.get('isAuthenticated'),
        rememberMe: state.auth.get('rememberMe'),
        success: state.pender.success['auth/SIGN_IN'],
        failure: state.pender.failure['auth/SIGN_IN'],
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(LoginContainer);
