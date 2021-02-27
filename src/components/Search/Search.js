import React, { Component } from 'react';
import Pagination from 'components/common/Pagination';
import SearchInput from 'components/common/SearchInput';
import './Search.scss';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            searchWord: '', //초기값 url에서 읽어서 넣기
            searchType: 'all', //초기값 url에서 읽어서 넣기
            searchCount: 28,
            searchList: [
                {
                    reply_count: 3,
                    id: 7,
                    title:
                        '테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행테스트 진행',
                    body: '테스트 진행 차 작성하는 포스트 내용입니다!',
                    views: 0,
                    board_url: '1',
                    category: '일상',
                    category_id: 1,
                    recommend_count: 0,
                    created_at: '02/12',
                },
                {
                    reply_count: 3,
                    id: 6,
                    title: '테스트 진행',
                    body: '테스트 진행 차 작성하는 포스트 내용입니다!',
                    views: 0,
                    board_url: '1',
                    category: '일상',
                    category_id: 1,
                    recommend_count: 0,
                    created_at: '02/12',
                },
                {
                    reply_count: 3,
                    id: 5,
                    title: '테스트 진행',
                    body: '테스트 진행 차 작성하는 포스트 내용입니다!',
                    views: 0,
                    board_url: '1',
                    category: '일상',
                    category_id: 1,
                    recommend_count: 0,
                    created_at: '02/12',
                },
                {
                    reply_count: 3,
                    id: 4,
                    title: '테스트 진행',
                    body: '테스트 진행 차 작성하는 포스트 내용입니다!',
                    views: 0,
                    board_url: '1',
                    category: '일상',
                    category_id: 1,
                    recommend_count: 0,
                    created_at: '02/11',
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
        //this.state.searchWord, SearchType으로 getList해오기
        console.log(this.state.searchType, '에서', this.state.searchWord, '검색');
    };

    render() {
        const { page, searchType, searchWord, searchCount } = this.state;
        return (
            <div className="search">
                <h3 className="only-pc">
                    <span>&apos;{searchWord}&apos;</span>에 대한 총 <span>{searchCount}건</span>의 검색결과
                </h3>
                <h4 className="not-pc">검색</h4>
                <div className="search__box">
                    <select id="searchType" value={searchType} onChange={this.handleChange}>
                        <option value="all">루나+자유+달고나</option>
                        <option value="luna">루나</option>
                        <option value="free">자유</option>
                        <option value="dalgona">달고나</option>
                    </select>
                    <SearchInput
                        searchWord={searchWord}
                        handleChange={this.handleChange}
                        placeholder="키워드"
                        getSearch={this.getSearch}
                    />
                </div>
                <div className="border_line" />
                <h5 className="not-pc">{searchCount}건</h5>
                <div className="search__container--postlist">
                    {this.state.searchList.map((post) => {
                        return (
                            <div key={post.id} className="search__item">
                                <div className="search__item--left">
                                    <img src="" alt="post" />
                                    <div className="search__item--info">
                                        <div className="search__item--title">{post.title}</div>
                                        <div className="not-pc">
                                            <span>
                                                조회수 {post.views} | {post.created_at} | 추천 {post.recommend_count}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="search__item--right">
                                    <div className="only-pc">
                                        <span>댓글 {post.reply_count}</span>
                                        <span>조회수 {post.views}</span>
                                        <span>{post.created_at}</span>
                                        <span>추천 {post.recommend_count}</span>
                                    </div>
                                    <div className="not-pc search__reply-count">{post.reply_count}</div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <Pagination countList={searchCount} currentPage={page} handlePage={this.handlePage} />
            </div>
        );
    }
}

export default Search;
