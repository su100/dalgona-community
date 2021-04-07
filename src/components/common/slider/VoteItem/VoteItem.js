import React from 'react';
import { Link } from 'react-router-dom';

import './VoteItem.scss';

const VoteItem = ({ id, title, voteitem }) => (
  <Link to={`/vote${id ? `/${id}` : ''}`} className="vote-item">
    <h2>{title}</h2>
    <h5>지금 투표하러가기 &gt;</h5>
    <div className="vote-item__box--img">
      {voteitem[0].item_image ? (
        <img className="vote-item__image" src={voteitem[0].item_image} alt="vote-item" />
      ) : (
        <div className="vote-item__image empty">?</div>
      )}
      <span>vs</span>
      {voteitem[1].item_image ? (
        <img className="vote-item__image" src={voteitem[1].item_image} alt="vote-item" />
      ) : (
        <div className="vote-item__image empty">?</div>
      )}
    </div>
  </Link>
);

export default VoteItem;
