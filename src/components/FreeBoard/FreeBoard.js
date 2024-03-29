import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Header from 'components/common/Header';
import BoardHotList from 'components/common/BoardHotList';
import BasicSlider from 'components/common/slider/BasicSlider';
import PostList from 'components/common/PostList';
import Pagination from 'components/common/Pagination';
import Modal from 'components/common/Modal';

import './FreeBoard.scss';

class FreeBoard extends Component {
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
    const { pathname } = location;
    // searchType:title, searchWord, page
    if (query.search) {
      // url에서 searchWord있는지 판별
      history.push(`${pathname}?page=${page}&search=${query.search}`);
    } else {
      history.push(`${pathname}?page=${page}`);
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  getSearch = () => {
    // 검색하기
    const { searchWord } = this.state;
    const { history, location } = this.props;
    const { pathname } = location;
    if (searchWord.trim() === '') {
      this.setState({ isModal: true, modalType: 'alert', modalMessage: '검색어를 입력해주세요.' });
    } else {
      history.push(`${pathname}?page=1&search=${searchWord}`);
    }
  };

  updateBookmark = () => {
    // 로그인 여부 확인
    const { isAuthenticated, updateBookmark, history } = this.props;
    if (isAuthenticated) {
      // 로그인 되어있음
      updateBookmark();
    } else {
      this.setState({
        isModal: true,
        modalType: 'confirm',
        modalMessage: '로그인이 필요합니다.',
        confirmFunction: () => history.push('/login'),
      });
    }
  };

  closeModal = () => {
    // isModal, modalType, modalMessage 초기화
    this.setState({ isModal: false, modalType: '', modalMessage: '' });
  };

  confirmModal = () => {
    const { confirmFunction } = this.state;
    confirmFunction();
    this.closeModal();
  };

  render() {
    const { boardInfo, bookmarkList, bestPostList, postCount, postList, location } = this.props;
    const { searchWord, isModal, modalType, modalMessage } = this.state;
    const request = location.search;
    const query = queryString.parse(request);
    const currentPage = query.page ? Number(query.page) : 1;
    const isBookmarked = bookmarkList.some((board) => board.board_url === boardInfo.board_url);
    return (
      <div className="free-board">
        <Header
          boardType="free"
          boardUrl={boardInfo.board_url}
          title={boardInfo.board_name}
          hasWrite
          hasBookmark
          isBookmarked={isBookmarked}
          updateBookmark={this.updateBookmark}
          searchWord={searchWord}
          handleChange={this.handleChange}
          placeholder="글 제목을 검색하세요"
          getSearch={this.getSearch}
        />
        <section className="free-board__container--hot">
          <h4>인기글</h4>
          <div className="only-pc">
            <BoardHotList link={`/free/${boardInfo.board_url}`} hotPostList={bestPostList} />
          </div>
          <div className="not-pc">
            <BasicSlider>
              {bestPostList.map((post) => (
                <PostList
                  link={`/free/${boardInfo.board_url}`}
                  key={post.id}
                  postList={[post]}
                  noBorder
                  request={request}
                />
              ))}
            </BasicSlider>
          </div>
        </section>
        <div className="border_line" />
        <PostList hasReply link={`/free/${boardInfo.board_url}`} hasGrid postList={postList} request={request} />
        <section className="only-pc free-board__container--btn">
          <Link to={`/free/${boardInfo.board_url}/write`}>글쓰기</Link>
        </section>
        <Pagination countList={postCount} handlePage={this.handlePage} currentPage={currentPage} />
        {isModal && (
          <Modal
            type={modalType}
            message={modalMessage}
            closeModal={this.closeModal}
            confirmModal={this.confirmModal}
          />
        )}
      </div>
    );
  }
}

export default FreeBoard;
