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
        //console.log(this.props.match.params.postid);
        this.getPostInfo(postid);
        this.getReply(postid, 1);
    }
    render() {
        const { history, location, match, isAuthenticated } = this.props;
        return (
            <Fragment>
                <Post
                    type="free"
                    history={history}
                    location={location}
                    isAuthenticated={isAuthenticated}
                    postid={match.params.postid}
                    getReply={this.getReply}
                    addPostReply={this.addPostReply}
                    addPostRereply={this.addPostRereply}
                    getPostInfo={this.getPostInfo}
                    postInfo={this.props.postInfo}
                    postReplyList={this.props.postReplyList}
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
    }),
    (dispatch) => ({
        FreeActions: bindActionCreators(freeActions, dispatch),
    })
)(FreePostContainer);
