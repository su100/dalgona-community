import React from 'react';

import userDefault from 'images/user-default.png';
import heartFilled from 'images/heart_filled.png';
import heart from 'images/heart.png';

import './CommentList.scss';

const CommentList = (props) => {
    return (
        <div className="comment-list">
            {props.commentList.map((comment) => {
                return (
                    <div key={comment.id}>
                        <div className="comment-list__item">
                            <div className="comment-list__item--left">
                                <div className="not-pc">
                                    <img
                                        className="comment-list__item--user-default"
                                        src={comment.userImg ?? userDefault}
                                        alt="userImg"
                                    />
                                </div>
                                <div className="comment-list__item--main">
                                    <div className="comment-list__item--detail">
                                        <span className="comment-list__item--username">{comment.username}</span>
                                        <span>{comment.time}</span>
                                        <span>{props.isRecommend && `추천 ${comment.recommend}`}</span>
                                    </div>
                                    <div className="comment-list__item--contents">{comment.contents}</div>
                                    <div className="comment-list__item--button">
                                        <button>답글</button>
                                        {comment.isAuthor ? (
                                            <>
                                                <button>수정</button>
                                                <button>삭제</button>
                                            </>
                                        ) : (
                                            <button>신고</button>
                                        )}
                                        {props.isRecommend && (
                                            <span className="only-pc">
                                                <button>추천</button>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {props.isRecommend && (
                                <div className="not-pc">
                                    <button>
                                        <img
                                            className="comment-list__item__button--heart"
                                            src={comment.isRecommended ? heartFilled : heart}
                                            alt="heart"
                                        />
                                    </button>
                                </div>
                            )}
                        </div>
                        <div>
                            {comment.reCommentList &&
                                comment.reCommentList.map((reComment) => {
                                    return (
                                        <div
                                            key={reComment.id}
                                            className="comment-list__item comment-list__item--recomment"
                                        >
                                            <div className="comment-list__item--left">
                                                <div className="comment-list__item--recomment-mark" />
                                                <div className="not-pc">
                                                    <img
                                                        className="comment-list__item--user-default"
                                                        src={reComment.userImg ?? userDefault}
                                                        alt="userImg"
                                                    />
                                                </div>

                                                <div className="comment-list__item--main">
                                                    <div className="comment-list__item--detail">
                                                        <span className="comment-list__item--username">
                                                            {reComment.username}
                                                        </span>
                                                        <span>{reComment.time}</span>
                                                        <span>
                                                            {props.isRecommend && `추천 ${reComment.recommend}`}
                                                        </span>
                                                    </div>
                                                    <div className="comment-list__item--contents">
                                                        {reComment.contents}
                                                    </div>
                                                    <div className="comment-list__item--button">
                                                        <button>답글</button>
                                                        {reComment.isAuthor ? (
                                                            <>
                                                                <button>수정</button>
                                                                <button>삭제</button>
                                                            </>
                                                        ) : (
                                                            <button>신고</button>
                                                        )}
                                                        {props.isRecommend && (
                                                            <span className="only-pc">
                                                                <button>추천</button>
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                            {props.isRecommend && (
                                                <div className="not-pc">
                                                    <button>
                                                        <img
                                                            className="comment-list__item__button--heart"
                                                            src={reComment.isRecommended ? heartFilled : heart}
                                                            alt="heart"
                                                        />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CommentList;
