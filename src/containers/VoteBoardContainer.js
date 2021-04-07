import React, { Component } from 'react';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as issueActions from 'store/modules/issue';
import VoteBoard from 'components/VoteBoard';

class VoteBoardContainer extends Component {
  componentDidMount() {
    this.getHotVoteList(); //  실시간 인기 투표 가져오기
    this.getVoteList(); //  투표 목록 가져오기
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
      //  투표 목록 가져오기
      this.getVote();
    }
  }

  getHotVoteList = async () => {
    const { IssueActions } = this.props;
    try {
      await IssueActions.getHotVoteList();
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  getVoteList = async (params) => {
    const { IssueActions } = this.props;
    try {
      await IssueActions.getVoteList(params);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  getVote() {
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
    this.getVoteList(params);
  }

  render() {
    const { history, location, hotVoteList, voteCount, voteList } = this.props;
    return (
      <>
        <VoteBoard
          history={history}
          location={location}
          hotVoteList={hotVoteList}
          voteCount={voteCount}
          voteList={voteList}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({
    hotVoteList: state.issue.get('hotVoteList'),
    voteCount: state.issue.get('voteCount'),
    voteList: state.issue.get('voteList'),
  }),
  (dispatch) => ({
    IssueActions: bindActionCreators(issueActions, dispatch),
  })
)(VoteBoardContainer);
