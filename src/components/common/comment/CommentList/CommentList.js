import React, { Component } from 'react';
import queryString from 'query-string';
import CommentInput from 'components/common/comment/CommentInput';
import Pagination from 'components/common/Pagination';
import userDefault from 'images/user-default.png';
import heartFilled from 'images/heartFilled.png';
import heart from 'images/heart.png';
import arrowIcon from 'images/arrowIcon.png';
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
      sortType: 'recommend_count',
      page: 1,
    };
  }

  getSnapshotBeforeUpdate(prevProps) {
    const { page } = this.state;
    const { reply_success, rereply_success, vote, voteid, postid, voteReply, getReply } = this.props;
    if (prevProps.reply_success !== reply_success && reply_success) {
      // 댓글 작성 성공했을 때
      this.setReplyReset();
      if (vote) {
        voteReply(voteid, page);
      } else {
        getReply(postid, page);
      }
      return 'reply';
    }
    if (prevProps.rereply_success !== rereply_success && rereply_success) {
      // 대댓글 작성 성공했을 때
      this.setRereplyReset();
      if (vote) {
        voteReply(voteid, page);
      } else {
        getReply(postid, page);
      }
      return 'rereply';
    }
    return null;
  }

  componentDidUpdate(snapshot) {
    // 댓글 대댓글 입력 초기화
    const { page } = this.state;
    const { vote, voteid, postid, voteReply, getReply } = this.props;
    if (snapshot === 'reply') {
      this.setReplyReset();
    } else if (snapshot === 'rereply') {
      this.setRereplyReset();
    }
    if (snapshot === 'reply' || snapshot === 'rereply') {
      if (vote) {
        voteReply(voteid, page);
      } else {
        getReply(postid, page);
      }
    }
  }

  setReplyReset = () => {
    this.setState({ isAnonymous: false, commentText: '', commentImg: '', previewURL: '' });
  };

  setRereplyReset = () => {
    this.setState({
      reImg: '',
      rePreview: '',
      recommentId: 0,
      reText: '',
      reAnonymous: false,
    });
  };

  handlePage = (e) => {
    const page = e.target.value;
    const { vote, voteid, postid, voteReply, getReply } = this.props;
    if (vote) {
      voteReply(voteid, page);
    } else {
      getReply(postid, page);
    }
    this.setState({
      page,
    });
  };

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
    // 답글 새로 열 때마다 상태 초기화: 익명, 내용, 사진
    this.setState({ recommentId: e.currentTarget.id, reAnonymous: false, reText: '', reImg: null, rePreview: '' });
  };

  closeRecomment = () => {
    this.setState({ recommentId: '', reAnonymous: false, reText: '', reImg: null, rePreview: '' });
  };

  closeUpdate = () => {
    this.setState({ isUpdate: false, updateId: '' });
  };

  openUpdate = (comment, id) => {
    const { isUpdate } = this.state;
    const { vote } = this.props;
    if (vote) {
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

  addReply = () => {
    const { history, voteid, isAuthenticated, vote, postid, addReply } = this.props;
    const { commentText, commentImg, isAnonymous } = this.state;

    if (!isAuthenticated) {
      alert('로그인이 필요합니다');
      history.push('/login');
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
      addReply(formData);
    }
  };

  addRereply = () => {
    const { history, isAuthenticated, vote, postid, addRereply } = this.props;
    const { reAnonymous, reText, reImg, recommentId } = this.state;

    if (!isAuthenticated) {
      alert('로그인이 필요합니다');
      history.push('/login');
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
      addRereply(formData);
    }
  };

  updateReply = () => {
    const { history, isAuthenticated, vote, postid, updateReply } = this.props;
    const { updateId, updateAnonymous, updateText, updateImg } = this.state;

    if (!isAuthenticated) {
      alert('로그인이 필요합니다');
      history.push('/login');
    } else {
      const formData = new FormData();
      if (vote) {
        formData.append('content', updateText);
        if (updateImg !== null) formData.append('votereply_image', updateImg);
        formData.append('anonymous', updateAnonymous);
      } else {
        formData.append('board_post_id', postid);
        formData.append('body', updateText);
        if (updateImg !== null) formData.append('reply_image', updateImg);
        formData.append('anonymous', updateAnonymous);
      }
      console.log('update');
      updateReply(formData, updateId);
      this.closeUpdate();
    }
  };

  updateRereply = () => {
    const { history, isAuthenticated, vote, postid, updateRereply } = this.props;
    const { updateId, updateAnonymous, updateText, updateImg, updateReplyId } = this.state;

    if (!isAuthenticated) {
      alert('로그인이 필요합니다');
      history.push('/login');
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
      updateRereply(formData, updateId);
      this.closeUpdate();
    }
  };

  handleOrdering = (e) => {
    const { page } = this.state;
    const { vote, voteid, postid, voteReply, getReply } = this.props;

    this.setState({ sortType: e.currentTarget.id });
    if (vote) {
      voteReply(voteid, page, e.currentTarget.id);
    } else {
      getReply(postid, page, e.currentTarget.id);
    }
  };

  render() {
    const {
      location,
      vote,
      isRecommend,
      commentList,
      voteReplyCount,
      postReplyCount,
      recommend_count,
      recommend,
      recommendPost,
      deleteReply,
      replyRecommend,
      reReplyRecommend,
      deleteRereply,
    } = this.props;
    const {
      isUpdate,
      updateId,
      sortType,
      isAnonymous,
      commentText,
      commentImg,
      recommentId,
      previewURL,
      reAnonymous,
      reText,
      reImg,
      rePreview,
      updateAnonymous,
      updateText,
      updateImg,
      updatePreview,
    } = this.state;
    const query = queryString.parse(location.search);
    const currentPage = query.page ? Number(query.page) : 1;
    const rereplyList = vote ? 'voteboardrereply' : 'rereply';
    return (
      <div className="comment-list">
        <div className="only-pc">
          <div className="comment-list__info">
            <div className="comment-list__info-count">
              {!vote && (
                <button className="comment-list__info-count-recommend" onClick={recommendPost}>
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
              <button
                className={sortType === 'recommend_count' ? 'onclick' : undefined}
                id="recommend_count"
                onClick={this.handleOrdering}
              >
                추천순
                <img src={arrowIcon} alt="arrow" />
              </button>
              <button
                className={sortType === 'created_at' ? 'onclick' : undefined}
                id="created_at"
                onClick={this.handleOrdering}
              >
                최신순
                <img src={arrowIcon} alt="arrow" />
              </button>
            </div>
          </div>
        </div>
        {!vote && (
          <div className="not-pc">
            <div className="comment-list__count">
              <button onClick={recommendPost}>
                <img src={recommend ? heartFilled : heart} alt="heart" />
              </button>
              <span className={recommend ? 'recommended' : ''}>
                추천
                {recommend_count}
              </span>
            </div>
          </div>
        )}
        <CommentInput
          type="comment"
          handleAnonymous={this.handleAnonymous}
          isAnonymous={isAnonymous}
          handleComment={this.handleComment}
          commentText={commentText}
          setImage={this.setImage}
          setPreview={this.setPreview}
          commentImg={commentImg}
          previewURL={previewURL}
          deleteImg={this.deleteImg}
          addReply={this.addReply}
          addRereply={this.addRereply}
        />
        <div className="comment-list__ordering">
          <div className="comment-list__reply">
            <span>
              댓글
              {vote ? voteReplyCount : postReplyCount}
              {'개'}
            </span>
          </div>
          <div className="not-pc">
            <div className="comment-list__sort">
              <button
                className={sortType === 'recommend_count' ? 'onclick' : undefined}
                id="recommend_count"
                onClick={this.handleOrdering}
              >
                추천순
                <img src={arrowIcon} alt="arrow" />
              </button>
              <button
                className={sortType === 'created_at' ? 'onclick' : undefined}
                id="created_at"
                onClick={this.handleOrdering}
              >
                최신순
                <img src={arrowIcon} alt="arrow" />
              </button>
            </div>
          </div>
        </div>
        {commentList.map((comment) => (
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
                  <div className="comment-list__item--contents">{!vote ? comment.body : comment.content}</div>
                  <div className="comment-list__item--button">
                    <button
                      id={comment.id}
                      onClick={Number(recommentId) === comment.id ? this.closeRecomment : this.openRecomment}
                    >
                      답글
                    </button>
                    {comment.is_author ? (
                      <>
                        <button id={comment.id} onClick={() => this.openUpdate(comment)}>
                          수정
                        </button>
                        <button id={comment.id} onClick={deleteReply}>
                          삭제
                        </button>
                      </>
                    ) : (
                      <button>신고</button>
                    )}
                    {isRecommend && (
                      <span className="only-pc">
                        <button
                          className={comment.recommended ? 'comment-list__item--button recommend' : ''}
                          id={comment.id}
                          onClick={replyRecommend}
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
                        isAnonymous={updateAnonymous}
                        handleComment={this.handleComment}
                        commentText={updateText}
                        setImage={this.setImage}
                        setPreview={this.setPreview}
                        commentImg={updateImg}
                        previewURL={updatePreview}
                        deleteImg={this.deleteImg}
                        updateReply={this.updateReply}
                        updateRereply={this.updateRereply}
                      />
                    </div>
                  )}
                </div>
              </div>
              {isRecommend && (
                <div className="not-pc">
                  <button id={comment.id} onClick={replyRecommend}>
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
              comment[rereplyList].map((reComment) => (
                <div key={reComment.id} className="comment-list__item comment-list__item--recomment">
                  <div className="comment-list__item--left">
                    <div className="comment-list__item--recomment-mark" />
                    <div className="not-pc">
                      <img className="comment-list__item--user-default" src={userDefault} alt="userImg" />
                    </div>

                    <div className="comment-list__item--main">
                      <div className="comment-list__item--detail">
                        <span className="comment-list__item--username">
                          {reComment.anonymous ? '익명' : reComment.author.nickname}
                        </span>
                        <span>{reComment.created_at}</span>
                        <span>{isRecommend && `추천 ${reComment.recommend_count}`}</span>
                      </div>
                      {(reComment.voterereply_image || reComment.rereply_image) && (
                        <div>
                          <img
                            className="comment-list__item--img"
                            src={reComment.voterereply_image || reComment.rereply_image}
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
                      <div className="comment-list__item--contents">{vote ? reComment.content : reComment.body}</div>
                      <div className="comment-list__item--button">
                        {reComment.is_author ? (
                          <>
                            <button id={reComment.id} onClick={() => this.openUpdate(reComment, comment.id)}>
                              수정
                            </button>
                            <button id={reComment.id} onClick={deleteRereply}>
                              삭제
                            </button>
                          </>
                        ) : (
                          <button>신고</button>
                        )}
                        {isRecommend && (
                          <span className="only-pc">
                            <button
                              className={reComment.recommended ? 'comment-list__item--button recommend' : ''}
                              id={reComment.id}
                              onClick={reReplyRecommend}
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
                            isAnonymous={updateAnonymous}
                            handleComment={this.handleComment}
                            commentText={updateText}
                            setImage={this.setImage}
                            setPreview={this.setPreview}
                            commentImg={updateImg}
                            previewURL={updatePreview}
                            deleteImg={this.deleteImg}
                            updateReply={this.updateReply}
                            updateRereply={this.updateRereply}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {isRecommend && (
                    <div className="not-pc">
                      <button id={reComment.id} onClick={reReplyRecommend}>
                        <img
                          className="comment-list__item__button--heart"
                          src={reComment.recommended ? heartFilled : heart}
                          alt="heart"
                        />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            {Number(recommentId) === comment.id && (
              <div className="comment-list__item comment-list__item--recomment">
                <div className="comment-list__item--left">
                  <div className="comment-list__item--recomment-mark" />
                  <div className="comment-list__item--main">
                    <CommentInput
                      type="recomment"
                      handleAnonymous={this.handleAnonymous}
                      isAnonymous={reAnonymous}
                      handleComment={this.handleComment}
                      commentText={reText}
                      setImage={this.setImage}
                      setPreview={this.setPreview}
                      commentImg={reImg}
                      previewURL={rePreview}
                      deleteImg={this.deleteImg}
                      addReply={this.addReply}
                      addRereply={this.addRereply}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        <Pagination countList={commentList.length} handlePage={this.handlePage} currentPage={currentPage} />
        <CommentInput
          type="comment"
          handleAnonymous={this.handleAnonymous}
          isAnonymous={isAnonymous}
          handleComment={this.handleComment}
          commentText={commentText}
          setImage={this.setImage}
          setPreview={this.setPreview}
          commentImg={commentImg}
          previewURL={previewURL}
          deleteImg={this.deleteImg}
          addReply={this.addReply}
          addRereply={this.addRereply}
        />
      </div>
    );
  }
}

export default CommentList;
