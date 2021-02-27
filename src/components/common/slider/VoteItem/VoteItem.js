import React from 'react';
import { Link } from 'react-router-dom';

import './VoteItem.scss';

const VoteItem = ({ id, title, voteitem }) => {
    return (
        <Link to={`/vote/${id}`} className="vote-item">
            <h2>{title}</h2>
            <h5>지금 투표하러가기 &gt;</h5>
            <div className="vote-item__box--img">
                <img src={voteitem[0].item_image} alt="vote1" />
                <span>vs</span>
                <img src={voteitem[1].item_image} alt="vote2" />
            </div>
        </Link>
    );
};

export default VoteItem;
