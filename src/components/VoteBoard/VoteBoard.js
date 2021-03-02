import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Header from 'components/common/Header';
import Pagination from 'components/common/Pagination';
import BasicSlider from 'components/common/slider/BasicSlider';
import VoteItem from 'components/common/slider/VoteItem';

import refreshIcon from 'images/refresh.png';
import './VoteBoard.scss';

class VoteBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord: '',
            hotVote: [
                {
                    id: 2,
                    title: '투표 제목',
                    voteitem: [
                        {
                            id: 8,
                            item_image: null,
                        },
                        {
                            id: 9,
                            item_image: null,
                        },
                    ],
                },
                {
                    id: 5,
                    title: '투표 제목2',
                    voteitem: [
                        {
                            id: 8,
                            item_image: null,
                        },
                        {
                            id: 9,
                            item_image: null,
                        },
                    ],
                },
            ],
            page: 1,
            voteCount: 8,
            voteList: [
                {
                    reply_count: 3,
                    id: 5,
                    title: '투표 게시판 테스트투표 게시판 테스트투표 게시판 테스트투표 게시판 테스트',
                    content:
                        '투표에 대한 설명입니다.투표에 대한 설명입니다.투표에 대한 설명입니다.투표에 대한 설명입니다.투표에 대한 설명입니다.투표에 대한 설명입니다.투표에 대한 설명입니다.투표에 대한 설명입니다.투표에 대한 설명입니다.투표에 대한 설명입니다.투표에 대한 설명입니다.투표에 대한 설명입니다.투표에 대한 설명입니다.',
                    board_image: 'http://127.0.0.1:8000/media/voteboard_image/Toystory05_FFLtXD2.jpg',
                    start_datetime: '2021-01-31T21:42:00',
                    end_datetime: '2021-02-05T21:42:00',
                    vote_count: 0,
                    is_voted: false,
                    deadline: 2,
                    created_at: '2021-02-03T02:55:12.218685',
                },
                {
                    reply_count: 3,
                    id: 2,
                    title: '두번째 투표',
                    content: '내용~~~~~~',
                    board_image: null,
                    start_datetime: '2021-01-18T21:42:00',
                    end_datetime: '2021-02-03T21:42:00',
                    vote_count: 1,
                    is_voted: true,
                    deadline: 0,
                    created_at: '2021-01-18T21:42:30.072607',
                },
                {
                    reply_count: 3,
                    id: 1,
                    title: '투표 게시판 테스트',
                    content: '투표에 대한 설명입니다.',
                    board_image: 'http://127.0.0.1:8000/media/voteboard_image/Toystory05_FFLtXD2.jpg',
                    start_datetime: '2021-01-31T21:42:00',
                    end_datetime: '2021-02-05T21:42:00',
                    vote_count: 0,
                    is_voted: false,
                    deadline: 2,
                    created_at: '2021-02-03T02:55:12.218685',
                },
                {
                    reply_count: 3,
                    id: 4,
                    title: '두번째 투표',
                    content: '내용~~~~~~',
                    board_image: null,
                    start_datetime: '2021-01-18T21:42:00',
                    end_datetime: '2021-02-03T21:42:00',
                    vote_count: 1,
                    is_voted: true,
                    deadline: 0,
                    created_at: '2021-01-18T21:42:30.072607',
                },
                {
                    reply_count: 3,
                    id: 14,
                    title: '두번째 투표',
                    content: '내용~~~~~~',
                    board_image: null,
                    start_datetime: '2021-01-18T21:42:00',
                    end_datetime: '2021-02-03T21:42:00',
                    vote_count: 1,
                    is_voted: true,
                    deadline: 0,
                    created_at: '2021-01-18T21:42:30.072607',
                },
                {
                    reply_count: 3,
                    id: 24,
                    title: '두번째 투표',
                    content: '내용~~~~~~',
                    board_image: null,
                    start_datetime: '2021-01-18T21:42:00',
                    end_datetime: '2021-02-03T21:42:00',
                    vote_count: 1,
                    is_voted: true,
                    deadline: 0,
                    created_at: '2021-01-18T21:42:30.072607',
                },
                {
                    reply_count: 3,
                    id: 44,
                    title: '두번째 투표',
                    content: '내용~~~~~~',
                    board_image: null,
                    start_datetime: '2021-01-18T21:42:00',
                    end_datetime: '2021-02-03T21:42:00',
                    vote_count: 1,
                    is_voted: true,
                    deadline: 0,
                    created_at: '2021-01-18T21:42:30.072607',
                },
                {
                    reply_count: 3,
                    id: 46,
                    title: '두번째 투표',
                    content: '내용~~~~~~',
                    board_image: null,
                    start_datetime: '2021-01-18T21:42:00',
                    end_datetime: '2021-02-03T21:42:00',
                    vote_count: 1,
                    is_voted: true,
                    deadline: 0,
                    created_at: '2021-01-18T21:42:30.072607',
                },
            ],
        };
    }

    handlePage = (e) => {
        this.setState({ page: e.target.value });
    };

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    getSearch = () => {
        //this.state.searchWord로 getList해오기
        console.log(this.state.searchWord, '검색');
    };

    render() {
        return (
            <div className="vote-board">
                <Header
                    title="투표"
                    searchWord={this.state.searchWord}
                    handleChange={this.handleChange}
                    placeholder="투표 제목을 검색하세요"
                    getSearch={this.getSearch}
                />

                <section>
                    <BasicSlider autoplay speed={5000} infinite background="#dadada">
                        {this.state.hotVote.map((vote) => {
                            return <VoteItem key={vote.id} id={vote.id} title={vote.title} voteitem={vote.voteitem} />;
                        })}
                    </BasicSlider>
                </section>
                <section className="vote-board__container">
                    <h4 className="not-pc">
                        진행중인 투표
                        <button>
                            <img src={refreshIcon} alt="refresh" />
                            <span>{moment().format('HH:mm')} 업데이트</span>
                        </button>
                    </h4>
                    {this.state.voteList.map((vote) => {
                        return (
                            <Link to={`/vote/${vote.id}`} key={vote.id} className="vote-board__item">
                                <div className="vote-board__item--left">
                                    <img src={vote.board_image} alt="vote" />
                                    <div className="vote-board__item--info">
                                        <h6>{vote.title}</h6>
                                        <div>
                                            <span>마감 D-{vote.deadline}</span>
                                            <span>{moment(vote.created_at).format('HH:mm')}</span>
                                            <span>투표수 {vote.vote_count}</span>
                                        </div>
                                        <p className="vote-board__item--content">{vote.content}</p>
                                    </div>
                                </div>
                                <div className="not-pc vote-board__item--reply">{vote.reply_count}</div>
                            </Link>
                        );
                    })}
                </section>
                <Pagination
                    countList={this.state.voteCount}
                    currentPage={this.state.page}
                    handlePage={this.handlePage}
                />
            </div>
        );
    }
}

export default VoteBoard;
