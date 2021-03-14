import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as freeActions from 'store/modules/free';
import * as writeActions from 'store/modules/write';
import Post from 'components/Post';

class FreePostContainer extends Component {
    getPostInfo = async (postId) => {
        const { location, FreeActions } = this.props;
        const tmp = location.pathname.split('/');
        console.log(tmp[2]);
        try {
            await FreeActions.getPostInfo(tmp[2], postId);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    getPostReply = async (postid, params) => {
        const { FreeActions } = this.props;
        try {
            await FreeActions.getPostReply(postid, params);
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
    updatePostReply = async (formData, updateId) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.updatePostReply(formData, updateId);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.postid, 1);
    };
    addPostRereply = async (formData) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.addPostRereply(formData);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.postid, 1);
    };
    deletePostReply = async (replyUrl) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.deletePostReply(replyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.postid, 1);
    };
    updatePostRereply = async (formdata, updateId) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.updatePostRereply(formdata, updateId);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.postid, 1);
    };
    deletePostRereply = async (reReplyUrl) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.deletePostRereply(reReplyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.postid, 1);
    };
    replyRecommend = async (replyUrl) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.recommendPostReply(replyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.postid, 1);
    };
    reReplyRecommend = async (reReplyUrl) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.recommendPostRereply(reReplyUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.postid, 1);
    };
    getReply = (boardUrl, page) => {
        this.getPostReply(boardUrl, page);
    };
    componentDidMount() {
        const postid = this.props.match.params.postid;
        //console.log(this.props.match.params.postid);
        this.getPostInfo(postid);
        this.getReply(postid, 1);
    }
    render() {
        const { history, location, match, isAuthenticated, reply_success, rereply_success } = this.props;
        return (
            <Fragment>
                <Post
                    type="free"
                    history={history}
                    location={location}
                    isAuthenticated={isAuthenticated}
                    reply_success={reply_success}
                    rereply_success={rereply_success}
                    postid={match.params.postid}
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
                    replyRecommend={this.replyRecommend}
                    reReplyRecommend={this.reReplyRecommend}
                    postReplyCount={this.props.postReplyCount}
                />
            </Fragment>
        );
    }
}
export default connect(
    (state) => ({
        isAuthenticated: state.auth.get('isAuthenticated'),
        postInfo: state.free.get('postInfo'),
        postReplyList: state.free.get('postReplyList'),
        postReplyCount: state.free.get('postReplyCount'),
        reply_success: state.pender.success['write/ADD_POST_REPLY'],
        rereply_success: state.pender.success['write/ADD_POST_REREPLY'],
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        FreeActions: bindActionCreators(freeActions, dispatch),
        WriteActions: bindActionCreators(writeActions, dispatch),
    })
)(FreePostContainer);
