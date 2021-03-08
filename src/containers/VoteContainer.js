import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    componentDidMount() {
        this.getVoteInfo(this.props.match.params.voteid);
    }
    render() {
        const { voteInfo } = this.props;
        return (
            <Fragment>
                <Vote voteInfo={voteInfo} getVoteInfo={this.getVoteInfo} />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        voteInfo: state.issue.get('voteInfo'),
    }),
    (dispatch) => ({
        IssueActions: bindActionCreators(issueActions, dispatch),
    })
)(VoteContainer);
