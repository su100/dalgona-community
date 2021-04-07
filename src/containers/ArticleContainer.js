import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as issueActions from 'store/modules/issue';
import Article from 'components/Article';

class ArticleContainer extends Component {
  componentDidMount() {
    this.getNews();
    this.getNewsKeyword();
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
      //  뉴스 목록 가져오기
      this.getNews();
    }
  }

  getNewsList = async (params) => {
    const { IssueActions } = this.props;
    try {
      await IssueActions.getNewsList(params);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  getNewsKeyword = async () => {
    const { IssueActions } = this.props;
    try {
      await IssueActions.getNewsKeyword();
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  getNews() {
    //  주소바뀔 때 뉴스 목록 가져오기
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
    this.getNewsList(params);
  }

  render() {
    const { history, location, newsCount, newsList, newsKeyword } = this.props;
    return (
      <>
        <Article
          history={history}
          location={location}
          newsCount={newsCount}
          newsList={newsList}
          newsKeyword={newsKeyword}
          getNewsList={this.getNewsList}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({
    newsCount: state.issue.get('newsCount'),
    newsList: state.issue.get('newsList'),
    newsKeyword: state.issue.get('newsKeyword'),
  }),
  (dispatch) => ({
    IssueActions: bindActionCreators(issueActions, dispatch),
  })
)(ArticleContainer);
