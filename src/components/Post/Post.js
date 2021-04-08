import React, { Component } from 'react';
import queryString from 'query-string';
import CommentList from 'components/common/comment/CommentList';
import View from 'components/common/View';
import './Post.scss';
import PostList from 'components/common/PostList';
import Pagination from 'components/common/Pagination';

class Post extends Component {
  deleteReply = (e) => {
    const { deletePostReply } = this.props;
    const postReplyId = e.currentTarget.id;
    deletePostReply(postReplyId);
  };

  replyRecommend = (e) => {
    const { replyRecommend } = this.props;
    const postReplyId = e.currentTarget.id;
    replyRecommend(postReplyId);
  };

  deleteRereply = (e) => {
    const { deletePostRereply } = this.props;
    const postRereplyId = e.currentTarget.id;
    deletePostRereply(postRereplyId);
  };

  reReplyRecommend = (e) => {
    const { reReplyRecommend } = this.props;
    const postRereplyId = e.currentTarget.id;
    reReplyRecommend(postRereplyId);
  };

  editPost = () => {
    const { setPost, location, history, postInfo } = this.props;
    const tmp = location.pathname.split('/');
    setPost(postInfo);
    history.push(`/${tmp[1]}/write/${tmp[2]}`);
  };

  deletePost = () => {
    const { deletePost } = this.props;
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      deletePost();
    }
  };

  handlePage = (e) => {
    const { history, location } = this.props;
    const query = queryString.parse(location.search);
    const page = e.target.value;
    const { pathname } = location;
    // searchType:title, searchWord, page
    if (query.search) {
      // url에서 searchWord있는지 판별
      history.push(`${pathname}?page=${page}&search=${query.search}`);
    } else {
      history.push(`${pathname}?page=${page}`);
    }
  };

  render() {
    const {
      postReplyList,
      history,
      location,
      isAuthenticated,
      getReply,
      postReplyCount,
      reply_success,
      rereply_success,
      postInfo,
      recommendPost,
      postList,
      postCount,
      isSuperuser,
      type,
      postid,
      getPostInfo,
      addPostReply,
      addPostRereply,
      updatePostReply,
      updatePostRereply,
    } = this.props;

    const request = location.search;
    const query = queryString.parse(request);
    const currentPage = query.page ? Number(query.page) : 1;
    const urlInfo = location.pathname.split('/');
    const parentBoardUrl = urlInfo[3] ? urlInfo[1] : '';
    const boardUrl = parentBoardUrl ? `${parentBoardUrl}/${urlInfo[2]}` : urlInfo[1];
    const currentPostId = postInfo.id;
    return (
      <div className="post">
        <View
          type={type}
          history={history}
          location={location}
          postid={postid}
          getPostInfo={getPostInfo}
          postInfo={postInfo}
          editPost={this.editPost}
          deletePost={this.deletePost}
          isSuperuser={isSuperuser}
        />
        <CommentList
          history={history}
          location={location}
          vote={false}
          getReply={getReply}
          commentList={postReplyList}
          postReplyCount={postReplyCount}
          isAuthenticated={isAuthenticated}
          reply_success={reply_success}
          rereply_success={rereply_success}
          recommend_count={postInfo.recommend_count}
          deleteReply={this.deleteReply}
          deleteRereply={this.deleteRereply}
          replyRecommend={this.replyRecommend}
          reReplyRecommend={this.reReplyRecommend}
          postid={postid}
          addReply={addPostReply}
          addRereply={addPostRereply}
          updateReply={updatePostReply}
          updateRereply={updatePostRereply}
          recommendPost={recommendPost}
          recommend={postInfo.recommended}
          isRecommend
        />
        <div className="border_line" />
        <PostList
          hasReply
          link={`/${boardUrl}`}
          hasGrid
          postList={postList}
          isInPost
          currentPage={currentPage}
          request={request}
          currentPostId={currentPostId}
        />
        <Pagination countList={postCount} handlePage={this.handlePage} currentPage={currentPage} />
      </div>
    );
  }
}

export default Post;
