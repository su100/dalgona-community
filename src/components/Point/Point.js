import React, { Component } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Pagination from 'components/common/Pagination';
import PointList from 'components/common/PointList';
import star from 'images/star_filled.png';

import './Point.scss';

class Point extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'point',
        };
    }

    handlePage = (e) => {
        const { history } = this.props;
        const page = e.target.value;
        history.push(`/my/point?page=${page}`);
    };

    render() {
        const query = queryString.parse(location.search);
        const currentPage = query.page ? Number(query.page) : 1;
        const { myPoint, myPointCount } = this.props;
        console.log(myPointCount);
        console.log(myPoint);
        return (
            <div className="point">
                <div className="only-pc">
                    <div className="point__listtype">
                        <span> 별 내역</span>
                        <span>
                            현재 나의 별 <img src={star}></img>
                            {myPointCount}
                        </span>
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
                <section>
                    {Object.keys(myPoint).map((date) => {
                        return <PointList key={date} date={date} myPoint={myPoint[date]} />;
                    })}
                </section>
                <Pagination countList={myPointCount} currentPage={currentPage} handlePage={this.handlePage} />
            </div>
        );
    }
}

export default Point;
