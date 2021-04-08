import React, { Component } from 'react';
import queryString from 'query-string';
import ActivityList from 'components/common/ActivityList';
import Pagination from 'components/common/Pagination';
import './Activity.scss';

class Activity extends Component {
  handlePage = (e) => {
    const { history } = this.props;
    const page = e.target.value;
    history.push(`/my/activity?page=${page}`);
  };

  render() {
    const { myPostCount, myPost, location } = this.props;
    const query = queryString.parse(location.search);
    const currentPage = query.page ? Number(query.page) : 1;
    return (
      <div className="activity">
        <h4 className="activity__header">활동내역</h4>
        <section>
          {Object.keys(myPost).map((date) => (
            <ActivityList key={date} date={date} myPost={myPost[date]} />
          ))}
        </section>
        <Pagination countList={myPostCount} currentPage={currentPage} handlePage={this.handlePage} />
      </div>
    );
  }
}

export default Activity;
