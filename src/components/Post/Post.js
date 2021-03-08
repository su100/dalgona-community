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
        const { postReplyList } = this.props;
        console.log(postReplyList);
        return (
            <div className="post">
                <View
                    type={this.props.type}
                    history={history}
                    postid={this.props.postid}
                    getPostInfo={this.props.getPostInfo}
                    postInfo={this.props.postInfo}
                />
                <CommentList vote={false} commentList={postReplyList} postid={this.props.postid} isRecommend />
            </div>
        );
    }
}

export default Post;
