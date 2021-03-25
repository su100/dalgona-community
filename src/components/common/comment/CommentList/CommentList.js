import React, { Component } from 'react';
import queryString from 'query-string';
import CommentInput from 'components/common/comment/CommentInput';
import Pagination from 'components/common/Pagination';
import userDefault from 'images/user-default.png';
import heartFilled from 'images/heart_filled.png';
import heart from 'images/heart.png';
import arrowIcon from 'images/arrowIcon.png';
import heart_filled from 'images/heart_filled.png';
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
            isUpdate: false,
            updateId: '',
            updateReplyId: '',
            updateText: '',
            updateImg: null,
            updateAnonymous: false,
            updatePreview: '',
            sortType: '',
            page: 1,
        };
    }

    handlePage = (e) => {
        const page = e.target.value;
        const { vote, voteid, postid } = this.props;
        if (vote) {
            this.props.voteReply(voteid, page);
        } else {
            this.props.getReply(postid, page);
        }
        this.setState({
            page: page,
        });
    };

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevProps.reply_success !== this.props.reply_success && this.props.reply_success) {
            //댓글 작성 성공했을 때
            return 'reply';
        } else if (prevProps.rereply_success !== this.props.rereply_success && this.props.rereply_success) {
            //대댓글 작성 성공했을 때
            return 'rereply';
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //댓글 대댓글 입력 초기화
        const { page } = this.state;
        const { vote, voteid, postid } = this.props;
        if (snapshot === 'reply') {
            this.setState({ isAnonymous: false, commentText: '', commentImg: '', previewURL: '' });
        } else if (snapshot === 'rereply') {
            this.setState({
                reImg: '',
                rePreview: '',
                recommentId: 0,
                reText: '',
                reAnonymous: false,
            });
        }
        if (snapshot === 'reply' || snapshot === 'rereply') {
            if (vote) {
                this.props.voteReply(voteid, page);
            } else {
                this.props.getReply(postid, page);
            }
        }
    }

    handleComment = (e) => {
        if (e.target.id === 'comment') this.setState({ commentText: e.target.value });
        else if (e.target.id === 'update-reply' || e.target.id === 'update-rereply')
            this.setState({ updateText: e.target.value });
        else this.setState({ reText: e.target.value });
    };

    handleAnonymous = (e) => {
        if (e.target.id === 'comment') this.setState({ isAnonymous: e.target.checked });
        else if (e.target.id === 'update-reply' || e.target.id === 'update-rereply')
            this.setState({ updateAnonymous: e.target.checked });
        else this.setState({ reAnonymous: e.target.checked });
    };

    setImage = (type, file) => {
        if (type === 'comment') this.setState({ commentImg: file });
        else if (type === 'update-reply' || type === 'update-rereply') this.setState({ updateImg: file });
        else this.setState({ reImg: file });
    };

    setPreview = (type, url) => {
        if (type === 'comment') this.setState({ previewURL: url });
        else if (type === 'update-reply' || type === 'update-rereply') this.setState({ updatePreview: url });
        else this.setState({ rePreview: url });
    };

    deleteImg = (e) => {
        if (e.target.id === 'comment') this.setState({ commentImg: null, previewURL: '' });
        else if (e.target.id === 'update-reply' || e.target.id === 'update-rereply')
            this.setState({ updateImg: '', updatePreview: '' });
        else this.setState({ reImg: null, rePreview: '' });
    };

    openRecomment = (e) => {
        //답글 새로 열 때마다 상태 초기화: 익명, 내용, 사진
        this.setState({ recommentId: e.currentTarget.id, reAnonymous: false, reText: '', reImg: null, rePreview: '' });
    };

    closeRecomment = (e) => {
        this.setState({ recommentId: '', reAnonymous: false, reText: '', reImg: null, rePreview: '' });
    };

    closeUpdate = (e) => {
        this.setState({ isUpdate: false, updateId: '' });
    };

    openUpdate = (comment, id) => {
        const { isUpdate } = this.state;
        if (this.props.vote) {
            this.setState({
                isUpdate: !isUpdate,
                updateId: comment.id,
                updateText: comment.content,
                updatePreview: comment.votereply_image,
                updateAnonymous: comment.anonymous,
            });
        } else {
            this.setState({
                isUpdate: !isUpdate,
                updateId: comment.id,
                updateText: comment.body,
                updatePreview: comment.reply_image || comment.rereply_image,
                updateAnonymous: comment.anonymous,
            });
        }
        if (id) {
            this.setState({ updateReplyId: id });
        }
    };

    addReply = (e) => {
        const { voteid, isAuthenticated, vote, postid } = this.props;
        const { commentText, commentImg, isAnonymous, reAnonymous, reText, reImg } = this.state;

        if (!isAuthenticated) {
            alert('로그인이 필요합니다');
            this.props.history.push('/login');
        } else {
            const formData = new FormData();
            if (vote) {
                formData.append('voteboard_id', voteid);
                formData.append('content', commentText);
                if (commentImg !== null) formData.append('votereply_image', commentImg);
                formData.append('anonymous', isAnonymous);
            } else {
                formData.append('board_post_id', postid);
                formData.append('body', commentText);
                if (commentImg !== null) formData.append('reply_image', commentImg);
                formData.append('anonymous', isAnonymous);
            }
            this.props.addReply(formData);
        }
    };

    addRereply = (e) => {
        const { voteid, isAuthenticated, vote, postid } = this.props;
        const { reAnonymous, reText, reImg, recommentId } = this.state;

        if (!isAuthenticated) {
            alert('로그인이 필요합니다');
            this.props.history.push('/login');
        } else {
            const formData = new FormData();
            if (vote) {
                formData.append('voteboardreply_id', recommentId);
                formData.append('content', reText);
                if (reImg !== null) formData.append('voterereply_image', reImg);
                formData.append('anonymous', reAnonymous);
            } else {
                formData.append('board_post_id', postid);
                formData.append('reply_id', recommentId);
                formData.append('body', reText);
                if (reImg !== null) formData.append('rereply_image', reImg);
                formData.append('anonymous', reAnonymous);
            }
            this.props.addRereply(formData);
        }
    };

    updateReply = (e) => {
        const { voteid, isAuthenticated, vote, postid } = this.props;
        const { updateId, updateAnonymous, updateText, updateImg } = this.state;

        if (!isAuthenticated) {
            alert('로그인이 필요합니다');
            this.props.history.push('/login');
        } else {
            const formData = new FormData();
            if (vote) {
                formData.append('content', updateText);
                if (updateImg !== null) formData.append('votereply_image', updateImg);
                formData.append('anonymous', updateAnonymous);
            } else {
                formData.append('board_post_id', postid);
                formData.append('body', updateText);
                if (updateImg !== null) formData.append('image', updateImg);
                formData.append('anonymous', updateAnonymous);
            }
            this.props.updateReply(formData, updateId);
            this.closeUpdate();
        }
    };

    updateRereply = (e) => {
        const { voteid, isAuthenticated, vote, postid } = this.props;
        const { updateId, updateAnonymous, updateText, updateImg, updateReplyId } = this.state;

        if (!isAuthenticated) {
            alert('로그인이 필요합니다');
            this.props.history.push('/login');
        } else {
            const formData = new FormData();
            if (vote) {
                formData.append('content', updateText);
                if (updateImg !== null) formData.append('voterereply_image', updateImg);
                formData.append('anonymous', updateAnonymous);
            } else {
                formData.append('board_post_id', postid);
                formData.append('reply_id', updateReplyId);
                formData.append('body', updateText);
                if (updateImg !== null) formData.append('rereply_image', updateImg);
                formData.append('anonymous', updateAnonymous);
            }
            this.props.updateRereply(formData, updateId);
            this.closeUpdate();
        }
    };

    handleOrdering = (e) => {
        const { page } = this.state;
        const { vote, voteid, postid } = this.props;

        this.setState({ sortType: e.target.id });
        if (vote) {
            this.props.voteReply(voteid, page, e.currentTarget.id);
        } else {
            this.props.getReply(postid, page, e.currentTarget.id);
        }
    };

    render() {
        const query = queryString.parse(location.search);
        const currentPage = query.page ? Number(query.page) : 1;
        const { vote, commentList, voteReplyCount, postReplyCount, recommend_count, recommend } = this.props;
        const { isUpdate, updateId } = this.state;
        const rereplyList = vote ? 'voteboardrereply' : 'rereply';
        return (
            <div className="comment-list">
                <div className="only-pc">
                    <div className="comment-list__info">
                        <div className="comment-list__info-count">
                            {!vote && (
                                <button
                                    className="comment-list__info-count-recommend"
                                    onClick={this.props.recommendPost}
                                >
                                    <span className="border">추천</span>
                                    <span>{recommend_count}</span>
                                </button>
                            )}
                            <div className="comment-list__info-count-reply">
                                <span className="border">댓글</span>
                                <span>{vote ? voteReplyCount : postReplyCount}</span>
                            </div>
                        </div>
                        <div className="comment-list__sort">
                            <button id="recomment_count" onClick={this.handleOrdering}>
                                추천순
                                <img src={arrowIcon}></img>
                            </button>
                            <button id="created_at" onClick={this.handleOrdering}>
                                최신순
                                <img src={arrowIcon}></img>
                            </button>
                        </div>
                    </div>
                </div>
                {!vote && (
                    <div className="not-pc">
                        <div className="comment-list__count">
                            <button onClick={this.props.recommendPost}>
                                <img src={recommend ? heart_filled : heart} alt="heart" />
                            </button>
                            <span className={recommend ? 'recommended' : ''}>추천 {recommend_count}</span>
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
                    addReply={this.addReply}
                    addRereply={this.addRereply}
                />
                <div className="comment-list__ordering">
                    <div className="comment-list__reply">
                        <span>댓글 {vote ? voteReplyCount : postReplyCount}개</span>
                    </div>
                    <div className="not-pc">
                        <div className="comment-list__sort">
                            <button id="recomment_count" onClick={this.handleOrdering}>
                                추천순
                                <img src={arrowIcon}></img>
                            </button>
                            <button id="created_at" onClick={this.handleOrdering}>
                                최신순
                                <img src={arrowIcon}></img>
                            </button>
                        </div>
                    </div>
                </div>
                {this.props.commentList.map((comment) => {
                    return (
                        <div key={comment.id} className="comment-list__container">
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
                                        {(comment.votereply_image || comment.reply_image) && (
                                            <div>
                                                <img
                                                    className="comment-list__item--img"
                                                    src={comment.votereply_image || comment.reply_image}
                                                    alt="comment"
                                                />
                                            </div>
                                        )}
                                        <div className="comment-list__item--contents">
                                            {!vote ? comment.body : comment.content}
                                        </div>
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
                                                    <button id={comment.id} onClick={() => this.openUpdate(comment)}>
                                                        수정
                                                    </button>
                                                    <button id={comment.id} onClick={this.props.deleteReply}>
                                                        삭제
                                                    </button>
                                                </>
                                            ) : (
                                                <button>신고</button>
                                            )}
                                            {this.props.isRecommend && (
                                                <span className="only-pc">
                                                    <button
                                                        className={
                                                            comment.recommended
                                                                ? 'comment-list__item--button recommend'
                                                                : ''
                                                        }
                                                        id={comment.id}
                                                        onClick={this.props.replyRecommend}
                                                    >
                                                        추천
                                                    </button>
                                                </span>
                                            )}
                                        </div>
                                        {isUpdate && Number(updateId) === comment.id && (
                                            <div className="comment-list__item--openupdate">
                                                <CommentInput
                                                    type="update-reply"
                                                    setUpdate={() => this.setUpdate(comment)}
                                                    handleAnonymous={this.handleAnonymous}
                                                    isAnonymous={this.state.updateAnonymous}
                                                    handleComment={this.handleComment}
                                                    commentText={this.state.updateText}
                                                    setImage={this.setImage}
                                                    setPreview={this.setPreview}
                                                    commentImg={this.state.updateImg}
                                                    previewURL={this.state.updatePreview}
                                                    deleteImg={this.deleteImg}
                                                    updateReply={this.updateReply}
                                                    updateRereply={this.updateRereply}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                {this.props.isRecommend && (
                                    <div className="not-pc">
                                        <button id={comment.id} onClick={this.props.replyRecommend}>
                                            <img
                                                className="comment-list__item__button--heart"
                                                src={comment.recommended ? heartFilled : heart}
                                                alt="heart"
                                            />
                                        </button>
                                    </div>
                                )}
                            </div>
                            {comment[rereplyList] &&
                                comment[rereplyList].map((reComment) => {
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
                                                    {(reComment.voterereply_image || reComment.rereply_image) && (
                                                        <div>
                                                            <img
                                                                className="comment-list__item--img"
                                                                src={
                                                                    reComment.voterereply_image ||
                                                                    reComment.rereply_image
                                                                }
                                                                alt="comment"
                                                            />
                                                        </div>
                                                    )}
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
                                                        {vote ? reComment.content : reComment.body}
                                                    </div>
                                                    <div className="comment-list__item--button">
                                                        {reComment.is_author ? (
                                                            <>
                                                                <button
                                                                    id={reComment.id}
                                                                    onClick={() =>
                                                                        this.openUpdate(reComment, comment.id)
                                                                    }
                                                                >
                                                                    수정
                                                                </button>
                                                                <button
                                                                    id={reComment.id}
                                                                    onClick={this.props.deleteRereply}
                                                                >
                                                                    삭제
                                                                </button>
                                                            </>
                                                        ) : (
                                                            <button>신고</button>
                                                        )}
                                                        {this.props.isRecommend && (
                                                            <span className="only-pc">
                                                                <button
                                                                    className={
                                                                        reComment.recommended
                                                                            ? 'comment-list__item--button recommend'
                                                                            : ''
                                                                    }
                                                                    id={reComment.id}
                                                                    onClick={this.props.reReplyRecommend}
                                                                >
                                                                    추천
                                                                </button>
                                                            </span>
                                                        )}
                                                    </div>
                                                    {isUpdate && Number(updateId) === reComment.id && (
                                                        <div className="comment-list__item--openupdate">
                                                            <CommentInput
                                                                type="update-rereply"
                                                                setUpdate={() => this.setUpdate(reComment)}
                                                                handleAnonymous={this.handleAnonymous}
                                                                isAnonymous={this.state.updateAnonymous}
                                                                handleComment={this.handleComment}
                                                                commentText={this.state.updateText}
                                                                setImage={this.setImage}
                                                                setPreview={this.setPreview}
                                                                commentImg={this.state.updateImg}
                                                                previewURL={this.state.updatePreview}
                                                                deleteImg={this.deleteImg}
                                                                updateReply={this.updateReply}
                                                                updateRereply={this.updateRereply}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {this.props.isRecommend && (
                                                <div className="not-pc">
                                                    <button id={reComment.id} onClick={this.props.reReplyRecommend}>
                                                        <img
                                                            className="comment-list__item__button--heart"
                                                            src={reComment.recommended ? heartFilled : heart}
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
                                                addReply={this.addReply}
                                                addRereply={this.addRereply}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
                <Pagination countList={commentList.length} handlePage={this.handlePage} currentPage={currentPage} />
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
                    addReply={this.addReply}
                    addRereply={this.addRereply}
                />
            </div>
        );
    }
}

export default CommentList;
