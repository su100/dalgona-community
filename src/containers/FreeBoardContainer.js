import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as freeActions from 'store/modules/free';
import FreeBoard from 'components/FreeBoard';
import { NotFoundPage } from 'pages';

class FreeBoardContainer extends Component {
  componentDidMount() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      this.getBookmarkList(); //  즐겨찾기 가져오기
    }
    this.getBoardInfo(); //  게시판 정보 가져오기
    this.getBestPostList(); //  실시간 인기글 가져오기
    this.getPost(); //  글 목록 가져오기
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { location } = this.props;
    //  게시판 바뀔 때
    if (prevProps.location.pathname !== location.pathname) {
      return 'board';
    }
    if (prevProps.location.search !== location.search) {
      //  게시판 이동 없이 글만 새로 가져오기
      return 'post';
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot === 'board') {
      //  게시판 이동할 때
      this.getBoardInfo(); //  게시판 정보 가져오기
      this.getBestPostList(); //  실시간 인기글 가져오기
      this.getPost(); //  글 목록 가져오기
    } else if (snapshot === 'post') {
      //  게시판 그대로고 글만 새로 가져올 때
      this.getPost(); //  글 목록 가져오기
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

  getBoardInfo = async () => {
    const { location, FreeActions } = this.props;
    const tmp = location.pathname.split('/');
    try {
      await FreeActions.getBoardInfo(tmp[2]);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  getBestPostList = async () => {
    const { location, FreeActions } = this.props;
    const tmp = location.pathname.split('/');
    try {
      await FreeActions.getBestPostList(tmp[2]);
    } catch (e) {
      console.log(`error log: ${e}`);
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

  getBookmarkList = async () => {
    const { FreeActions } = this.props;
    try {
      await FreeActions.getBookmarkList();
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  updateBookmark = async () => {
    const { location, FreeActions } = this.props;
    const tmp = location.pathname.split('/');
    try {
      await FreeActions.updateBookmark(tmp[2]);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  render() {
    const {
      isAuthenticated,
      history,
      location,
      boardInfo,
      bestPostList,
      postCount,
      postList,
      bookmarkList,
      viewBoardFailure,
    } = this.props;
    if (viewBoardFailure)
      return (
        <>
          <NotFoundPage />
        </>
      );
    return (
      <>
        <FreeBoard
          isAuthenticated={isAuthenticated}
          history={history}
          location={location}
          boardInfo={boardInfo}
          bookmarkList={bookmarkList}
          bestPostList={bestPostList}
          postCount={postCount}
          postList={postList}
          updateBookmark={this.updateBookmark}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
    boardInfo: state.free.get('boardInfo'),
    bestPostList: state.free.get('bestPostList'),
    postCount: state.free.get('postCount'),
    postList: state.free.get('postList'),
    bookmarkList: state.free.get('bookmarkList'),
    viewBoardFailure: state.pender.failure['free/VIEW_BOARD'],
  }),
  (dispatch) => ({
    FreeActions: bindActionCreators(freeActions, dispatch),
  })
)(FreeBoardContainer);
