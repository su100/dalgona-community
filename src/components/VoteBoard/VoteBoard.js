import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import moment from 'moment';
import Header from 'components/common/Header';
import Pagination from 'components/common/Pagination';
import BasicSlider from 'components/common/slider/BasicSlider';
import VoteItem from 'components/common/slider/VoteItem';
import Modal from 'components/common/Modal';

import refreshIcon from 'images/refresh.png';
import './VoteBoard.scss';

class VoteBoard extends Component {
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

    // searchType:title, searchWord, page
    if (query.search) {
      // url에서 searchWord있는지 판별
      history.push(`/issue/vote?page=${page}&search=${query.search}`);
    } else {
      history.push(`/issue/vote?page=${page}`);
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
      this.setState({ isAlert: true, modalMessage: '검색어를 입력해주세요.' });
    } else {
      history.push(`/issue/vote?page=1&search=${searchWord}`);
    }
  };

  closeModal = () => {
    // isAlert, modalMessage 초기화
    this.setState({ isAlert: false, modalMessage: '' });
  };

  render() {
    const { hotVoteList, voteCount, voteList, location } = this.props;
    const { searchWord, isAlert, modalMessage } = this.state;
    const query = queryString.parse(location.search);
    const currentPage = query.page ? Number(query.page) : 1;

    return (
      <div className="vote-board">
        <Header
          title="투표"
          searchWord={searchWord}
          handleChange={this.handleChange}
          placeholder="투표 제목을 검색하세요"
          getSearch={this.getSearch}
          boardType="issue"
          boardUrl="vote"
        />

        <section>
          <h4 className="only-pc">인기글</h4>
          <BasicSlider autoplay speed={5000} infinite background="#dadada">
            {hotVoteList.map((vote) => (
              <VoteItem key={vote.id} id={vote.id} title={vote.title} voteitem={vote.voteitem} />
            ))}
          </BasicSlider>
        </section>
        <section className="vote-board__container">
          <h4 className="not-pc">
            진행중인 투표
            <button>
              <img src={refreshIcon} alt="refresh" />
              <span>
                {moment().format('HH:mm')}
                {'업데이트'}
              </span>
            </button>
          </h4>
          {voteList.map((vote) => (
            <Link to={`/issue/vote/${vote.id}`} key={vote.id} className="vote-board__item">
              <div className="vote-board__item--left">
                <img src={vote.board_image} alt="vote" />
                <div className="vote-board__item--info">
                  <h6>{vote.title}</h6>
                  <div>
                    <span>
                      마감 D-
                      {vote.deadline}
                    </span>
                    <span>{moment(vote.created_at).format('HH:mm')}</span>
                    <span>
                      투표수
                      {vote.vote_count}
                    </span>
                  </div>
                  <p className="vote-board__item--content">{vote.content}</p>
                </div>
              </div>
              <div className="not-pc vote-board__item--reply">{vote.reply_count}</div>
            </Link>
          ))}
        </section>
        <Pagination countList={voteCount} currentPage={currentPage} handlePage={this.handlePage} />
        {isAlert && <Modal type="alert" message={modalMessage} closeModal={this.closeModal} />}
      </div>
    );
  }
}

export default VoteBoard;
