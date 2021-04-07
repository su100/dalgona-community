import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as writeActions from 'store/modules/write';
import Write from 'components/Write';

class WriteContainer extends Component {
  componentDidMount() {
    const { isAuthenticated, history } = this.props;
    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      history.push('/login');
    } else {
      this.getBoardInfo(); //  게시판 정보 가져오기
    }
  }

  getBoardInfo = async () => {
    const { location, WriteActions } = this.props;
    const tmp = location.pathname.split('/');
    try {
      await WriteActions.getBoardInfo(tmp[3] ? tmp[2] : tmp[1]);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  addPostImage = async (formdata, func) => {
    const { WriteActions, imageURL } = this.props;
    try {
      await WriteActions.addPostImage(formdata);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    func(imageURL);
  };

  addPost = async (title, body, boardUrl, anonymous) => {
    const { WriteActions, history, post_success, location } = this.props;
    try {
      await WriteActions.addPost(title, body, boardUrl, anonymous);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    if (post_success) {
      const tmp = location.pathname.split('/');
      history.push(`/${tmp[1]}/${boardUrl}`);
    }
  };

  updatePost = async (boardUrl, postId, title, body, anonymous) => {
    const { WriteActions, history, update_success, location } = this.props;
    try {
      await WriteActions.updatePost(boardUrl, postId, title, body, anonymous);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    if (update_success) {
      const tmp = location.pathname.split('/');
      history.push(`/${tmp[1]}/${boardUrl}`);
    }
  };

  render() {
    const { history, match, location, boardInfo, editPost, isAuthenticated, post_success, WriteActions } = this.props;
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
