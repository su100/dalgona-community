import React from 'react';
import { Link } from 'react-router-dom';
import './PostList.scss';

const PostList = (props) => {
    return (
        <div className="post-list">
            {props.postList.map((post, index) => {
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
                                    <div>{post.title}</div>
                                </div>
                                <div className="post-list__item--detail">
                                    <div className="post-list__item--comment--pc">댓글 {post.comments}</div>
                                    <div>조회수 {post.views}</div>
                                    <div>{post.date}</div>
                                    <div>추천 {post.recommends}</div>
                                </div>
                            </div>
                        </div>
                        <div className="post-list__item--comment">{post.comments}</div>
                    </Link>
                );
            })}
        </div>
    );
};

export default PostList;
