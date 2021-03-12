import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import Profile from 'components/Profile';

class ProfileContainer extends Component {
    checkNickname = async (nickname) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.checkNickname(nickname);
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    getProfile = async () => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.getProfile();
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    updateProfile = async (formData) => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.updateProfile(formData);
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    deleteUser = async () => {
        const { AuthActions } = this.props;
        try {
            await AuthActions.deleteUser();
        } catch (e) {
            console.log('error log:' + e);
        }
        if (this.props.quitSuccess) {
            this.props.history.push('/');
        }
    };

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            alert('로그인이 필요합니다.');
            this.props.history.push('/login');
        } else {
            this.getProfile();
        }
    }

    render() {
        const { success, profile, nicknameUnique } = this.props;
        return (
            <Fragment>
                {success && (
                    <Profile
                        profile={profile}
                        nicknameUnique={nicknameUnique}
                        updateProfile={this.updateProfile}
                        deleteUser={this.deleteUser}
                        checkNickname={this.checkNickname}
                    />
                )}
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        isAuthenticated: state.auth.get('isAuthenticated'),
        profile: state.auth.get('profile'),
        nicknameUnique: state.auth.get('nicknameUnique'),
        loading: state.pender.pending['auth/GET_PROFILE'],
        success: state.pender.success['auth/GET_PROFILE'],
        quitSuccess: state.pender.success['auth/DELETE_USER'],
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
    })
)(ProfileContainer);
