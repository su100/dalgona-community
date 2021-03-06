import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
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
        };
    }

    handlePage = (e) => {
        const { history, location } = this.props;
        const query = queryString.parse(location.search);
        const page = e.target.value;

        //searchType:title, searchWord, page
        if (query.search) {
            //url에서 searchWord있는지 판별
            history.push(`/vote?page=${page}&search=${query.search}`);
        } else {
            history.push(`/vote?page=${page}`);
        }
    };

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    getSearch = () => {
        //검색하기
        const { searchWord } = this.state;
        if (searchWord.trim() === '') {
            alert('검색어를 입력해주세요.');
        } else {
            this.props.history.push(`/vote?page=1&search=${searchWord}`);
        }
    };

    render() {
        const query = queryString.parse(location.search);
        const currentPage = query.page ? Number(query.page) : 1;
        const { hotVoteList, voteCount, voteList } = this.props;

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
                        {hotVoteList.map((vote) => {
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
                    {voteList.map((vote) => {
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
                <Pagination countList={voteCount} currentPage={currentPage} handlePage={this.handlePage} />
            </div>
        );
    }
}

export default VoteBoard;
