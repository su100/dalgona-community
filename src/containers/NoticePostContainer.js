import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as dalgonaActions from 'store/modules/dalgona';
import * as writeActions from 'store/modules/write';
import Post from 'components/Post';

class NoticePostContainer extends Component {
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
        try {
            await DalgonaActions.getPostInfo(tmp[1], postId);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    getPostReply = async (postid, page, ordering) => {
        const { DalgonaActions, match } = this.props;
        try {
            await DalgonaActions.getPostReply(match.params.noticeid, page, ordering);
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
        this.getPostReply(match.params.noticeid, 1);
    };
    deletePostReply = async (replyUrl) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.deletePostReply(replyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.noticeid, 1);
    };
    updatePostRereply = async (formdata, updateId) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.updatePostRereply(formdata, updateId);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.noticeid, 1);
    };
    deletePostRereply = async (reReplyUrl) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.deletePostRereply(reReplyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.noticeid, 1);
    };
    replyRecommend = async (replyUrl) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.recommendPostReply(replyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.noticeid, 1);
    };
    reReplyRecommend = async (reReplyUrl) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.recommendPostRereply(reReplyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.noticeid, 1);
    };
    recommendPost = async (boardUrl) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.recommendPost(match.params.noticeid);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostInfo(match.params.noticeid);
    };
    getReply = (boardUrl, page, ordering) => {
        this.getPostReply(boardUrl, page, ordering);
    };
    getPostList = async () => {
        const { DalgonaActions } = this.props;
        try {
            await DalgonaActions.getNoticeList('notice', '');
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    componentDidMount() {
        const noticeid = this.props.match.params.noticeid;
        this.getPostInfo(noticeid);
        this.getReply(noticeid, 1);
        this.getPostList();
    }
    componentDidUpdate() {
        const noticeid = this.props.match.params.noticeid;
        this.getPostInfo(noticeid);
        this.getReply(noticeid, 1);
    }
    render() {
        const {
            history,
            location,
            match,
            isAuthenticated,
            reply_success,
            rereply_success,
            noticeList,
            noticeCount,
        } = this.props;
        return (
            <Fragment>
                <Post
                    type="notice"
                    history={history}
                    location={location}
                    isAuthenticated={isAuthenticated}
                    reply_success={reply_success}
                    rereply_success={rereply_success}
                    postid={match.params.postid}
                    getReply={this.getReply}
                    getPostInfo={this.getPostInfo}
                    addPostReply={this.addPostReply}
                    addPostRereply={this.addPostRereply}
                    addPostImage={this.addPostImage}
                    postInfo={this.props.postInfo}
                    postReplyList={this.props.postReplyList}
                    updatePostReply={this.updatePostReply}
                    deletePostReply={this.deletePostReply}
                    updatePostRereply={this.updatePostRereply}
                    deletePostRereply={this.deletePostRereply}
                    replyRecommend={this.replyRecommend}
                    reReplyRecommend={this.reReplyRecommend}
                    recommendPost={this.recommendPost}
                    postReplyCount={this.props.postReplyCount}
                    postList={noticeList}
                    postCount={noticeCount}
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
        noticeCount: state.dalgona.get('noticeCount'),
        noticeList: state.dalgona.get('noticeList'),
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        DalgonaActions: bindActionCreators(dalgonaActions, dispatch),
        WriteActions: bindActionCreators(writeActions, dispatch),
    })
)(NoticePostContainer);
