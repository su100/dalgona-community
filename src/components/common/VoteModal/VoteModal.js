import React from 'react';
import { Link } from 'react-router-dom';
import './VoteModal.scss';

const VoteModal = ({ voteDuplicate, handleShowModal }) => (
    <div className="votemodal">
        <span>{voteDuplicate ? '투표는 한번만 가능합니다.' : '투표되었습니다.'}</span>
        <div>
            {voteDuplicate && <button className="cancel">취소</button>}
            <button onClick={handleShowModal}>{voteDuplicate ? '투표하기' : '확안'}</button>
        </div>
    </div>
);

export default VoteModal;
