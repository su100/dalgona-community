import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as freeActions from 'store/modules/free';
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
    getPostReply = async (postid) => {
        const { FreeActions } = this.props;
        try {
            await FreeActions.getPostReply(postid);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    componentDidMount() {
        const postid = this.props.match.params.postid;
        //console.log(this.props.match.params.postid);
        this.getPostInfo(postid);
        this.getPostReply(postid);
    }
    render() {
        console.log('home container');
        return (
            <Fragment>
                <Post
                    type="free"
                    history={history}
                    postid={this.props.match.params.postid}
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
        postInfo: state.free.get('postInfo'),
        postReplyList: state.free.get('postReplyList'),
    }),
    (dispatch) => ({
        FreeActions: bindActionCreators(freeActions, dispatch),
    })
)(FreePostContainer);
