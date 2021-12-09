import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import Profile from 'components/Profile';
import Modal from 'components/common/Modal';

class ProfileContainer extends Component {
  constructor() {
    super();
    this.state = {
      isModal: false,
      modalType: '',
      modalMessage: '',
      modalFunction: () => {},
    };
  }

  componentDidMount() {
    const { isAuthenticated, history } = this.props;
    if (!isAuthenticated) {
      this.setState({
        isModal: true,
        modalType: 'alert',
        modalMessage: '로그인이 필요합니다.',
        modalFunction: () => history.push('/login'),
      });
    } else {
      this.getProfile();
    }
  }

  checkNickname = async (nickname) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.checkNickname(nickname);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  getProfile = async () => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.getProfile();
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  updateProfile = async (formData) => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.updateProfile(formData);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  deleteUser = async () => {
    const { AuthActions, history } = this.props;
    try {
      await AuthActions.deleteUser();
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    const { quitSuccess } = this.props;
    if (quitSuccess) {
      //  탈퇴 성공시
      AuthActions.signOut(); //  로그아웃
      history.push('/'); //  메인으로 이동
    }
  };

  closeModal = () => {
    // isModal, modalMessage 초기화
    const { modalFunction } = this.state;
    modalFunction();
    this.setState({ isModal: false, modalType: '', modalMessage: '', modalFunction: () => {} });
  };

  render() {
    const { success, profile, nicknameUnique } = this.props;
    const { isModal, modalType, modalMessage } = this.state;
    return (
      <>
        {success && (
          <Profile
            profile={profile}
            nicknameUnique={nicknameUnique}
            updateProfile={this.updateProfile}
            deleteUser={this.deleteUser}
            checkNickname={this.checkNickname}
          />
        )}
        {isModal && <Modal type={modalType} message={modalMessage} closeModal={this.closeModal} />}
      </>
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
