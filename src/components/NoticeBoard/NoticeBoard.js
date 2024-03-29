import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';

import Header from 'components/common/Header';
import PostList from 'components/common/PostList';
import Pagination from 'components/common/Pagination';

import './NoticeBoard.scss';

class NoticeBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: '',
    };
  }

  handlePage = (e) => {
    const { history, location } = this.props;
    const query = queryString.parse(location.search);
    const page = e.target.value;

    // searchType:title, searchWord, page
    if (query.search) {
      // url에서 searchWord있는지 판별
      history.push(`/dalgona/notice?page=${page}&search=${query.search}`);
    } else {
      history.push(`/dalgona/notice?page=${page}`);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  getSearch = () => {
    // 검색하기
    const { history } = this.props;
    const { searchWord } = this.state;
    if (searchWord.trim() === '') {
      alert('검색어를 입력해주세요.');
    } else {
      history.push(`/dalgona/notice?page=1&search=${searchWord}`);
    }
  };

  render() {
    const { postList, postCount, isSuperuser, location } = this.props;
    const { searchWord } = this.state;
    const request = location.search;
    const query = queryString.parse(request);
    const currentPage = query.page ? Number(query.page) : 1;
    return (
      <div className="notice-board">
        {isSuperuser ? (
          <Header
            title="공지사항"
            searchWord={searchWord}
            handleChange={this.handleChange}
            placeholder="글 제목을 검색하세요"
            getSearch={this.getSearch}
            boardType="dalgona"
            boardUrl="notice"
            hasWrite
          />
        ) : (
          <Header
            title="공지사항"
            searchWord={searchWord}
            handleChange={this.handleChange}
            placeholder="글 제목을 검색하세요"
            boardType="dalgona"
            boardUrl="notice"
            getSearch={this.getSearch}
          />
        )}
        <div className="border_line" />
        <PostList link="/dalgona/notice" postList={postList} request={request} />
        <section className="only-pc notice-board__container--btn">
          {isSuperuser && <Link to="/dalgona/notice/write">글쓰기</Link>}
        </section>
        <Pagination countList={postCount} handlePage={this.handlePage} currentPage={currentPage} />
      </div>
    );
  }
}

export default NoticeBoard;
