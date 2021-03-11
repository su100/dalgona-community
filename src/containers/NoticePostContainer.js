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
        console.log(tmp[1]);
        try {
            await DalgonaActions.getPostInfo(tmp[1], postId);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    getPostReply = async (postid, params) => {
        const { DalgonaActions } = this.props;
        try {
            await DalgonaActions.getPostReply(postid, params);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    getReply = (boardUrl, page) => {
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
    componentDidMount() {
        const noticeid = this.props.match.params.noticeid;
        this.getPostInfo(noticeid);
        this.getReply(noticeid, 1);
    }
    render() {
        const { history, location, match, isAuthenticated } = this.props;
        return (
            <Fragment>
                <Post
                    type="notice"
                    history={history}
                    location={location}
                    isAuthenticated={isAuthenticated}
                    postid={match.params.postid}
                    getReply={this.getReply}
                    getPostInfo={this.getPostInfo}
                    addPostReply={this.addPostReply}
                    addPostImage={this.addPostImage}
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
        postInfo: state.dalgona.get('postInfo'),
        postReplyList: state.dalgona.get('postReplyList'),
        postReplyCount: state.dalgona.get('postReplyCount'),
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        DalgonaActions: bindActionCreators(dalgonaActions, dispatch),
        WriteActions: bindActionCreators(writeActions, dispatch),
    })
)(NoticePostContainer);
