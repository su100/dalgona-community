import React from 'react';
import star from 'images/star_filled.png';
import './PointList.scss';

const PointList = ({ date, myPoint }) => (
  <div className="point-list">
    <div className="point-list__date">
      <span>{date}</span>
    </div>
    {myPoint.map((point) => (
      <div key={point.id} className="point-list">
        <div className="point-list__activity">
          <div className="only-pc">
            <div className="point-list__activity-img" />
          </div>
          <div className="point-list__activity-info">
            <div className="point-list__activity-info-title">{point.information}</div>
            <div className="point-list__activity-info-luna">{point.kind}</div>
          </div>
          <div className="only-pc">
            <div className="point-list__activity-point">
              +
              <img src={star} alt="star" />
              {point.points}
            </div>
          </div>
          <div className="not-pc">
            <div className="point-list__activity-point mobile">
              <span className="pointcount">{`+${point.points}개`}</span>
              <img src={star} alt="star" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default PointList;
