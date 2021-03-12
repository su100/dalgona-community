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

    render() {
        const { postReplyList, history, isAuthenticated, getReply, addPostReply, postReplyCount } = this.props;
        console.log(postReplyList);
        return (
            <div className="post">
                <View
                    type={this.props.type}
                    history={history}
                    location={location}
                    postid={this.props.postid}
                    getPostInfo={this.props.getPostInfo}
                    postInfo={this.props.postInfo}
                />
                <CommentList
                    history={history}
                    vote={false}
                    getReply={getReply}
                    commentList={postReplyList}
                    postReplyCount={postReplyCount}
                    isAuthenticated={isAuthenticated}
                    postid={this.props.postid}
                    addPostReply={this.props.addPostReply}
                    addPostRereply={this.props.addPostRereply}
                    isRecommend
                />
            </div>
        );
    }
}

export default Post;
