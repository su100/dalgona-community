import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from 'components/common/Header';
import BasicSlider from 'components/common/slider/BasicSlider';
import PostList from 'components/common/PostList';
import Pagination from 'components/common/Pagination';

import './FreeBoard.scss';

class FreeBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord: '',
            hotPostList: [
                {
                    id: 1,
                    title: '루나 그게 뭔데?',
                    board_url: {
                        board_url: 'for_luna',
                        board_name: 'test_luna',
                    },
                    views: 0,
                    recommend_count: 0,
                    created_at: '18:28',
                },
                {
                    id: 2,
                    title: '루나 그게 뭔데?',
                    board_url: {
                        board_url: 'for_luna',
                        board_name: 'test_luna',
                    },
                    views: 0,
                    recommend_count: 0,
                    created_at: '18:28',
                },
                {
                    id: 3,
                    title: '루나 그게 뭔데?',
                    board_url: {
                        board_url: 'for_luna',
                        board_name: 'test_luna',
                    },
                    views: 0,
                    recommend_count: 0,
                    created_at: '18:28',
                },
                {
                    id: 4,
                    title: '루나 그게 뭔데?',
                    board_url: {
                        board_url: 'for_luna',
                        board_name: 'test_luna',
                    },
                    views: 0,
                    recommend_count: 0,
                    created_at: '18:28',
                },
                {
                    id: 5,
                    title: '루나 그게 뭔데?',
                    board_url: {
                        board_url: 'for_luna',
                        board_name: 'test_luna',
                    },
                    views: 0,
                    recommend_count: 0,
                    created_at: '18:28',
                },
            ],
            page: 1,
            postCount: 23,
            postList: [
                {
                    reply_count: 2,
                    id: 10,
                    title: 'ads',
                    body: 'zzzzzzzzzzzzzzzzzzzzzzzzzzz',
                    views: 0,
                    board_url: '1',
                    category: '일상',
                    category_id: 1,
                    recommend_count: 0,
                    created_at: '18:28',
                },
                {
                    reply_count: 2,
                    id: 9,
                    title: 'ads',
                    body: 'zzzzzzzzzzzzzzzzzzzzzzzzzzz',
                    views: 0,
                    board_url: '1',
                    category: '일상',
                    category_id: 1,
                    recommend_count: 0,
                    created_at: '01:50',
                },
                {
                    reply_count: 2,
                    id: 8,
                    title:
                        '루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?루나 그게 뭔데?',
                    body: '제가 루나 만들어볼께요!',
                    views: 0,
                    board_url: '1',
                    category: '일상',
                    category_id: 1,
                    recommend_count: 0,
                    created_at: '01:48',
                },
                {
                    reply_count: 2,
                    id: 7,
                    title: '테스트 진행',
                    body: '테스트 진행 차 작성하는 포스트 내용입니다!',
                    views: 0,
                    board_url: '1',
                    category: '일상',
                    category_id: 1,
                    recommend_count: 0,
                    created_at: '01:38',
                },
                {
                    reply_count: 2,
                    id: 6,
                    title: '테스트 진행',
                    body: '테스트 진행 차 작성하는 포스트 내용입니다!',
                    views: 0,
                    board_url: '1',
                    category: '일상',
                    category_id: 1,
                    recommend_count: 0,
                    created_at: '01:38',
                },
                {
                    reply_count: 2,
                    id: 5,
                    title: '테스트 진행',
                    body: '테스트 진행 차 작성하는 포스트 내용입니다!',
                    views: 0,
                    board_url: '1',
                    category: '일상',
                    category_id: 1,
                    recommend_count: 0,
                    created_at: '01:36',
                },
                {
                    reply_count: 2,
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
                {
                    reply_count: 2,
                    id: 3,
                    title: '오늘 뭐하징?',
                    body: 'ㅈㄱㄴ',
                    views: 0,
                    board_url: '1',
                    category: '일상',
                    category_id: 1,
                    recommend_count: 0,
                    created_at: '02/03',
                },
                {
                    reply_count: 2,
                    id: 2,
                    title: '테스트 3차 진행',
                    body: '테스트 차원에서 내용 수정 다시 한 번 할께요!',
                    views: 0,
                    board_url: '1',
                    category: '일상',
                    category_id: 1,
                    recommend_count: 0,
                    created_at: '02/03',
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
            <div className="free-board">
                <Header
                    title="일상/잡담"
                    hasWrite
                    searchWord={this.state.searchWord}
                    handleChange={this.handleChange}
                    placeholder="글 제목을 검색하세요"
                    getSearch={this.getSearch}
                />
                <section className="free-board__container--hot">
                    <h4>인기글</h4>
                    <div className="only-pc">
                        <BasicSlider slidesToShow={3} arrows dots={false}>
                            {this.state.hotPostList.map((post) => {
                                const image = post.id % 2 == 0 ? '' : 'http://unsplash.it/300/300?image=122';
                                return (
                                    <Link
                                        to={`/free/board_url/${post.id}`}
                                        key={post.id}
                                        className="free-board__item--hot"
                                    >
                                        <div className="image">{image ? <img src={image} alt="post" /> : '더보기'}</div>
                                        <p>{post.title}</p>
                                        <span>조회수 {post.views}</span>
                                        <span>{post.created_at}</span>
                                        <span>추천 {post.recommend_count}</span>
                                    </Link>
                                );
                            })}
                        </BasicSlider>
                    </div>
                    <div className="not-pc">
                        <BasicSlider>
                            {this.state.hotPostList.map((post) => {
                                return <PostList key={post.id} postList={[post]} noBorder />;
                            })}
                        </BasicSlider>
                    </div>
                </section>
                <div className="border_line" />
                <PostList hasGrid postList={this.state.postList} />
                <section className="only-pc free-board__container--btn">
                    <Link to={`/free/board_url/write`}>글쓰기</Link>
                </section>
                <Pagination
                    countList={this.state.postCount}
                    handlePage={this.handlePage}
                    currentPage={this.state.page}
                />
            </div>
        );
    }
}

export default FreeBoard;
