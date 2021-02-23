import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PointList from 'components/common/PointList';
import star from 'images/star.png';

import './Point.scss';

class Point extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="point">
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
                <PointList />
                <PointList />
                <PointList />
            </div>
        );
    }
}

export default Point;
