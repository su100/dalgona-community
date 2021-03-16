import React, { Component } from 'react';
import CommentList from 'components/common/comment/CommentList';
import View from 'components/common/View';
import './Post.scss';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: [],
        };
    }
    deleteReply = (e) => {
        const postReplyId = e.currentTarget.id;
        this.props.deletePostReply(postReplyId);
    };
    replyRecommend = (e) => {
        const postReplyId = e.currentTarget.id;
        console.log(postReplyId);
        this.props.replyRecommend(postReplyId);
    };
    deleteRereply = (e) => {
        const postRereplyId = e.currentTarget.id;
        console.log(postRereplyId);
        this.props.deletePostRereply(postRereplyId);
    };
    reReplyRecommend = (e) => {
        const postRereplyId = e.currentTarget.id;
        this.props.reReplyRecommend(postRereplyId);
    };

    editPost = () => {
        const { setPost, location, history, postInfo } = this.props;
        const tmp = location.pathname.split('/');
        setPost(postInfo);
        history.push(`/${tmp[1]}/write/${tmp[2]}`);
    };
    deletePost = () => {
        if (window.confirm('게시글을 삭제하시겠습니까?')) {
            this.props.deletePost();
        }
    };
    render() {
        const {
            postReplyList,
            history,
            isAuthenticated,
            getReply,
            postReplyCount,
            reply_success,
            rereply_success,
            postInfo,
        } = this.props;
        console.log(postReplyList);
        return (
            <div className="post">
                <View
                    type={this.props.type}
                    history={history}
                    location={location}
                    postid={this.props.postid}
                    getPostInfo={this.props.getPostInfo}
                    postInfo={postInfo}
                    editPost={this.editPost}
                    deletePost={this.deletePost}
                />
                <CommentList
                    history={history}
                    vote={false}
                    getReply={getReply}
                    commentList={postReplyList}
                    postReplyCount={postReplyCount}
                    isAuthenticated={isAuthenticated}
                    reply_success={reply_success}
                    rereply_success={rereply_success}
                    recommend_count={postInfo.recommend_count}
                    deleteReply={this.deleteReply}
                    deleteRereply={this.deleteRereply}
                    replyRecommend={this.replyRecommend}
                    reReplyRecommend={this.reReplyRecommend}
                    postid={this.props.postid}
                    addReply={this.props.addPostReply}
                    addRereply={this.props.addPostRereply}
                    updateReply={this.props.updatePostReply}
                    updateRereply={this.props.updatePostRereply}
                    isRecommend
                />
            </div>
        );
    }
}

export default Post;
