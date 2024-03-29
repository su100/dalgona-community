import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as writeActions from 'store/modules/write';
import Modal from 'components/common/Modal';
import Write from 'components/Write';

class WriteContainer extends Component {
  constructor(props) {
    super(props);
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
      this.getBoardInfo(); //  게시판 정보 가져오기
    }
  }

  componentDidUpdate(prevProps) {
    const { location, history, post_success, addPostId, update_success, updatePostId } = this.props;
    //  게시글 올리기 성공시
    if (post_success && prevProps.post_success !== post_success) {
      const tmp = location.pathname.split('/');
      history.replace(`/${tmp[1]}/${tmp[2]}/${addPostId}`);
    } else if (update_success && prevProps.update_success !== update_success) {
      const tmp = location.pathname.split('/');
      history.push(`/${tmp[1]}/${tmp[2]}/${updatePostId}`);
    }
    return null;
  }

  getBoardInfo = async () => {
    const { location, WriteActions } = this.props;
    const tmp = location.pathname.split('/');
    try {
      await WriteActions.getBoardInfo(tmp[2]);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  addPostImage = async (formdata, func) => {
    const { WriteActions } = this.props;
    try {
      await WriteActions.addPostImage(formdata);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    const { imageURL } = this.props;
    func(imageURL);
  };

  addPost = async (title, body, boardUrl, anonymous) => {
    const { WriteActions } = this.props;
    try {
      await WriteActions.addPost(title, body, boardUrl, anonymous);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  updatePost = async (boardUrl, postId, title, body, anonymous) => {
    const { WriteActions } = this.props;
    try {
      await WriteActions.updatePost(boardUrl, postId, title, body, anonymous);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  closeModal = () => {
    const { modalFunction } = this.state;
    modalFunction();
    // isModal, modalMessage 초기화
    this.setState({ isModal: false, modalType: '', modalMessage: '', modalFunction: () => {} });
  };

  render() {
    const { history, match, location, boardInfo, editPost, isAuthenticated, post_success, WriteActions } = this.props;
    const { isModal, modalType, modalMessage } = this.state;
    return (
      <>
        <Write
          history={history}
          match={match}
          location={location}
          boardInfo={boardInfo}
          editPost={editPost}
          setPost={WriteActions.setPost}
          isAuthenticated={isAuthenticated}
          post_success={post_success}
          addPostImage={this.addPostImage}
          updatePost={this.updatePost}
          addPost={this.addPost}
        />
        {isModal && <Modal type={modalType} message={modalMessage} closeModal={this.closeModal} />}
      </>
    );
  }
}
export default connect(
  (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
    boardInfo: state.write.get('boardInfo'),
    editPost: state.write.get('editPost'),
    imageURL: state.write.get('imageURL'),
    addPostId: state.write.get('addPostId'),
    updatePostId: state.write.get('updatePostId'),
    loading: state.pender.pending['write/ADD_POST_IMAGE'],
    post_loading: state.pender.pending['write/ADD_POST'],
    img_success: state.pender.success['write/ADD_POST_IMAGE'],
    update_success: state.pender.success['write/UPDATE_POST'],
    post_success: state.pender.success['write/ADD_POST'],
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    WriteActions: bindActionCreators(writeActions, dispatch),
  })
)(WriteContainer);
