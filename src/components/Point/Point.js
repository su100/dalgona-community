import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PointList from 'components/common/PointList';

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
                        <span>활동내역</span>
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
