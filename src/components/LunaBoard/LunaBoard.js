import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Header from 'components/common/Header';
import BoardHotList from 'components/common/BoardHotList';
import BasicSlider from 'components/common/slider/BasicSlider';
import PostList from 'components/common/PostList';
import Pagination from 'components/common/Pagination';
import Modal from 'components/common/Modal';
import './LunaBoard.scss';

class LunaBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: '',
      isAlert: false,
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
    const { location, history } = this.props;
    const { searchWord } = this.state;
    const { pathname } = location;
    if (searchWord.trim() === '') {
      this.setState({ isAlert: true, modalMessage: '검색어를 입력해주세요.' });
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
    } else if (window.confirm('로그인이 필요합니다.')) {
      // 로그인 안 됨
      history.push('/login');
    }
  };

  closeModal = () => {
    // isAlert, modalMessage 초기화
    this.setState({ isAlert: false, modalMessage: '' });
  };

  render() {
    const { boardInfo, bookmarkList, bestPostList, postCount, postList, location } = this.props;
    const { searchWord, isAlert, modalMessage } = this.state;
    const request = location.search;
    const query = queryString.parse(request);
    const currentPage = query.page ? Number(query.page) : 1;
    const isBookmarked = bookmarkList.some((board) => board.board_url === boardInfo.board_url);

    return (
      <div className="luna-board">
        <Header
          boardType="luna"
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
        <section className="luna-board__container--hot">
          <h4>인기글</h4>
          <div className="only-pc">
            <BoardHotList link={`/luna/${boardInfo.board_url}`} hotPostList={bestPostList} />
          </div>
          <div className="not-pc">
            <BasicSlider>
              {bestPostList.map((post) => (
                <PostList
                  link={`/luna/${boardInfo.board_url}`}
                  key={post.id}
                  postList={[post]}
                  request={request}
                  noBorder
                />
              ))}
            </BasicSlider>
          </div>
        </section>
        <div className="border_line" />
        <PostList hasReply link={`/luna/${boardInfo.board_url}`} hasGrid postList={postList} request={request} />
        <section className="only-pc luna-board__container--btn">
          <Link to={`/luna/${boardInfo.board_url}/write`}>글쓰기</Link>
        </section>
        <Pagination countList={postCount} handlePage={this.handlePage} currentPage={currentPage} />
        {isAlert && <Modal type="alert" message={modalMessage} closeModal={this.closeModal} />}
      </div>
    );
  }
}

export default LunaBoard;
