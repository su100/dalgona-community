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
            await IssueActions.getVoteInfo(boardUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    getVoteReply = async (boardUrl) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.getVoteReply(boardUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    postVoteReply = async (formData) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.postVoteReply(formData);
        } catch (e) {
            console.log('error log:' + e);
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
        const { IssueActions } = this.props;
        try {
            await IssueActions.deleteVoteReply(replyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    postVoteRereply = async (voteboardreply_id, content, voterereply_image, anonymous) => {
        const { IssueActions } = this.props;
        try {
            await IssueActions.postVoteRereply(voteboardreply_id, content, voterereply_image, anonymous);
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

    componentDidMount() {
        const voteid = this.props.match.params.voteid;
        this.getVoteInfo(voteid);
        this.getVoteReply(voteid);
    }
    render() {
        const { voteInfo, voteReplyList } = this.props;
        return (
            <Fragment>
                <Vote
                    voteInfo={voteInfo}
                    voteReplyList={voteReplyList}
                    voteid={this.props.match.params.voteid}
                    getVoteInfo={this.getVoteInfo}
                    getVoteReply={this.getVoteReply}
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
        voteInfo: state.issue.get('voteInfo'),
        voteReplyList: state.issue.get('voteReplyList'),
    }),
    (dispatch) => ({
        IssueActions: bindActionCreators(issueActions, dispatch),
    })
)(VoteContainer);
