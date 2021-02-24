import React from 'react';
import { Link } from 'react-router-dom';

import './VoteItem.scss';

const VoteItem = ({ id, title, item }) => {
    return (
        <div className="vote-item">
            <h2>{title}</h2>
            <h5>
                <Link to={`/vote/${id}`}>지금 투표하러가기 &gt;</Link>
            </h5>
            <div className="vote-item__box--img">
                <img src={item[0].item_image} alt="vote1" />
                <span>vs</span>
                <img src={item[1].item_image} alt="vote2" />
            </div>
        </div>
    );
};

export default VoteItem;
