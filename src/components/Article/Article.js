import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Header from 'components/common/Header';
import ArticleList from 'components/common/ArticleList';
import Pagination from 'components/common/Pagination';
import './Article.scss';

class Article extends Component {
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
            history.push(`/article?page=${page}&search=${query.search}`);
        } else {
            history.push(`/article?page=${page}`);
        }
    };

    handleChange = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    };

    searchKeyword = (e) => {
        const word = e.target.value;
        this.setState({ searchWord: word });
        this.props.history.push(`/article?page=1&search=${word}`);
    };

    getSearch = () => {
        //검색하기
        this.props.history.push(`/article?page=1&search=${this.state.searchWord}`);
    };

    render() {
        const query = queryString.parse(location.search);
        const currentPage = query.page ? Number(query.page) : 1;
        const { newsCount, newsList, newsKeyword } = this.props;
        return (
            <div className="article">
                <Header
                    title="기사"
                    placeholder="기사 제목을 검색하세요"
                    searchWord={this.state.searchWord}
                    handleChange={this.handleChange}
                    getSearch={this.getSearch}
                />
                <div className="border_line" />
                <div className="article__keyword">
                    <Link to="/article">
                        <h4>인기키워드</h4>
                    </Link>
                    {newsKeyword.map((keyword, index) => {
                        return (
                            <button
                                key={index}
                                className="article__keyword--item"
                                value={keyword.word}
                                onClick={this.searchKeyword}
                            >
                                #{keyword.word}
                            </button>
                        );
                    })}
                </div>
                <div className="border_line" />
                <div className="article__container">
                    <ArticleList articleList={newsList} />
                </div>
                <Pagination countList={newsCount} handlePage={this.handlePage} currentPage={currentPage} />
            </div>
        );
    }
}

export default Article;
