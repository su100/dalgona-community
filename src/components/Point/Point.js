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
            type: 'get',
            page: 1,
        };
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        //주소 바뀔 때
        if (prevProps.location !== this.props.location) {
            return true;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot) {
            const { location } = this.props;
            const { type } = this.state;
            const query = queryString.parse(location.search);
            this.props.getMyPoint(type, query.page);
        }
    }
    handlePage = (e) => {
        const { history } = this.props;
        const page = e.target.value;
        this.setState({ page: page });
        history.push(`/my/point?page=${page}`);
    };
    handleSelect = (e) => {
        const type = e.currentTarget.id;
        const { page } = this.state;
        this.setState({ type: type });
        this.props.getMyPoint(type, page);
    };
    handleChange = (e) => {
        const { page } = this.state;
        this.setState({ [e.target.id]: e.target.value });
        this.props.getMyPoint(e.target.value, page);
    };

    render() {
        const query = queryString.parse(location.search);
        const currentPage = query.page ? Number(query.page) : 1;
        const { myPoint, myPointCount, myListCount } = this.props;
        const { type } = this.state;

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
                            <span>+{myPointCount}개</span>
                            <img src={star}></img>
                        </div>
                    </div>
                    <div className="point__select">
                        <button
                            className={type === 'get' ? 'point__select click' : undefined}
                            id="get"
                            onClick={this.handleSelect}
                        >
                            충전
                        </button>
                        <button
                            className={type === 'use' ? 'point__select click' : undefined}
                            id="use"
                            onClick={this.handleSelect}
                        >
                            사용
                        </button>
                        <button
                            className={type === 'lose' ? 'point__select click' : undefined}
                            id="lose"
                            onClick={this.handleSelect}
                        >
                            회수
                        </button>
                    </div>
                </div>
                <div className="only-pc">
                    <div className="point__select-pc">
                        <select id="type" value={type} onChange={this.handleChange}>
                            <option value="get">충전</option>
                            <option value="use">사용</option>
                            <option value="lose">회수</option>
                        </select>
                    </div>
                </div>
                <section>
                    {Object.keys(myPoint).map((date) => {
                        return <PointList key={date} date={date} myPoint={myPoint[date]} />;
                    })}
                </section>
                <Pagination countList={myListCount} currentPage={currentPage} handlePage={this.handlePage} />
            </div>
        );
    }
}

export default Point;
