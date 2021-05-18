import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as freeActions from 'store/modules/free';
import * as writeActions from 'store/modules/write';
import Post from 'components/Post';
import { NotFoundPage } from 'pages';

class FreePostContainer extends Component {
  componentDidMount() {
    const { match } = this.props;
    const { postid } = match.params;
    this.getPostInfo(postid);
    this.getReply(postid, 1, 'recomment_count');
    this.getPost();
  }

  componentDidUpdate(prevProps) {
    const { location, match } = this.props;
    if (location !== prevProps.location) {
      const { postid } = match.params;
      this.getPostInfo(postid);
      this.getReply(postid, 1, 'recomment_count');
      this.getPost();
    }
  }

  getPost() {
    //  주소바뀔 때 글 목록 가져오기
    const { location } = this.props;
    const query = queryString.parse(location.search);
    const params = {};
    if (query.page) {
      params.page = query.page;
    }
    if (query.search) {
      params.searchWord = query.search;
      params.searchType = 'title';
    }
    this.getPostList(params);
  }

  getPostInfo = async (postId) => {
    const { location, FreeActions } = this.props;
    const tmp = location.pathname.split('/');
    try {
      await FreeActions.getPostInfo(tmp[2], postId);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  getPostReply = async (postid, page, ordering) => {
    const { FreeActions } = this.props;
    try {
      await FreeActions.getPostReply(postid, page, ordering);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  addPostReply = async (formData) => {
    const { WriteActions } = this.props;
    try {
      await WriteActions.addPostReply(formData);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  updatePostReply = async (formData, updateId) => {
    const { WriteActions, match } = this.props;
    try {
      await WriteActions.updatePostReply(formData, updateId);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getPostReply(match.params.postid, 1);
  };

  addPostRereply = async (formData) => {
    const { WriteActions, match } = this.props;
    try {
      await WriteActions.addPostRereply(formData);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getPostReply(match.params.postid, 1);
  };

  deletePostReply = async (replyUrl) => {
    const { WriteActions, match } = this.props;
    try {
      await WriteActions.deletePostReply(replyUrl);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getPostReply(match.params.postid, 1);
  };

  updatePostRereply = async (formdata, updateId) => {
    const { WriteActions, match } = this.props;
    try {
      await WriteActions.updatePostRereply(formdata, updateId);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getPostReply(match.params.postid, 1);
  };

  deletePostRereply = async (reReplyUrl) => {
    const { WriteActions, match } = this.props;
    try {
      await WriteActions.deletePostRereply(reReplyUrl);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getPostReply(match.params.postid, 1);
  };

  replyRecommend = async (replyUrl) => {
    const { WriteActions, match } = this.props;
    try {
      await WriteActions.recommendPostReply(replyUrl);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getPostReply(match.params.postid, 1);
  };

  reReplyRecommend = async (reReplyUrl) => {
    const { WriteActions, match } = this.props;
    try {
      await WriteActions.recommendPostRereply(reReplyUrl);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getPostReply(match.params.postid, 1);
  };

  deletePost = async () => {
    const { history, match, location, WriteActions, delete_success } = this.props;
    try {
      await WriteActions.deletePost(match.params.board_url, match.params.postid); //  boardUrl, postId
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    if (delete_success) {
      const tmp = location.pathname.split('/');
      history.replace(`/${tmp[1]}/${tmp[2]}`);
    }
  };

  getReply = (postid, page, ordering) => {
    if (ordering === 'created_at') {
      this.getPostReply(postid, page, '');
    } else {
      this.getPostReply(postid, page, ordering);
    }
  };

  recommendPost = async (postid) => {
    const { WriteActions, history, match, isAuthenticated } = this.props;
    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      history.push('/login');
    } else {
      try {
        await WriteActions.recommendPost(match.params.postid);
      } catch (e) {
        console.log(`error log: ${e}`);
      }
      this.getPostInfo(match.params.postid);
    }
  };

  getPostList = async (params) => {
    const { location, FreeActions } = this.props;
    const tmp = location.pathname.split('/');
    try {
      await FreeActions.getPostList(tmp[2], params);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  render() {
    const {
      history,
      location,
      match,
      isAuthenticated,
      reply_success,
      rereply_success,
      WriteActions,
      postList,
      postCount,
      profile,
      postInfo,
      postReplyList,
      postReplyCount,
      postInfoFailure,
    } = this.props;
    const isSuperuser = profile.get('is_superuser');
    if (postInfoFailure)
      return (
        <>
          <NotFoundPage />
        </>
      );
    return (
      <>
        <Post
          type="free"
          history={history}
          location={location}
          isAuthenticated={isAuthenticated}
          reply_success={reply_success}
          rereply_success={rereply_success}
          postid={match.params.postid}
          getReply={this.getReply}
          setPost={WriteActions.setPost}
          deletePost={this.deletePost}
          addPostReply={this.addPostReply}
          addPostRereply={this.addPostRereply}
          getPostInfo={this.getPostInfo}
          postInfo={postInfo}
          postReplyList={postReplyList}
          updatePostReply={this.updatePostReply}
          deletePostReply={this.deletePostReply}
          updatePostRereply={this.updatePostRereply}
          deletePostRereply={this.deletePostRereply}
          replyRecommend={this.replyRecommend}
          reReplyRecommend={this.reReplyRecommend}
          postReplyCount={postReplyCount}
          recommendPost={this.recommendPost}
          postCount={postCount}
          postList={postList}
          isSuperuser={isSuperuser}
        />
      </>
    );
  }
}
export default connect(
  (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
    profile: state.auth.get('profile'),
    postInfo: state.free.get('postInfo'),
    postReplyList: state.free.get('postReplyList'),
    postReplyCount: state.free.get('postReplyCount'),
    reply_success: state.pender.success['write/ADD_POST_REPLY'],
    rereply_success: state.pender.success['write/ADD_POST_REREPLY'],
    delete_success: state.pender.success['write/DELETE_POST'],
    postCount: state.free.get('postCount'),
    postList: state.free.get('postList'),
    postInfoFailure: state.pender.failure['free/POST_INFO'],
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    FreeActions: bindActionCreators(freeActions, dispatch),
    WriteActions: bindActionCreators(writeActions, dispatch),
  })
)(FreePostContainer);
