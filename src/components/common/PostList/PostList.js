import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './PostList.scss';

const PostList = ({ hasReply, postList, hasGrid, noBorder, link }) => {
    const [type, setType] = useState('list');

    const handleType = (e) => {
        setType(e.currentTarget.id);
    };

    return (
        <div className={type === 'list' ? 'post-list' : 'post-list grid'}>
            {hasGrid && (
                <div className="post-list__container--type">
                    <button className="post-list__btn--type list" id="list" onClick={handleType}>
                        <div className={type === 'list' ? 'active list-bar' : 'list-bar'} />
                        <div className={type === 'list' ? 'active list-bar' : 'list-bar'} />
                    </button>
                    <button className="post-list__btn--type grid" id="grid" onClick={handleType}>
                        <div className={type === 'grid' ? 'active grid-square' : 'grid-square'} />
                        <div className={type === 'grid' ? 'active grid-square' : 'grid-square'} />
                        <div className={type === 'grid' ? 'active grid-square' : 'grid-square'} />
                        <div className={type === 'grid' ? 'active grid-square' : 'grid-square'} />
                    </button>
                </div>
            )}
            <div className="only-pc">
                <div className="post-list__container">
                    {postList.map((post, index) => {
                        return (
                            <Link
                                to={`${link}/${post.id}`}
                                className={noBorder ? 'post-list__item no-border' : 'post-list__item'}
                                key={index}
                            >
                                <div className="post-list__item--left">
                                    {post.image && (
                                        <div className="post-list__img">
                                            <img src={post.image} alt="post" />
                                        </div>
                                    )}
                                    <div className="post-list__item--main">
                                        <div className="post-list__item--title">
                                            {post.image && (
                                                <div className="post-list__img--pc">
                                                    <img src={post.image} alt="post" />
                                                </div>
                                            )}
                                            <p>{post.title}</p>
                                        </div>
                                        <div className="post-list__item--detail">
                                            {hasReply && (
                                                <span className="post-list__item--comment--pc">
                                                    댓글 {post.reply_count}
                                                </span>
                                            )}
                                            <span>조회수 {post.views}</span>
                                            <span className="post-list__item--date">{post.created_at}</span>
                                            <span>추천 {post.recommend_count}</span>
                                        </div>
                                    </div>
                                </div>
                                {hasReply && <div className="post-list__item--comment">{post.reply_count}</div>}
                            </Link>
                        );
                    })}
                </div>
            </div>
            <div className="not-pc">
                <div className="post-list__container">
                    {postList.map((post, index) => {
                        if (type === 'list') {
                            return (
                                <Link
                                    to={`${link}/${post.id}`}
                                    className={noBorder ? 'post-list__item no-border' : 'post-list__item'}
                                    key={index}
                                >
                                    <div className="post-list__item--left">
                                        {post.image && (
                                            <div className="post-list__img">
                                                <img src={post.image} alt="post" />
                                            </div>
                                        )}
                                        <div className="post-list__item--main">
                                            <div className="post-list__item--title">
                                                {post.image && (
                                                    <div className="post-list__img--pc">
                                                        <img src={post.image} alt="post" />
                                                    </div>
                                                )}
                                                <p>{post.title}</p>
                                            </div>
                                            <div className="post-list__item--detail">
                                                {hasReply && (
                                                    <span className="post-list__item--comment--pc">
                                                        댓글 {post.reply_count}
                                                    </span>
                                                )}
                                                <span>조회수 {post.views}</span>
                                                <span className="post-list__item--date">{post.created_at}</span>
                                                <span>추천 {post.recommend_count}</span>
                                            </div>
                                        </div>
                                    </div>
                                    {hasReply && (
                                        <div className="post-list__item--comment not-pc">{post.reply_count}</div>
                                    )}
                                </Link>
                            );
                        } else {
                            return (
                                <Link to={`${link}/${post.id}`} key={post.id} className="post-list__item">
                                    {!post.image ? (
                                        <img src="http://unsplash.it/300/300?image=122" alt="post" />
                                    ) : (
                                        <p>{post.title}</p>
                                    )}
                                </Link>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
};

export default PostList;
