import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';
import * as authActions from 'store/modules/auth';
import * as issueActions from 'store/modules/issue';
import Vote from 'components/Vote';

class VoteContainer extends Component {
    getVoteInfo = async (boardUrl) => {
        const { IssueActions } = this.props;
        try {
            console.log(boardUrl);
            await IssueActions.getVoteInfo(boardUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    getVoteReply = async (boardUrl, params) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.getVoteReply(boardUrl, params);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    postVoteReply = async (formData) => {
        const { IssueActions, match } = this.props;
        try {
            await IssueActions.postVoteReply(formData);
        } catch (e) {
            console.log('error log:' + e);
        }
        if (this.props.rereply_success) {
            this.getVoteReply(match.params.voteid, 1); //댓글 목록 새로고침
        }
    };
    updateVoteReply = async (formdata, replyUrl) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.updateVoteReply(replyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    deleteVoteReply = async (replyUrl) => {
        const { IssueActions, match } = this.props;
        try {
            await IssueActions.deleteVoteReply(replyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getVoteReply(match.params.voteid, 1); //댓글 목록 새로고침
    };
    postVoteRereply = async (formData) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.postVoteRereply(formData);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    updateVoteRereply = async (formdata, replyUrl) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.updateVoteRereply(formdata, replyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    deleteVoteRereply = async (reReplyUrl) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.deleteVoteRereply(reReplyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    replyRecommend = async (replyUrl) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.replyRecommend(replyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    reReplyRecommend = async (reReplyUrl) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.reReplyRecommend(reReplyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    userVote = async (voteitem) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.userVote(voteitem);
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    voteReply = (boardUrl, page) => {
        let params = {};
        params['page'] = page;
        this.getVoteReply(boardUrl, page);
    };

    componentDidMount() {
        const voteid = this.props.match.params.voteid;
        this.getVoteInfo(voteid);
        this.voteReply(voteid, 1);
    }
    render() {
        const {
            history,
            voteInfo,
            info_loading,
            reply_loading,
            info_success,
            post_delete_success,
            voteReplyList,
            reply_list_success,
            voteReplyCount,
            reply_success,
            isAuthenticated,
            isVote,
        } = this.props;
        return (
            <Fragment>
                <Vote
                    history={history}
                    location={location}
                    voteInfo={voteInfo}
                    voteReplyList={voteReplyList}
                    isAuthenticated={isAuthenticated}
                    reply_success={reply_success}
                    voteReplyCount={voteReplyCount}
                    isVote={isVote}
                    voteid={this.props.match.params.voteid}
                    getVoteInfo={this.getVoteInfo}
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
            </Fragment>
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
        info_loading: state.pender.pending['issue/VOTE_INFO'],
        reply_loading: state.pender.pending['issue/GET_VOTE_REPLY'],
        info_success: state.pender.success['issue/VOTE_INFO'],
        reply_list_success: state.pender.success['issue/GET_VOTE_REPLY'],
        reply_success: state.pender.success['issue/POST_VOTE_REPLY'],
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        IssueActions: bindActionCreators(issueActions, dispatch),
    })
)(VoteContainer);
