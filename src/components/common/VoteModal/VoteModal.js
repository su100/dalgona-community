import React from 'react';
import { Link } from 'react-router-dom';
import './VoteModal.scss';

const VoteModal = ({ voteDuplicate, handleShowModal, isVote }) => (
    <div className="votemodal">
        <span>{isVote ? '투표는 한번만 가능합니다.' : '투표되었습니다.'}</span>
        <div className="votemodal__button">
            {isVote && (
                <button className="cancel" onClick={handleShowModal}>
                    취소
                </button>
            )}
            <button onClick={handleShowModal}>{isVote ? '투표하기' : '확안'}</button>
        </div>
    </div>
);

export default VoteModal;
