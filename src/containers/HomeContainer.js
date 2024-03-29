import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as homeActions from 'store/modules/home';
import Home from 'components/Home';

class HomeContainer extends Component {
  componentDidMount() {
    const { isAuthenticated } = this.props;
    if (isAuthenticated) {
      //  로그인 상태일 경우
      this.getBookmarkList(); //  즐겨찾는게시판 가져오기
    }
    this.getHotVoteList(); //  실시간 인기 투표 가져오기
    this.getHotPostList(); //  HOT 실시간 인기글 가져오기
    this.getNewsList(); //  연예뉴스 가져오기
  }

  getHotVoteList = async () => {
    const { HomeActions } = this.props;
    try {
      await HomeActions.getHotVoteList();
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  getHotPostList = async (type) => {
    //  type: 전체는 빈 값, 루나는 luna, 자유는 free
    const { HomeActions } = this.props;
    try {
      await HomeActions.getHotPostList(type);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  getBookmarkList = async () => {
    const { HomeActions } = this.props;
    try {
      await HomeActions.getBookmarkList();
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  getNewsList = async () => {
    const { HomeActions } = this.props;
    try {
      await HomeActions.getNewsList();
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  render() {
    const { hotVoteList, bookmarkList, hotPostList, newsList } = this.props;
    return (
      <>
        <Home
          hotVoteList={hotVoteList}
          bookmarkList={bookmarkList}
          hotPostList={hotPostList}
          newsList={newsList}
          getHotPostList={this.getHotPostList}
          getNewsList={this.getNewsList}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
    hotVoteList: state.home.get('hotVoteList'),
    bookmarkList: state.home.get('bookmarkList'),
    hotPostList: state.home.get('hotPostList'),
    newsList: state.home.get('newsList'),
  }),
  (dispatch) => ({
    HomeActions: bindActionCreators(homeActions, dispatch),
  })
)(HomeContainer);
