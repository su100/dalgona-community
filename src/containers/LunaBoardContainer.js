import React, { Component, Fragment } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as lunaActions from 'store/modules/luna';
import LunaBoard from 'components/LunaBoard';

class LunaBoardContainer extends Component {
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
    const { location, LunaActions } = this.props;
    const tmp = location.pathname.split('/');
    try {
      await LunaActions.getBoardInfo(tmp[2]);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  getBestPostList = async () => {
    const { location, LunaActions } = this.props;
    const tmp = location.pathname.split('/');
    try {
      await LunaActions.getBestPostList(tmp[2]);
    } catch (e) {
      console.log(`error log: ${e}`);
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

  getBookmarkList = async () => {
    const { LunaActions } = this.props;
    try {
      await LunaActions.getBookmarkList();
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  updateBookmark = async () => {
    const { location, LunaActions } = this.props;
    const tmp = location.pathname.split('/');
    try {
      await LunaActions.updateBookmark(tmp[2]);
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
    } = this.props;
    return (
      <>
        <LunaBoard
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
    boardInfo: state.luna.get('boardInfo'),
    bestPostList: state.luna.get('bestPostList'),
    postCount: state.luna.get('postCount'),
    postList: state.luna.get('postList'),
    bookmarkList: state.luna.get('bookmarkList'),
  }),
  (dispatch) => ({
    LunaActions: bindActionCreators(lunaActions, dispatch),
  })
)(LunaBoardContainer);
