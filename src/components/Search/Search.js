import React, { Component } from 'react';
import queryString from 'query-string';
import Pagination from 'components/common/Pagination';
import SearchBox from 'components/common/SearchBox';
import './Search.scss';

class Search extends Component {
    constructor(props) {
        super(props);
        const query = queryString.parse(location.search);
        this.state = {
            page: 1,
            searchWord: query.searchWord,
            searchDivision: query.searchDivision,
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
        this.props.history.push(
            `/search?searchWord=${this.state.searchWord}&searchDivision=${this.state.searchDivision}`
        );
    };

    getSnapshotBeforeUpdate(prevProps, prevState) {
        if (prevProps.location !== this.props.location) {
            return true;
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (snapshot) {
            //주소바뀜=>검색일어남
            const { location } = this.props;
            const query = queryString.parse(location.search);
            //검색어, 검색범위 변경 적용
            this.setState({ searchWord: query.searchWord, searchDivision: query.searchDivision });
        }
    }

    render() {
        const query = queryString.parse(location.search);
        const currentPage = query.page ? Number(query.page) : 1;
        const { searchDivision, searchWord } = this.state;
        const { searchCount, searchList } = this.props;
        return (
            <div className="search">
                <h3 className="only-pc">
                    <span>&apos;{query.searchWord}&apos;</span>에 대한 총 <span>{searchCount}건</span>의 검색결과
                </h3>
                <SearchBox
                    searchWord={searchWord}
                    searchDivision={searchDivision}
                    handleChange={this.handleChange}
                    placeholder="키워드"
                    getSearch={this.getSearch}
                />
                <div className="border_line" />
                <h5 className="not-pc">{searchCount}건</h5>
                <div className="search__container--postlist">
                    {searchList.map((post) => {
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
                <Pagination countList={searchCount} currentPage={currentPage} handlePage={this.handlePage} />
            </div>
        );
    }
}

export default Search;
