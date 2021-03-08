import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as dalgonaActions from 'store/modules/dalgona';
import Post from 'components/Post';

class EventPostContainer extends Component {
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
    getPostReply = async (postid) => {
        const { DalgonaActions } = this.props;
        try {
            await DalgonaActions.getPostReply(postid);
        } catch (e) {
            console.log('error log:' + e);
        }
    };
    componentDidMount() {
        const eventid = this.props.match.params.eventid;
        this.getPostInfo(eventid);
        this.getPostReply(eventid);
    }
    render() {
        return (
            <Fragment>
                <Post
                    typd="event"
                    history={history}
                    postid={this.props.match.params.eventid}
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
        postInfo: state.dalgona.get('postInfo'),
        postReplyList: state.dalgona.get('postReplyList'),
    }),
    (dispatch) => ({
        DalgonaActions: bindActionCreators(dalgonaActions, dispatch),
    })
)(EventPostContainer);
