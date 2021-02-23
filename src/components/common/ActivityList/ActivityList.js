import React from 'react';
import { Link } from 'react-router-dom';
import './ActivityList.scss';

const ActivityList = (props) => {
    return (
        <div className="activity-list">
            <div className="activity-list__date">
                <span>01/31</span>
            </div>
            <div className="activity-list__activity">
                <div className="only-pc">
                    <div className="activity-list__activity-img"></div>
                </div>
                <div className="activity-list__activity-info">
                    <div className="activity-list__activity-info-title">글 제목을 써주세요.</div>
                    <div className="activity-list__activity-info-luna">비투비</div>
                </div>
                <div className="only-pc">
                    <div className="activity-list__activity-reply">댓글 30</div>
                </div>
                <div className="not-pc">
                    <div className="activity-list__activity-reply mobile">3</div>
                </div>
            </div>
        </div>
    );
};

export default ActivityList;
