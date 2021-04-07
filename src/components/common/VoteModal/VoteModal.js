import React from 'react';
import './VoteModal.scss';

const VoteModal = ({ handleShowModal, isVote }) => (
  <div className="votemodal">
    <div className="votemodal-modal">
      <span>{isVote ? '투표되었습니다.' : '투표는 한번만 가능합니다.'}</span>
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

export default VoteModal;
