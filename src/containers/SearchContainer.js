import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as searchActions from 'store/modules/search';
import Search from 'components/Search';

class SearchContainer extends Component {
  componentDidMount() {
    this.getSearch(); //  검색한 글 목록 가져오기
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { location } = this.props;
    if (prevProps.location !== location) {
      return true;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot) {
      this.getSearch();
    }
  }

  getSearchList = async (searchWord, searchDivision, page) => {
    const { SearchActions } = this.props;
    try {
      await SearchActions.getSearchList(searchWord, searchDivision, page);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  getSearch() {
    //  주소바뀔 때 글 목록 가져오기
    const { location } = this.props;
    const query = queryString.parse(location.search);
    this.getSearchList(query.searchWord, query.searchDivision, query.page ? query.page : 1);
  }

  render() {
    const { history, location, searchCount, searchList } = this.props;
    return (
      <>
        <Search
          key={location.search}
          history={history}
          location={location}
          searchCount={searchCount}
          searchList={searchList}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({
    searchCount: state.search.get('searchCount'),
    searchList: state.search.get('searchList'),
  }),
  (dispatch) => ({
    SearchActions: bindActionCreators(searchActions, dispatch),
  })
)(SearchContainer);
