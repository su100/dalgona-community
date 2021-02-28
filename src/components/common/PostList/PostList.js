import React from 'react';
import { Link } from 'react-router-dom';
import './PostList.scss';

const PostList = ({ postList }) => {
    return (
        <div className="post-list">
            {postList.map((post, index) => {
                return (
                    <Link to="/" className="post-list__item" key={index}>
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
                                    {post.reply_count && (
                                        <span className="post-list__item--comment--pc">댓글 {post.reply_count}</span>
                                    )}
                                    <span>조회수 {post.views}</span>
                                    <span className="post-list__item--date">{post.created_at}</span>
                                    <span>추천 {post.recommend_count}</span>
                                </div>
                            </div>
                        </div>
                        {post.reply_count && <div className="post-list__item--comment">{post.reply_count}</div>}
                    </Link>
                );
            })}
        </div>
    );
};

export default PostList;
