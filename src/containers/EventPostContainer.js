import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as dalgonaActions from 'store/modules/dalgona';
import * as writeActions from 'store/modules/write';
import Post from 'components/Post';

class EventPostContainer extends Component {
    addPostImage = async (formdata, func) => {
        const { WriteActions } = this.props;
        try {
            await WriteActions.addPostImage(formdata);
        } catch (e) {
            console.log('error log:' + e);
        }
        func(this.props.imageURL);
    };
    getPostInfo = async (postId) => {
        const { location, DalgonaActions } = this.props;
        const tmp = location.pathname.split('/');
        console.log(tmp[1]);
        try {
            await DalgonaActions.getPostInfo(tmp[1], postId);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    getPostReply = async (postid, page, ordering) => {
        const { DalgonaActions, match } = this.props;
        try {
            await DalgonaActions.getPostReply(match.params.eventid, page, ordering);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    addPostReply = async (formData) => {
        const { WriteActions } = this.props;
        try {
            await WriteActions.addPostReply(formData);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    addPostRereply = async (formData) => {
        const { WriteActions } = this.props;
        try {
            await WriteActions.addPostRereply(formData);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    updatePostReply = async (formData, updateId) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.updatePostReply(formData, updateId);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.eventid, 1);
    };
    deletePostReply = async (replyUrl) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.deletePostReply(replyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.eventid, 1);
    };
    updatePostRereply = async (formdata, updateId) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.updatePostRereply(formdata, updateId);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.eventid, 1);
    };
    deletePostRereply = async (reReplyUrl) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.deletePostRereply(reReplyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.eventid, 1);
    };
    replyRecommend = async (replyUrl) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.recommendPostReply(replyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.eventid, 1);
    };
    reReplyRecommend = async (reReplyUrl) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.recommendPostRereply(reReplyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.eventid, 1);
    };
    getReply = (postid, page, ordering) => {
        if (ordering === 'created_at') {
            this.getPostReply(postid, page, '');
        } else {
            this.getPostReply(postid, page, ordering);
        }
    };
    recommendPost = async (boardUrl) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.recommendPost(match.params.eventid);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostInfo(match.params.eventid);
    };
    getPostList = async () => {
        const { DalgonaActions } = this.props;
        try {
            await DalgonaActions.getEventList('event', '');
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    componentDidMount() {
        const eventid = this.props.match.params.eventid;
        this.getPostInfo(eventid);
        this.getReply(eventid, 1);
        this.getPostList();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            const eventid = this.props.match.params.eventid;
            this.getPostInfo(eventid);
            this.getReply(eventid, 1);
        }
    }
    render() {
        const {
            history,
            location,
            match,
            isAuthenticated,
            reply_success,
            rereply_success,
            eventCount,
            eventList,
        } = this.props;
        return (
            <Fragment>
                <Post
                    type="event"
                    history={history}
                    location={location}
                    isAuthenticated={isAuthenticated}
                    postid={match.params.eventid}
                    reply_success={reply_success}
                    rereply_success={rereply_success}
                    getReply={this.getReply}
                    addPostReply={this.addPostReply}
                    addPostRereply={this.addPostRereply}
                    getPostInfo={this.getPostInfo}
                    postInfo={this.props.postInfo}
                    postReplyList={this.props.postReplyList}
                    updatePostReply={this.updatePostReply}
                    deletePostReply={this.deletePostReply}
                    updatePostRereply={this.updatePostRereply}
                    deletePostRereply={this.deletePostRereply}
                    recommendPost={this.recommendPost}
                    replyRecommend={this.replyRecommend}
                    reReplyRecommend={this.reReplyRecommend}
                    postReplyCount={this.props.postReplyCount}
                    postCount={eventCount}
                    postList={eventList}
                />
            </Fragment>
        );
    }
}

export default connect(
    (state) => ({
        isAuthenticated: state.auth.get('isAuthenticated'),
        postInfo: state.dalgona.get('postInfo'),
        postReplyList: state.dalgona.get('postReplyList'),
        postReplyCount: state.dalgona.get('postReplyCount'),
        reply_success: state.pender.success['write/ADD_POST_REPLY'],
        rereply_success: state.pender.success['write/ADD_POST_REREPLY'],
        eventCount: state.dalgona.get('eventCount'),
        eventList: state.dalgona.get('eventList'),
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        DalgonaActions: bindActionCreators(dalgonaActions, dispatch),
        WriteActions: bindActionCreators(writeActions, dispatch),
    })
)(EventPostContainer);
