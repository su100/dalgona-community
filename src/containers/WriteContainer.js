import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from 'store/modules/auth';
import * as writeActions from 'store/modules/write';
import Write from 'components/Write';

class WriteContainer extends Component {
    getBoardInfo = async () => {
        const { location, WriteActions } = this.props;
        const tmp = location.pathname.split('/');
        try {
            await WriteActions.getBoardInfo(tmp[3]);
        } catch (e) {
            console.log('error log:' + e);
        }
    };

    addPostImage = async (formdata, func) => {
        const { WriteActions } = this.props;
        try {
            await WriteActions.addPostImage(formdata);
        } catch (e) {
            console.log('error log:' + e);
        }
        func(this.props.imageURL);
    };

    addPost = async (title, body, boardUrl, anonymous) => {
        const { WriteActions, history, match } = this.props;
        try {
            await WriteActions.addPost(title, body, boardUrl, anonymous);
        } catch (e) {
            console.log('error log:' + e);
        }
        if (this.props.post_success) {
            const tmp = this.props.location.pathname.split('/');
            history.push(`/${tmp[1]}/${boardUrl}`);
        }
    };

    updatePost = async (boardUrl, postId, title, body, anonymous) => {
        const { WriteActions, history } = this.props;
        try {
            await WriteActions.updatePost(boardUrl, postId, title, body, anonymous);
        } catch (e) {
            console.log('error log:' + e);
        }
        if (this.props.update_success) {
            const tmp = this.props.location.pathname.split('/');
            history.push(`/${tmp[1]}/${boardUrl}`);
        }
    };

    componentDidMount() {
        if (!this.props.isAuthenticated) {
            alert('로그인이 필요합니다.');
            this.props.history.push('/login');
        } else {
            this.getBoardInfo(); //게시판 정보 가져오기
        }
    }

    render() {
        const {
            history,
            match,
            location,
            boardInfo,
            editPost,
            isAuthenticated,
            post_success,
            WriteActions,
        } = this.props;
        return (
            <Fragment>
                <Write
                    history={history}
                    match={match}
                    location={location}
                    boardInfo={boardInfo}
                    editPost={editPost}
                    setPost={WriteActions.setPost}
                    isAuthenticated={isAuthenticated}
                    post_success={post_success}
                    addPostImage={this.addPostImage}
                    updatePost={this.updatePost}
                    addPost={this.addPost}
                />
            </Fragment>
        );
    }
}
export default connect(
    (state) => ({
        isAuthenticated: state.auth.get('isAuthenticated'),
        boardInfo: state.write.get('boardInfo'),
        editPost: state.write.get('editPost'),
        imageURL: state.write.get('imageURL'),
        loading: state.pender.pending['write/ADD_POST_IMAGE'],
        post_loading: state.pender.pending['write/ADD_POST'],
        img_success: state.pender.success['write/ADD_POST_IMAGE'],
        update_success: state.pender.success['write/UPDATE_POST'],
        post_success: state.pender.success['write/ADD_POST'],
    }),
    (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        WriteActions: bindActionCreators(writeActions, dispatch),
    })
)(WriteContainer);
