import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as lunaActions from 'store/modules/luna';
import * as writeActions from 'store/modules/write';
import Post from 'components/Post';

class LunaPostContainer extends Component {
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
        const { location, LunaActions } = this.props;
        const tmp = location.pathname.split('/');
        try {
            await LunaActions.getPostInfo(tmp[2], postId);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    getPostReply = async (postid, page, ordering) => {
        const { LunaActions } = this.props;
        try {
            await LunaActions.getPostReply(postid, page, ordering);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    addPostReply = async (formData) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.addPostReply(formData);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.postid, 1);
    };
    ///
    updatePostReply = async (formData, updateId) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.updatePostReply(formData, updateId);
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
    ///
    addPostRereply = async (formData) => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.addPostRereply(formData);
        } catch (e) {
            console.log('error log:' + e);
        }
        this.getPostReply(match.params.postid, 1);
    };
    ///
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
    recommendPost = async (boardUrl) => {
        const { LunaActions, match } = this.props;
        try {
            await LunaActions.recommendPost(boardUrl);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    deletePost = async () => {
        const { WriteActions, match } = this.props;
        try {
            await WriteActions.deletePost(match.params.board_url, match.params.postid); //boardUrl, postId
        } catch (e) {
            console.log('error log:' + e);
        }
        if (this.props.delete_success) {
            const tmp = location.pathname.split('/');
            this.props.history.replace(`/${tmp[1]}/${tmp[2]}`);
        }
    };
    ///
    getReply = (boardUrl, page, ordering) => {
        this.getPostReply(boardUrl, page, ordering);
    };
    componentDidMount() {
        const postid = this.props.match.params.postid;
        this.getPostInfo(postid);
        this.getReply(postid, 1);
    }

    render() {
        const { history, location, match, isAuthenticated, reply_success, rereply_success, WriteActions } = this.props;
        return (
            <Fragment>
                <Post
                    type="luna"
                    history={history}
                    location={location}
                    isAuthenticated={isAuthenticated}
                    postid={match.params.postid}
                    reply_success={reply_success}
                    rereply_success={rereply_success}
                    getReply={this.getReply}
                    setPost={WriteActions.setPost}
                    deletePost={this.deletePost}
                    addPostReply={this.addPostReply}
                    addPostRereply={this.addPostRereply}
                    addPostImage={this.addPostImage}
                    getPostInfo={this.getPostInfo}
                    updatePostReply={this.updatePostReply}
                    deletePostReply={this.deletePostReply}
                    updatePostRereply={this.updatePostRereply}
                    deletePostRereply={this.deletePostRereply}
                    replyRecommend={this.replyRecommend}
                    reReplyRecommend={this.reReplyRecommend}
                    postInfo={this.props.postInfo}
                    postReplyList={this.props.postReplyList}
                    postReplyCount={this.props.postReplyCount}
                />
            </Fragment>
        );
    }
}
export default connect(
    (state) => ({
        isAuthenticated: state.auth.get('isAuthenticated'),
        imageURL: state.luna.get('imageURL'),
        postInfo: state.luna.get('postInfo'),
        postReplyList: state.luna.get('postReplyList'),
        postReplyCount: state.luna.get('postReplyCount'),
        reply_success: state.pender.success['write/ADD_POST_REPLY'],
        rereply_success: state.pender.success['write/ADD_POST_REREPLY'],
        delete_success: state.pender.success['write/DELETE_POST'],
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        LunaActions: bindActionCreators(lunaActions, dispatch),
        WriteActions: bindActionCreators(writeActions, dispatch),
    })
)(LunaPostContainer);
