import React, { Component } from 'react';

import Header from 'components/common/Header';
import PostList from 'components/common/PostList';
import Pagination from 'components/common/Pagination';

import './NoticeBoard.scss';

class NoticeBoard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            searchWord: '',
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
            <div className="notice-board">
                <Header
                    title="공지사항"
                    searchWord={this.state.searchWord}
                    handleChange={this.handleChange}
                    placeholder="글 제목을 검색하세요"
                    getSearch={this.getSearch}
                />
                <div className="border_line" />
                <PostList link={`notice`} postList={this.state.postList} />
                <Pagination
                    countList={this.state.postCount}
                    handlePage={this.handlePage}
                    currentPage={this.state.page}
                />
            </div>
        );
    }
}

export default NoticeBoard;
