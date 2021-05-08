import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dalgonaActions from 'store/modules/dalgona';
import * as authActions from 'store/modules/auth';
import NoticeBoard from 'components/NoticeBoard';

class NoticeBoardContainer extends Component {
  componentDidMount() {
    this.getPostList(); //  글 목록 가져오기
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { location } = this.props;
    //  주소 바뀔 때
    if (prevProps.location !== location) {
      return true;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      //  글 목록 가져오기
      this.getPost();
    }
  }

  getPostList = async (params) => {
    const { DalgonaActions } = this.props;
    try {
      await DalgonaActions.getNoticeList('notice', params);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

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

  getProfile = async () => {
    const { AuthActions } = this.props;
    try {
      await AuthActions.getProfile();
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  render() {
    const { history, location, noticeCount, noticeList, profile } = this.props;
    const isSuperuser = profile.get('is_superuser');

    return (
      <>
        <NoticeBoard
          history={history}
          location={location}
          postCount={noticeCount}
          postList={noticeList}
          isSuperuser={isSuperuser}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({
    noticeCount: state.dalgona.get('noticeCount'),
    noticeList: state.dalgona.get('noticeList'),
    profile: state.auth.get('profile'),
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    DalgonaActions: bindActionCreators(dalgonaActions, dispatch),
  })
)(NoticeBoardContainer);
