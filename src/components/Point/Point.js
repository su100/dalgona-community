import React, { Component } from 'react';
import queryString from 'query-string';
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

  componentDidMount() {
    const { getMyPoint } = this.props;
    const { location } = this.props;
    const { type } = this.state;
    const query = queryString.parse(location.search);
    getMyPoint(type, query.page);
  }

  getSnapshotBeforeUpdate(prevProps) {
    // 주소 바뀔 때
    const { location } = this.props;
    if (prevProps.location !== location) {
      return true;
    }
    return null;
  }

  handlePage = (e) => {
    const { history } = this.props;
    const page = e.target.value;
    this.setState({ page });
    history.push(`/my/point?page=${page}`);
  };

  handleSelect = (e) => {
    const { getMyPoint } = this.props;
    const { page } = this.state;
    const type = e.currentTarget.id;
    this.setState({ type });
    getMyPoint(type, page);
  };

  handleChange = (e) => {
    const { getMyPoint } = this.props;
    const { page } = this.state;
    this.setState({ [e.target.id]: e.target.value });
    getMyPoint(e.target.value, page);
  };

  render() {
    const { myPoint, myPointCount, myListCount, location } = this.props;
    const { type } = this.state;
    const query = queryString.parse(location.search);
    const currentPage = query.page ? Number(query.page) : 1;

    return (
      <div className="point">
        <div className="only-pc">
          <div className="point__listtype">
            <span> 별 내역</span>
            <span>
              현재 나의 별
              <img src={star} alt=" " />
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
              <span>
                <span>+</span>
                {myPointCount}
                개
                <img src={star} alt=" " />
              </span>
            </div>
          </div>
          <div className="point__select">
            <button
              type="button"
              className={type === 'get' ? 'point__select click' : undefined}
              id="get"
              onClick={this.handleSelect}
            >
              충전
            </button>
            <button
              type="button"
              className={type === 'use' ? 'point__select click' : undefined}
              id="use"
              onClick={this.handleSelect}
            >
              사용
            </button>
            <button
              type="button"
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
          {Object.keys(myPoint).map((date) => (
            <PointList key={date} date={date} myPoint={myPoint[date]} pointType={type} />
          ))}
        </section>
        <Pagination countList={myListCount} currentPage={currentPage} handlePage={this.handlePage} />
      </div>
    );
  }
}

export default Point;
