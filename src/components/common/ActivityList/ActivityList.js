import React from 'react';
import { Link } from 'react-router-dom';
import './ActivityList.scss';

const ActivityList = (props) => {
    return props.myPost.map((post) => {
        return (
            <div key={post.id} className="activity-list">
                <div className="activity-list__date">
                    <span>{post.created_at}</span>
                </div>
                <div className="activity-list__activity">
                    <div className="only-pc">
                        <div className="activity-list__activity-img"></div>
                    </div>
                    <div className="activity-list__activity-info">
                        <div className="activity-list__activity-info-title">{post.title}</div>
                        <div className="activity-list__activity-info-luna">{post.board_list.board_name}</div>
                    </div>
                    <div className="only-pc">
                        <div className="activity-list__activity-reply">댓글 {post.reply_count}</div>
                    </div>
                    <div className="not-pc">
                        <div className="activity-list__activity-reply mobile">{post.reply_count}</div>
                    </div>
                </div>
            </div>
        );
    });
};

export default ActivityList;
