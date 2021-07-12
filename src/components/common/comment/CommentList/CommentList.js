import React, { Component } from 'react';
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

    const headerHeight = document.querySelector('header').scrollHeight;
    const contentHeight = document.querySelector('.view').scrollHeight;
    const commentInputHeight = document.querySelector('.comment-input.comment').scrollHeight;

    window.scrollTo(0, headerHeight + contentHeight + commentInputHeight + 120);
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
      const result = window.confirm('로그인이 필요합니다');
      if (result) {
        history.push('/login');
      }
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

  replyRecommend = (e) => {
    const { replyRecommend } = this.props;
    const { page } = this.state;
    const postReplyId = e.currentTarget.id;
    replyRecommend(postReplyId, page);
  };

  reReplyRecommend = (e) => {
    const { reReplyRecommend } = this.props;
    const { page } = this.state;
    const postRereplyId = e.currentTarget.id;
    reReplyRecommend(postRereplyId, page);
  };

  render() {
    const {
      vote,
      isRecommend,
      commentList,
      recommend_count,
      recommend,
      recommendPost,
      deleteReply,
      deleteRereply,
      reply_count,
      postAuthor,
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
      page,
    } = this.state;

    const replySort = () => (
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
    );

    const commentListHeader = () => (
      <>
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
                <span>{reply_count}</span>
              </div>
            </div>
            {replySort()}
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
      </>
    );

    const checkNickname = (comment) => {
      let nickname;
      if (comment.anonymous) {
        nickname = '익명';
      } else if (comment.author.nickname) {
        nickname = comment.author.nickname;
      } else {
        nickname = '삭제된 댓글';
      }
      if (!comment.anonymous && !vote && comment.author?.nickname === postAuthor?.nickname) {
        nickname += '(글쓴이)';
      }
      return nickname;
    };

    const commentBody = (comment, isComment) => {
      let img;
      if (vote) {
        img = isComment ? comment.votereply_image : comment.voterereply_image;
      } else {
        img = isComment ? comment.reply_image : comment.rereply_image;
      }
      return (
        <div className="comment-list__item--container">
          <div className="comment-list__item--contents">
            {img && <img className="comment-list__item--img" src={img} alt="comment" />}
            <p>{vote ? comment.content : comment.body}</p>
          </div>
          {isRecommend && (
            <div className="not-pc">
              <button id={comment.id} onClick={isComment ? this.replyRecommend : this.reReplyRecommend}>
                <img
                  className="comment-list__item__button--heart"
                  src={comment.recommended ? heartFilled : heart}
                  alt="heart"
                />
              </button>
            </div>
          )}
        </div>
      );
    };

    const commentButton = (comment, isComment, id) => (
      <div className="comment-list__item--button">
        {isComment && (
          <button
            id={comment.id}
            onClick={Number(recommentId) === comment.id ? this.closeRecomment : this.openRecomment}
          >
            답글
          </button>
        )}
        {comment.is_author ? (
          <>
            <button
              id={comment.id}
              onClick={() => (isComment ? this.openUpdate(comment) : this.openUpdate(comment, id))}
            >
              수정
            </button>
            <button id={comment.id} onClick={isComment ? deleteReply : deleteRereply}>
              삭제
            </button>
          </>
        ) : (
          <button onClick={() => alert('추후 업데이트될 기능입니다.')}>신고</button>
        )}
        {isRecommend && (
          <span className="only-pc">
            <button
              className={comment.recommended ? 'comment-list__item--button recommend' : ''}
              id={comment.id}
              onClick={isComment ? this.replyRecommend : this.reReplyRecommend}
            >
              추천
            </button>
          </span>
        )}
      </div>
    );

    const updateCommentInput = (comment, isComment) => (
      <CommentInput
        type={isComment ? 'update-reply' : 'update-rereply'}
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
    );

    const commentInput = (isComment) => (
      <CommentInput
        type={isComment ? 'comment' : 'reComment'}
        handleAnonymous={this.handleAnonymous}
        isAnonymous={isComment ? isAnonymous : reAnonymous}
        handleComment={this.handleComment}
        commentText={isComment ? commentText : reText}
        setImage={this.setImage}
        setPreview={this.setPreview}
        commentImg={isComment ? commentImg : reImg}
        previewURL={isComment ? previewURL : rePreview}
        deleteImg={this.deleteImg}
        addReply={this.addReply}
        addRereply={this.addRereply}
      />
    );

    const commentHeader = (comment) => (
      <div className="comment-list__item--detail">
        <span
          className={
            !comment.anonymous && !vote && comment.author?.nickname === postAuthor?.nickname
              ? 'comment-list__item--username author'
              : 'comment-list__item--username'
          }
        >
          {checkNickname(comment)}
        </span>
        <span>{comment.created_at}</span>
        <span>{`추천 ${comment.recommend_count}`}</span>
      </div>
    );

    const currentPage = page ? Number(page) : 1;
    const rereplyList = vote ? 'voteboardrereply' : 'rereply';

    return (
      <div className="comment-list">
        {commentListHeader()}
        <div className="comment-list__border" />
        {commentInput(true)}
        <div className="comment-list__ordering">
          <div className="comment-list__reply">
            <span>{`댓글 ${reply_count} 개`}</span>
          </div>
          <div className="not-pc">{replySort()}</div>
        </div>
        {commentList.map((comment) => (
          <div key={comment.id} className="comment-list__container">
            <div className="comment-list__item">
              <div className="comment-list__item--left">
                <img
                  className="comment-list__item--user-default"
                  src={comment.author?.profile_image ?? userDefault}
                  alt="userImg"
                />
                <div className="comment-list__item--main">
                  {commentHeader(comment)}
                  {isUpdate && Number(updateId) === comment.id ? (
                    <div className="comment-list__item--openupdate">{updateCommentInput(comment, true)}</div>
                  ) : (
                    <>
                      {commentBody(comment, true)}
                      {commentButton(comment, true)}
                    </>
                  )}
                </div>
              </div>
            </div>
            {comment[rereplyList] &&
              comment[rereplyList].map((reComment) => (
                <div key={reComment.id} className="comment-list__item comment-list__item--recomment">
                  <div className="comment-list__item--left">
                    <div className="comment-list__item--recomment-mark" />
                    <img
                      className="comment-list__item--user-default"
                      src={reComment.author?.profile_image ?? userDefault}
                      alt="userImg"
                    />
                    <div className="comment-list__item--main">
                      {commentHeader(reComment)}
                      {isUpdate && Number(updateId) === reComment.id ? (
                        <div className="comment-list__item--openupdate">{updateCommentInput(reComment, false)}</div>
                      ) : (
                        <>
                          {commentBody(reComment, false)}
                          {commentButton(reComment, false, comment.id)}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            {Number(recommentId) === comment.id && (
              <div className="comment-list__item comment-list__item--recomment">
                <div className="comment-list__item--left">
                  <div className="comment-list__item--recomment-mark" />
                  <div className="comment-list__item--main">{commentInput(false)}</div>
                </div>
              </div>
            )}
          </div>
        ))}
        <Pagination countList={reply_count} handlePage={this.handlePage} currentPage={currentPage} isReply />
      </div>
    );
  }
}

export default CommentList;
