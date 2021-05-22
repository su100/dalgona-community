import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import * as authActions from 'store/modules/auth';
import * as dalgonaActions from 'store/modules/dalgona';
import * as writeActions from 'store/modules/write';
import Post from 'components/Post';
import { NotFoundPage } from 'pages';

class NoticePostContainer extends Component {
  componentDidMount() {
    const { match } = this.props;
    const { noticeid } = match.params;
    this.getPostInfo(noticeid);
    this.getReply(noticeid, 1);
    this.getPost();
  }

  componentDidUpdate(prevProps) {
    const { match, location } = this.props;
    if (location !== prevProps.location) {
      const { noticeid } = match.params;
      this.getPostInfo(noticeid);
      this.getReply(noticeid, 1, 'recommend_count');
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
    const { location, DalgonaActions } = this.props;
    const tmp = location.pathname.split('/');
    try {
      await DalgonaActions.getPostInfo(tmp[2], postId);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  getPostReply = async (postid, page, ordering) => {
    const { DalgonaActions, match } = this.props;
    try {
      await DalgonaActions.getPostReply(match.params.noticeid, page, ordering);
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

  addPostRereply = async (formData) => {
    const { WriteActions } = this.props;
    try {
      await WriteActions.addPostRereply(formData);
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
    this.getPostReply(match.params.noticeid, 1);
  };

  deletePostReply = async (replyUrl) => {
    const { WriteActions, match } = this.props;
    try {
      await WriteActions.deletePostReply(replyUrl);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getPostReply(match.params.noticeid, 1);
  };

  updatePostRereply = async (formdata, updateId) => {
    const { WriteActions, match } = this.props;
    try {
      await WriteActions.updatePostRereply(formdata, updateId);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getPostReply(match.params.noticeid, 1);
  };

  deletePostRereply = async (reReplyUrl) => {
    const { WriteActions, match } = this.props;
    try {
      await WriteActions.deletePostRereply(reReplyUrl);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getPostReply(match.params.noticeid, 1);
  };

  deletePost = async () => {
    const { WriteActions, match, location, history } = this.props;
    try {
      await WriteActions.deletePost('notice', match.params.noticeid); //  boardUrl, postId
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    const { delete_success } = this.props;
    if (delete_success) {
      const tmp = location.pathname.split('/');
      history.replace(`/${tmp[1]}/${tmp[2]}`);
    }
  };

  replyRecommend = async (replyUrl) => {
    const { WriteActions, match } = this.props;
    try {
      await WriteActions.recommendPostReply(replyUrl);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getPostReply(match.params.noticeid, 1);
  };

  reReplyRecommend = async (reReplyUrl) => {
    const { WriteActions, match } = this.props;
    try {
      await WriteActions.recommendPostRereply(reReplyUrl);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getPostReply(match.params.noticeid, 1);
  };

  recommendPost = async () => {
    const { WriteActions, history, match, isAuthenticated } = this.props;
    if (!isAuthenticated) {
      alert('로그인이 필요합니다.');
      history.push('/login');
    } else {
      try {
        await WriteActions.recommendPost(match.params.noticeid);
      } catch (e) {
        console.log(`error log: ${e}`);
      }
      this.getPostInfo(match.params.noticeid);
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
    const { DalgonaActions } = this.props;
    try {
      await DalgonaActions.getNoticeList('notice', params);
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
      noticeList,
      noticeCount,
      postInfo,
      postReplyList,
      postReplyCount,
      postInfoFailure,
    } = this.props;
    if (postInfoFailure)
      return (
        <>
          <NotFoundPage />
        </>
      );
    return (
      <>
        <Post
          type="dalgona"
          history={history}
          location={location}
          isAuthenticated={isAuthenticated}
          reply_success={reply_success}
          rereply_success={rereply_success}
          postid={match.params.postid}
          getReply={this.getReply}
          getPostInfo={this.getPostInfo}
          addPostReply={this.addPostReply}
          addPostRereply={this.addPostRereply}
          addPostImage={this.addPostImage}
          postInfo={postInfo}
          postReplyList={postReplyList}
          updatePostReply={this.updatePostReply}
          deletePostReply={this.deletePostReply}
          updatePostRereply={this.updatePostRereply}
          deletePostRereply={this.deletePostRereply}
          deletePost={this.deletePost}
          replyRecommend={this.replyRecommend}
          reReplyRecommend={this.reReplyRecommend}
          recommendPost={this.recommendPost}
          postReplyCount={postReplyCount}
          postList={noticeList}
          postCount={noticeCount}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
    postInfo: state.dalgona.get('postInfo'),
    postReplyList: state.dalgona.get('postReplyList'),
    postReplyCount: state.dalgona.get('postReplyCount'),
    reply_success: state.pender.success['write/ADD_POST_REPLY'],
    rereply_success: state.pender.success['write/ADD_POST_REREPLY'],
    delete_success: state.pender.success['write/DELETE_POST'],
    noticeCount: state.dalgona.get('noticeCount'),
    noticeList: state.dalgona.get('noticeList'),
    postInfoFailure: state.pender.failure['dalgona/POST_INFO'],
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    DalgonaActions: bindActionCreators(dalgonaActions, dispatch),
    WriteActions: bindActionCreators(writeActions, dispatch),
  })
)(NoticePostContainer);
