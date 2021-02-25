import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import EditProfile from 'components/common/EditProfile';
import ActivityList from 'components/common/ActivityList';
import PointList from 'components/common/PointList';
import star from 'images/star.png';

import './Point.scss';

class Point extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'point',
        };
    }
    handleType = (e) => {
        this.setState({ type: e.target.id });
    };

    render() {
        const { type } = this.state;
        return (
            <div className="point">
                <div className="only-pc">
                    <EditProfile />
                    <div className="activity__listtype">
                        <button
                            className={type === 'activity' ? 'profile__listtype click' : undefined}
                            onClick={this.handleType}
                            id="activity"
                        >
                            활동내역
                        </button>
                        <button
                            className={type === 'point' ? 'profile__listtype click' : undefined}
                            onClick={this.handleType}
                            id="point"
                        >
                            별 내역
                        </button>
                    </div>
                </div>
                <div className="not-pc">
                    <div className="point__header">
                        <span>별내역</span>
                    </div>
                    <div className="point__mypoint">
                        <span>현재 나의 별</span>
                        <div className="point__mypoint-star">
                            <span>+6개</span>
                            <img src={star}></img>
                        </div>
                    </div>
                    <div className="point__select">
                        <button>충전</button>
                        <button>사용</button>
                        <button>회수</button>
                    </div>
                </div>
                {type === 'activity' && <ActivityList />}
                {type === 'point' && <PointList />}
            </div>
        );
    }
}

export default Point;
