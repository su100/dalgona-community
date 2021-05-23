import React from 'react';
import './VoteModal.scss';

const VoteModal = ({ handleShowModal, isVote, finishVote, voteResult }) => (
  <div className="votemodal">
    <div className="votemodal-modal">
      <span>{voteResult}</span>
      <div className="votemodal-modal__button">
        <button className="confirm" onClick={handleShowModal}>
          확인
        </button>
      </div>
    </div>
  </div>
);

export default VoteModal;
