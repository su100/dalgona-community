import React, { Component } from 'react';
import queryString from 'query-string';

import Header from 'components/common/Header';
import PostList from 'components/common/PostList';
import Pagination from 'components/common/Pagination';

import './NoticeBoard.scss';

class NoticeBoard extends Component {
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
            history.push(`/notice?page=${page}&search=${query.search}`);
        } else {
            history.push(`/notice?page=${page}`);
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
            this.props.history.push(`/notice?page=1&search=${searchWord}`);
        }
    };

    render() {
        const query = queryString.parse(location.search);
        const currentPage = query.page ? Number(query.page) : 1;
        const { postList, postCount } = this.props;
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
                <PostList postList={postList} />
                <Pagination countList={postCount} handlePage={this.handlePage} currentPage={currentPage} />
            </div>
        );
    }
}

export default NoticeBoard;
