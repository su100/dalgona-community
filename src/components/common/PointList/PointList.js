import React from 'react';
import { Link } from 'react-router-dom';
import star from 'images/star.png';
import './PointList.scss';

const PointList = (props) => {
    return (
        <div className="point-list">
            <div className="point-list__date">
                <span>2021.1.31</span>
            </div>
            <div className="point-list__activity">
                <div className="only-pc">
                    <div className="point-list__activity-img"></div>
                </div>
                <div className="point-list__activity-info">
                    <div className="point-list__activity-info-title">댓글보상</div>
                    <div className="point-list__activity-info-luna">비투비</div>
                </div>
                <div className="only-pc">
                    <div className="point-list__activity-point">+ 1</div>
                </div>
                <div className="not-pc">
                    <div className="point-list__activity-point mobile">
                        <span>+ 6개</span>
                        <img src={star}></img>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PointList;
