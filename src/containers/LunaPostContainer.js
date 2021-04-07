import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as lunaActions from 'store/modules/luna';
import * as writeActions from 'store/modules/write';
import Post from 'components/Post';

class LunaPostContainer extends Component {
  componentDidMount() {
    const { match } = this.props;
    const { postid } = match.params;
    this.getPostInfo(postid);
    this.getReply(postid, 1);
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

  addPostImage = async (formdata, func) => {
    const { WriteActions, imageURL } = this.props;
    try {
      await WriteActions.addPostImage(formdata);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    func(imageURL);
  };

  getPostInfo = async (postId) => {
    const { location, LunaActions } = this.props;
    const tmp = location.pathname.split('/');
    try {
      await LunaActions.getPostInfo(tmp[2], postId);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  getPostReply = async (postid, page, ordering) => {
    const { LunaActions } = this.props;
    try {
      await LunaActions.getPostReply(postid, page, ordering);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  addPostReply = async (formData) => {
    const { WriteActions, match } = this.props;
    try {
      await WriteActions.addPostReply(formData);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getPostReply(match.params.postid, 1);
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

  deletePostReply = async (replyUrl) => {
    const { WriteActions, match } = this.props;
    try {
      await WriteActions.deletePostReply(replyUrl);
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

  recommendPost = async () => {
    const { WriteActions, match } = this.props;
    try {
      await WriteActions.recommendPost(match.params.postid);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getPostInfo(match.params.postid);
  };

  deletePost = async () => {
    const { WriteActions, match, delete_success, location, history } = this.props;
    try {
      await WriteActions.deletePost(match.params.board_url, match.params.postid); // boardUrl, postId
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

  getPostList = async (params) => {
    const { location, LunaActions } = this.props;
    const tmp = location.pathname.split('/');
    try {
      await LunaActions.getPostList(tmp[2], params);
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
      postInfo,
      postReplyList,
      postReplyCount,
      postCount,
      postList,
      profile,
    } = this.props;
    const isSuperuser = profile.get('is_superuser');
    return (
      <>
        <Post
          type="luna"
          history={history}
          location={location}
          isAuthenticated={isAuthenticated}
          postid={match.params.postid}
          reply_success={reply_success}
          rereply_success={rereply_success}
          getReply={this.getReply}
          setPost={WriteActions.setPost}
          deletePost={this.deletePost}
          addPostReply={this.addPostReply}
          addPostRereply={this.addPostRereply}
          addPostImage={this.addPostImage}
          getPostInfo={this.getPostInfo}
          updatePostReply={this.updatePostReply}
          deletePostReply={this.deletePostReply}
          updatePostRereply={this.updatePostRereply}
          deletePostRereply={this.deletePostRereply}
          replyRecommend={this.replyRecommend}
          reReplyRecommend={this.reReplyRecommend}
          recommendPost={this.recommendPost}
          postInfo={postInfo}
          postReplyList={postReplyList}
          postReplyCount={postReplyCount}
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
    imageURL: state.luna.get('imageURL'),
    postInfo: state.luna.get('postInfo'),
    postReplyList: state.luna.get('postReplyList'),
    postReplyCount: state.luna.get('postReplyCount'),
    reply_success: state.pender.success['write/ADD_POST_REPLY'],
    rereply_success: state.pender.success['write/ADD_POST_REREPLY'],
    delete_success: state.pender.success['write/DELETE_POST'],
    postCount: state.luna.get('postCount'),
    postList: state.luna.get('postList'),
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    LunaActions: bindActionCreators(lunaActions, dispatch),
    WriteActions: bindActionCreators(writeActions, dispatch),
  })
)(LunaPostContainer);
