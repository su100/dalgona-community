import React from 'react';
import { Link } from 'react-router-dom';
import { BOARD_DIVISION } from '../../../constants';
import './ActivityList.scss';

const ActivityList = ({ date, myPost }) => {
    return (
        <div className="activity-list">
            <div className="activity-list__date">{date}</div>
            {myPost.map((post) => {
                let result;
                let imageURL = '';
                try {
                    result = JSON.parse(post.body);
                    result.ops.some((element) => {
                        if (element.insert.image) {
                            imageURL = element.insert.image;
                            return true;
                        }
                    });
                } catch (e) {
                    result = post.body;
                }
                return (
                    <Link
                        to={`/${BOARD_DIVISION[post.board_list.division]}/${post.board_list.board_url}/${post.id}`}
                        key={post.id}
                    >
                        <div className="activity-list__activity">
                            {imageURL !== '' && (
                                <img src={imageURL} className="activity-list__activity-img" alt="post" />
                            )}
                            <div className="activity-list__activity-info">
                                <div className="activity-list__activity-info-title">{post.title}</div>
                                <div className="activity-list__activity-info-luna">{post.board_list.board_name}</div>
                            </div>
                            <div className="only-pc activity-list__activity-reply">댓글 {post.reply_count}</div>
                            <div className="not-pc activity-list__activity-reply mobile">{post.reply_count}</div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default ActivityList;
