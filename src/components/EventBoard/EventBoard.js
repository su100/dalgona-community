import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Header from 'components/common/Header';
import PostList from 'components/common/PostList';
import Pagination from 'components/common/Pagination';
import Modal from 'components/common/Modal';

import './EventBoard.scss';

class EventBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: '',
      isModal: false,
      modalType: '',
      modalMessage: '',
    };
  }

  handlePage = (e) => {
    const { history, location } = this.props;
    const query = queryString.parse(location.search);
    const page = e.target.value;

    // searchType:title, searchWord, page
    if (query.search) {
      // url에서 searchWord있는지 판별
      history.push(`/dalgona/event?page=${page}&search=${query.search}`);
    } else {
      history.push(`/dalgona/event?page=${page}`);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  // 검색하기
  getSearch = () => {
    const { history } = this.props;
    const { searchWord } = this.state;
    if (searchWord.trim() === '') {
      this.setState({ isModal: true, modalType: 'alert', modalMessage: '검색어를 입력해주세요.' });
    } else {
      history.push(`/dalgona/event?page=1&search=${searchWord}`);
    }
  };

  closeModal = () => {
    // isModal, modalMessage 초기화
    this.setState({ isModal: false, modalType: '', modalMessage: '' });
  };

  render() {
    const { postList, postCount, isSuperuser, location } = this.props;
    const { searchWord, isModal, modalType, modalMessage } = this.state;
    const request = location.search;
    const query = queryString.parse(request);
    const currentPage = query.page ? Number(query.page) : 1;
    return (
      <div className="event-board">
        {isSuperuser ? (
          <Header
            title="이벤트"
            searchWord={searchWord}
            handleChange={this.handleChange}
            placeholder="글 제목을 검색하세요"
            getSearch={this.getSearch}
            boardType="dalgona"
            boardUrl="event"
            hasWrite
          />
        ) : (
          <Header
            title="이벤트"
            searchWord={searchWord}
            handleChange={this.handleChange}
            placeholder="글 제목을 검색하세요"
            getSearch={this.getSearch}
            boardType="dalgona"
            boardUrl="event"
          />
        )}
        <div className="border_line" />
        <PostList hasReply link="/dalgona/event" postList={postList} request={request} />
        <section className="only-pc event-board__container--btn">
          {isSuperuser && <Link to="/dalgona/event/write">글쓰기</Link>}
        </section>
        <Pagination countList={postCount} handlePage={this.handlePage} currentPage={currentPage} />
        {isModal && <Modal type={modalType} message={modalMessage} closeModal={this.closeModal} />}
      </div>
    );
  }
}

export default EventBoard;
