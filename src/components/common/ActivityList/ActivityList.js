import React from 'react';
import { Link } from 'react-router-dom';
import './ActivityList.scss';

const ActivityList = ({ date, myPost }) => {
    return (
        <div className="activity-list">
            <div className="activity-list__date">{date}</div>
            {myPost.map((post) => {
                return (
                    <div key={post.id} className="activity-list__activity">
                        <div className="only-pc">{post.img && <div className="activity-list__activity-img"></div>}</div>
                        <div className="activity-list__activity-info">
                            <div className="activity-list__activity-info-title">{post.title}</div>
                            <div className="activity-list__activity-info-luna">{post.board_list.board_name}</div>
                        </div>
                        <div className="only-pc activity-list__activity-reply">댓글 {post.reply_count}</div>
                        <div className="not-pc activity-list__activity-reply mobile">{post.reply_count}</div>
                    </div>
                );
            })}
        </div>
    );
};

export default ActivityList;
