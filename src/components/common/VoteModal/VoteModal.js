import React from 'react';
import './VoteModal.scss';

const VoteModal = ({ handleShowModal, isVote, finishVote }) => {
  let comment;
  if (finishVote) {
    comment = '마감된 투표 입니다.';
  } else if (isVote) {
    comment = '투표되었습니다.';
  } else {
    comment = '투표는 한번만 가능합니다.';
  }
  return (
    <div className="votemodal">
      <div className="votemodal-modal">
        <span>{comment}</span>
        <div className="votemodal-modal__button">
          {isVote && (
            <button className="cancel" onClick={handleShowModal}>
              취소
            </button>
          )}
          <button className="confirm" onClick={handleShowModal}>
            {isVote ? '투표하기' : '확인'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoteModal;
