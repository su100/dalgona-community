import React, { Component } from 'react';
import CommentInput from 'components/common/comment/CommentInput';

import userDefault from 'images/user-default.png';
import heartFilled from 'images/heart_filled.png';
import heart from 'images/heart.png';

import './CommentList.scss';

class CommentList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommentId: '',
            reAnonymous: false,
            reText: '',
            isAnonymous: false,
            commentText: '',
            commentImg: null,
            reImg: null,
            previewURL: '',
            rePreview: '',
        };
    }
    handleComment = (e) => {
        if (e.target.id === 'comment') this.setState({ commentText: e.target.value });
        else this.setState({ reText: e.target.value });
    };

    handleAnonymous = (e) => {
        if (e.target.id === 'comment') this.setState({ isAnonymous: e.target.checked });
        else this.setState({ reAnonymous: e.target.checked });
    };

    setImage = (type, file) => {
        if (type === 'comment') this.setState({ commentImg: file });
        else this.setState({ reImg: file });
    };
    setPreview = (type, url) => {
        if (type === 'comment') this.setState({ previewURL: url });
        else this.setState({ rePreview: url });
    };

    deleteImg = (e) => {
        if (e.target.id === 'comment') this.setState({ commentImg: null, previewURL: '' });
        else this.setState({ reImg: null, rePreview: '' });
    };

    openRecomment = (e) => {
        //답글 새로 열 때마다 상태 초기화: 익명, 내용, 사진
        this.setState({ recommentId: e.currentTarget.id, reAnonymous: false, reText: '', reImg: null, rePreview: '' });
    };

    closeRecomment = (e) => {
        this.setState({ recommentId: '', reAnonymous: false, reText: '', reImg: null, rePreview: '' });
    };
    postVoteReply = (e) => {
        const voteid = this.props.voteid;
        const { commentText, commentImg, isAnonymous, reAnonymous, reText, reImg } = this.state;
        /*const formData = new FormData();
        formData.append('voteboard_id', voteid);
        formData.append('content', commentText);
        formData.append('votereply_image', commentImg);
        formData.append('anonymous', isAnonymous);
        */
        if (e.target.id === 'comment') {
            let voteboard_id = voteid;
            let content = commentText;
            let votereply_image = commentImg;
            let anonymous = isAnonymous;
            this.props.postVoteReply(voteboard_id, content, votereply_image, anonymous);
        } else {
            let voteboardreply_id = voteid;
            let content = commentText;
            let voterereply_image = commentImg;
            let anonymous = isAnonymous;
            console.log(voteboardreply_id, content, voterereply_image, anonymous);
            console.log(e.target.id);
            // this.props.postVoteRereply(voteboardreply_id, content, voterereply_image, anonymous);
        }
    };

    render() {
        const { vote, commentList } = this.props;
        return (
            <div className="comment-list">
                <div className="only-pc">
                    <div className="comment-list__count">
                        <div className="comment-list__count-recommend">
                            <span className="border">추천</span>
                            <span>123</span>
                        </div>
                        <div className="comment-list__count-reply">
                            <span className="border">댓글</span>
                            <span>{commentList.length}</span>
                        </div>
                    </div>
                </div>
                {!vote && (
                    <div className="not-pc">
                        <div className="comment-list__count">
                            <img src={heart}></img>
                            <span>추천 6</span>
                        </div>
                    </div>
                )}
                <CommentInput
                    type="comment"
                    handleAnonymous={this.handleAnonymous}
                    isAnonymous={this.state.isAnonymous}
                    handleComment={this.handleComment}
                    commentText={this.state.commentText}
                    setImage={this.setImage}
                    setPreview={this.setPreview}
                    commentImg={this.state.commentImg}
                    previewURL={this.state.previewURL}
                    deleteImg={this.deleteImg}
                    postVoteReply={this.postVoteReply}
                />
                <div className="not-pc">
                    <div className="comment-list__reply">
                        <span>댓글 {this.props.commentList.length}개</span>
                    </div>
                </div>
                {this.props.commentList.map((comment) => {
                    return (
                        <div key={comment.id}>
                            <div className="comment-list__item">
                                <div className="comment-list__item--left">
                                    <div className="not-pc">
                                        <img
                                            className="comment-list__item--user-default"
                                            src={comment.userImg ?? userDefault}
                                            alt="userImg"
                                        />
                                    </div>
                                    <div className="comment-list__item--main">
                                        <div className="comment-list__item--detail">
                                            <span className="comment-list__item--username">
                                                {!comment.anonymous ? comment.author.nickname : '익명'}
                                            </span>
                                            <span>{comment.created_at}</span>
                                            <span>{`추천 ${comment.recommend_count}`}</span>
                                        </div>
                                        {!comment.anonymous && comment.author.profile_image && (
                                            <div>
                                                <img src={comment.author.profile_image} alt="comment" />
                                            </div>
                                        )}
                                        <div className="comment-list__item--contents">{comment.content}</div>
                                        <div className="comment-list__item--button">
                                            <button
                                                id={comment.id}
                                                onClick={
                                                    Number(this.state.recommentId) === comment.id
                                                        ? this.closeRecomment
                                                        : this.openRecomment
                                                }
                                            >
                                                답글
                                            </button>
                                            {comment.is_author ? (
                                                <>
                                                    <button>수정</button>
                                                    <button>삭제</button>
                                                </>
                                            ) : (
                                                <button>신고</button>
                                            )}
                                            {this.props.isRecommend && (
                                                <span className="only-pc">
                                                    <button onClick={this.props.replyRecommend}>추천</button>
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {this.props.recommended && (
                                    <div className="not-pc">
                                        <button>
                                            <img
                                                className="comment-list__item__button--heart"
                                                src={comment.recommended ? heartFilled : heart}
                                                alt="heart"
                                            />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {comment.voteboardrereply &&
                                comment.voteboardrereply.map((reComment) => {
                                    return (
                                        <div
                                            key={reComment.id}
                                            className="comment-list__item comment-list__item--recomment"
                                        >
                                            <div className="comment-list__item--left">
                                                <div className="comment-list__item--recomment-mark" />
                                                <div className="not-pc">
                                                    <img
                                                        className="comment-list__item--user-default"
                                                        src={userDefault}
                                                        alt="userImg"
                                                    />
                                                </div>

                                                <div className="comment-list__item--main">
                                                    <div className="comment-list__item--detail">
                                                        <span className="comment-list__item--username">
                                                            {reComment.anonymous ? '익명' : reComment.author.nickname}
                                                        </span>
                                                        <span>{reComment.created_at}</span>
                                                        <span>
                                                            {this.props.isRecommend &&
                                                                `추천 ${reComment.recommend_count}`}
                                                        </span>
                                                    </div>
                                                    {reComment.image && (
                                                        <div>
                                                            <img
                                                                src={
                                                                    !reComment.anonymous &&
                                                                    reComment.author.profile_image !== null &&
                                                                    reComment.author.profile_image
                                                                }
                                                                alt="comment"
                                                            />
                                                        </div>
                                                    )}
                                                    <div className="comment-list__item--contents">
                                                        {reComment.content}
                                                    </div>
                                                    <div className="comment-list__item--button">
                                                        {reComment.is_author ? (
                                                            <>
                                                                <button>수정</button>
                                                                <button>삭제</button>
                                                            </>
                                                        ) : (
                                                            <button>신고</button>
                                                        )}
                                                        {this.props.isRecommend && (
                                                            <span className="only-pc">
                                                                <button>추천</button>
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {this.props.isRecommend && (
                                                <div className="not-pc">
                                                    <button>
                                                        <img
                                                            className="comment-list__item__button--heart"
                                                            src={reComment.isRecommended ? heartFilled : heart}
                                                            alt="heart"
                                                        />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            {Number(this.state.recommentId) === comment.id && (
                                <div className="comment-list__item comment-list__item--recomment">
                                    <div className="comment-list__item--left">
                                        <div className="comment-list__item--recomment-mark" />
                                        <div className="comment-list__item--main">
                                            <CommentInput
                                                type="recomment"
                                                handleAnonymous={this.handleAnonymous}
                                                isAnonymous={this.state.reAnonymous}
                                                handleComment={this.handleComment}
                                                commentText={this.state.reText}
                                                setImage={this.setImage}
                                                setPreview={this.setPreview}
                                                commentImg={this.state.reImg}
                                                previewURL={this.state.rePreview}
                                                deleteImg={this.deleteImg}
                                                postVoteReply={this.postVoteReply}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}

                <CommentInput
                    type="comment"
                    handleAnonymous={this.handleAnonymous}
                    isAnonymous={this.state.isAnonymous}
                    handleComment={this.handleComment}
                    commentText={this.state.commentText}
                    setImage={this.setImage}
                    setPreview={this.setPreview}
                    commentImg={this.state.commentImg}
                    previewURL={this.state.previewURL}
                    deleteImg={this.deleteImg}
                    postVoteReply={this.postVoteReply}
                />
            </div>
        );
    }
}

export default CommentList;
