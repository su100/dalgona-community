import React from 'react';

import { Link } from 'react-router-dom';
import BasicSlider from 'components/common/slider/BasicSlider';

import './BoardHotList.scss';

const BoardHotList = ({ link, hotPostList }) => {
    return (
        <div className="board-hot-list">
            <BasicSlider slidesToShow={3} arrows dots={false}>
                {hotPostList.map((post) => {
                    const image = post.id % 2 == 0 ? '' : 'http://unsplash.it/300/300?image=122';
                    return (
                        <Link to={`/${link}/${post.id}`} key={post.id} className="board-hot-list__item">
                            <div className="image">{image ? <img src={image} alt="post" /> : '더보기'}</div>
                            <p>
                                {post.title}
                                {post.title}
                                {post.id > 2 && post.title}
                                {post.id > 2 && post.title}
                            </p>
                            <span>조회수 {post.views}</span>
                            <span>{post.created_at}</span>
                            <span>추천 {post.recommend_count}</span>
                        </Link>
                    );
                })}
            </BasicSlider>
        </div>
    );
};

export default BoardHotList;
