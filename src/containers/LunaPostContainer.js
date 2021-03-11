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
        console.log(tmp[2]);
        try {
            await LunaActions.getPostInfo(tmp[2], postId);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    getPostReply = async (postid, params) => {
        const { LunaActions } = this.props;
        try {
            await LunaActions.getPostReply(postid, params);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    getReply = (boardUrl, page) => {
        let params = {};
        params['page'] = page;
        console.log(params);
        this.getPostReply(boardUrl, page);
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
    componentDidMount() {
        const postid = this.props.match.params.postid;
        this.getPostInfo(postid);
        this.getReply(postid, 1);
    }

    render() {
        const { history, location, match, isAuthenticated } = this.props;
        return (
            <Fragment>
                <Post
                    type="luna"
                    history={history}
                    location={location}
                    isAuthenticated={isAuthenticated}
                    postid={match.params.postid}
                    getReply={this.getReply}
                    addPostReply={this.addPostReply}
                    addPostRereply={this.addPostRereply}
                    addPostImage={this.addPostImage}
                    getPostInfo={this.getPostInfo}
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
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        LunaActions: bindActionCreators(lunaActions, dispatch),
        WriteActions: bindActionCreators(writeActions, dispatch),
    })
)(LunaPostContainer);
