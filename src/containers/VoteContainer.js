import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as issueActions from 'store/modules/issue';
import Vote from 'components/Vote';
import { NotFoundPage } from 'pages';

class VoteContainer extends Component {
  componentDidMount() {
    const { match } = this.props;
    const { voteid } = match.params;
    this.getVoteInfo(voteid);
    this.voteReply(voteid, 1);
  }

  getVoteInfo = async (boardUrl) => {
    const { IssueActions } = this.props;
    try {
      await IssueActions.getVoteInfo(boardUrl);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  getVoteReply = async (boardUrl, page, ordering) => {
    const { IssueActions } = this.props;
    try {
      await IssueActions.getVoteReply(boardUrl, page, ordering);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  postVoteReply = async (formData) => {
    const { IssueActions, match } = this.props;
    try {
      await IssueActions.postVoteReply(formData);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getVoteReply(match.params.voteid, 1); //  댓글 목록 새로고침
  };

  updateVoteReply = async (formData, updateId) => {
    const { IssueActions, match } = this.props;
    try {
      await IssueActions.updateVoteReply(formData, updateId);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getVoteReply(match.params.voteid, 1); //  댓글 목록 새로고침
  };

  deleteVoteReply = async (replyUrl) => {
    const { IssueActions, match } = this.props;
    try {
      await IssueActions.deleteVoteReply(replyUrl);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getVoteReply(match.params.voteid, 1); //  댓글 목록 새로고침
  };

  postVoteRereply = async (formData) => {
    const { IssueActions, match } = this.props;
    try {
      await IssueActions.postVoteRereply(formData);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getVoteReply(match.params.voteid, 1); //  댓글 목록 새로고침
  };

  updateVoteRereply = async (formdata, updateId) => {
    const { IssueActions, match } = this.props;
    try {
      await IssueActions.updateVoteRereply(formdata, updateId);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getVoteReply(match.params.voteid, 1); //  댓글 목록 새로고침
  };

  deleteVoteRereply = async (reReplyUrl) => {
    const { IssueActions, match } = this.props;
    try {
      await IssueActions.deleteVoteRereply(reReplyUrl);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getVoteReply(match.params.voteid, 1); //  댓글 목록 새로고침
  };

  replyRecommend = async (replyUrl) => {
    const { IssueActions, match } = this.props;
    try {
      await IssueActions.replyRecommend(replyUrl);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getVoteReply(match.params.voteid, 1); //  댓글 목록 새로고침
  };

  reReplyRecommend = async (reReplyUrl) => {
    const { IssueActions, match } = this.props;
    try {
      await IssueActions.reReplyRecommend(reReplyUrl);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
    this.getVoteReply(match.params.voteid, 1); //  댓글 목록 새로고침
  };

  userVote = async (voteitem) => {
    const { IssueActions } = this.props;
    try {
      await IssueActions.userVote(voteitem);
    } catch (e) {
      console.log(`error log: ${e}`);
    }
  };

  voteReply = (boardUrl, page, ordering) => {
    this.getVoteReply(boardUrl, page, ordering);
  };

  render() {
    const {
      history,
      voteInfo,
      voteReplyList,
      voteReplyCount,
      reply_success,
      rereply_success,
      isAuthenticated,
      isVote,
      location,
      match,
      voteInfoFailure,
      finishVote,
    } = this.props;
    if (voteInfoFailure)
      return (
        <>
          <NotFoundPage />
        </>
      );
    return (
      <>
        <Vote
          history={history}
          location={location}
          voteInfo={voteInfo}
          voteReplyList={voteReplyList}
          reply_success={reply_success}
          rereply_success={rereply_success}
          voteReplyCount={voteReplyCount}
          isAuthenticated={isAuthenticated}
          isVote={isVote}
          voteid={match.params.voteid}
          getVoteInfo={this.getVoteInfo}
          finishVote={finishVote}
          voteReply={this.voteReply}
          userVote={this.userVote}
          postVoteReply={this.postVoteReply}
          updateVoteReply={this.updateVoteReply}
          deleteVoteReply={this.deleteVoteReply}
          postVoteRereply={this.postVoteRereply}
          updateVoteRereply={this.updateVoteRereply}
          deleteVoteRereply={this.deleteVoteRereply}
          replyRecommend={this.replyRecommend}
          reReplyRecommend={this.reReplyRecommend}
        />
      </>
    );
  }
}

export default connect(
  (state) => ({
    isAuthenticated: state.auth.get('isAuthenticated'),
    voteInfo: state.issue.get('voteInfo'),
    voteReplyList: state.issue.get('voteReplyList'),
    voteReplyCount: state.issue.get('voteReplyCount'),
    isVote: state.issue.get('isVote'),
    finishVote: state.issue.get('finishVote'),
    info_loading: state.pender.pending['issue/VOTE_INFO'],
    reply_loading: state.pender.pending['issue/GET_VOTE_REPLY'],
    info_success: state.pender.success['issue/VOTE_INFO'],
    reply_list_success: state.pender.success['issue/GET_VOTE_REPLY'],
    reply_success: state.pender.success['issue/POST_VOTE_REPLY'],
    rereply_success: state.pender.success['issue/POST_VOTE_REREPLY'],
    voteInfoFailure: state.pender.failure['issue/VOTE_INFO'],
  }),
  (dispatch) => ({
    AuthActions: bindActionCreators(authActions, dispatch),
    IssueActions: bindActionCreators(issueActions, dispatch),
  })
)(VoteContainer);
