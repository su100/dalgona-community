import React, { Component } from 'react';
import CommentList from 'components/common/comment/CommentList';
import VoteModal from 'components/common/VoteModal';
import moment from 'moment';
import './Vote.scss';

class Vote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectVote: '',
      showModal: false,
    };
  }

  onClickVote = (e) => {
    const { userVote } = this.props;
    if (e.currentTarget.id) {
      userVote(e.currentTarget.id);
      this.handleShowModal();
    }
  };

  handleShowModal = () => {
    const { showModal } = this.state;
    this.setState({ showModal: !showModal });
  };

  deleteReply = (e) => {
    const { deleteVoteReply } = this.props;
    const voteReplyId = e.currentTarget.id;
    deleteVoteReply(voteReplyId);
  };

  replyRecommend = (e) => {
    const { replyRecommend } = this.props;
    const voteReplyId = e.currentTarget.id;
    replyRecommend(voteReplyId);
  };

  deleteRereply = (e) => {
    const { deleteVoteRereply } = this.props;
    const voteRereplyId = e.currentTarget.id;
    deleteVoteRereply(voteRereplyId);
  };

  reReplyRecommend = (e) => {
    const { reReplyRecommend } = this.props;
    const voteRereplyId = e.currentTarget.id;
    reReplyRecommend(voteRereplyId);
  };

  render() {
    const { showModal, selectVote } = this.state;
    const {
      location,
      history,
      voteid,
      voteInfo,
      reply_success,
      voteReplyList,
      isAuthenticated,
      voteReplyCount,
      isVote,
      rereply_success,
      userVote,
      postVoteReply,
      postVoteRereply,
      updateVoteReply,
      updateVoteRereply,
      getVoteInfo,
      voteReply,
    } = this.props;
    return (
      <div className="vote">
        <div className="vote__detail">
          <span>
            {'홈'}
            {'>'}
            {'이슈'}
            {'>'}
            {'투표'}
          </span>
        </div>
        <div className="vote__info">
          <span className="vote__info-date">
            {moment(new Date(voteInfo.start_datetime)).format('YYYY/MM/DD HH:MM')}
            {'~'}
            {moment(new Date(voteInfo.end_datetime)).format('YYYY/MM/DD HH:MM')}
          </span>
          <div className="vote__info-maininfo">
            <span className="vote__info-maininfo-title">{voteInfo.title}</span>
            <div className="vote__info-maininfo-count">
              D-
              {voteInfo.deadline}
            </div>
          </div>
        </div>
        <div className="vote__main">
          <div className="vote__main__content">
            {isAuthenticated && showModal && (
              <VoteModal
                voteDuplicate={selectVote}
                isVote={isVote}
                handleShowModal={this.handleShowModal}
                userVote={userVote}
              />
            )}
            {voteInfo?.voteitem && (
              <button
                type="button"
                className="vote__main__content-first"
                id={voteInfo?.voteitem[0].id}
                onClick={this.onClickVote}
              >
                {voteInfo.voteitem[0].item_image === null ? (
                  <div className="vote__main__content-first-circle" />
                ) : (
                  <img src={voteInfo.voteitem[0].item_image} alt="" />
                )}
                <span className="vote__main__content-first-title">{voteInfo?.voteitem[0].item_name}</span>
                <span className="vote__main__content-first-description">{voteInfo?.voteitem[0].item_content}</span>
              </button>
            )}
            <div className="vote__main__content-area">
              <div className="only-pc">
                <div className="vote__main__content-area-vs">
                  <span>vs</span>
                </div>
              </div>
              <div className="not-pc">
                <div className="vote__main__content-area-vs">
                  <span>vs</span>
                </div>
              </div>
            </div>
            {voteInfo?.voteitem && (
              <button
                type="button"
                className="vote__main__content-second"
                id={voteInfo?.voteitem[1].id}
                onClick={this.onClickVote}
              >
                {voteInfo.voteitem[1].item_image === null ? (
                  <div className="vote__main__content-second-circle" />
                ) : (
                  <img src={voteInfo.voteitem[1].item_image} alt="" />
                )}
                <span className="vote__main__content-second-title">{voteInfo?.voteitem[1].item_name}</span>
                <span className="vote__main__content-second-description">{voteInfo?.voteitem[1].item_content}</span>
              </button>
            )}
          </div>
          <span className="vote__main-count">
            {'현재'}
            {voteInfo.vote_count}
            {'표 차이'}
          </span>
          <div className="vote__main-ratio">
            <div
              style={{
                width: `calc(${voteInfo && voteInfo.voteitem && voteInfo.voteitem[0].vote_count}/
                                    ${voteInfo.vote_count}*100%)`,
              }}
              className="vote__main-ratio left"
            />
            <div
              style={{
                width: `calc(${voteInfo && voteInfo.voteitem && voteInfo.voteitem[1].vote_count}/
                                    ${voteInfo.vote_count}*100%)`,
              }}
              className="vote__main-ratio right"
            />
          </div>
          <div className="vote__main-description">{voteInfo.content}</div>
        </div>
        <div className="vote__comment" />
        {voteReplyList !== undefined && (
          <CommentList
            history={history}
            location={location}
            vote
            commentList={voteReplyList}
            reply_success={reply_success}
            voteReplyCount={voteReplyCount}
            isAuthenticated={isAuthenticated}
            voteid={voteid}
            rereply_success={rereply_success}
            addReply={postVoteReply}
            addRereply={postVoteRereply}
            updateReply={updateVoteReply}
            updateRereply={updateVoteRereply}
            deleteReply={this.deleteReply}
            deleteRereply={this.deleteRereply}
            replyRecommend={this.replyRecommend}
            reReplyRecommend={this.reReplyRecommend}
            getVoteInfo={getVoteInfo}
            voteReply={voteReply}
            isRecommend
          />
        )}
      </div>
    );
  }
}

export default Vote;
