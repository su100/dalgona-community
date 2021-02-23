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
                <div className="activity-list__activity-img"></div>
                <div className="activity-list__activity-title">글 제목을 써주세요.</div>
                <div className="activity-list__activity-luna">비투비</div>
                <div className="activity-list__activity-reply">댓글 30</div>
            </div>
            <div className="activity-list__activity">
                <div className="activity-list__activity-img"></div>
                <div className="activity-list__activity-title">글 제목을 써주세요.</div>
                <div className="activity-list__activity-luna">비투비</div>
                <div className="activity-list__activity-reply">댓글 30</div>
            </div>
            <div className="activity-list__activity">
                <div className="activity-list__activity-img"></div>
                <div className="activity-list__activity-title">글 제목을 써주세요.</div>
                <div className="activity-list__activity-luna">비투비</div>
                <div className="activity-list__activity-reply">댓글 30</div>
            </div>
        </div>
    );
};

export default ActivityList;
