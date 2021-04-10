import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import Pagination from 'components/common/Pagination';
import SearchBox from 'components/common/SearchBox';
import './Search.scss';

class Search extends Component {
  constructor(props) {
    super(props);
    const { location } = this.props;
    const query = queryString.parse(location.search);
    this.state = {
      searchWord: query.searchWord,
      searchDivision: query.searchDivision,
    };
  }

  handlePage = (e) => {
    const { history, location } = this.props;
    const query = queryString.parse(location.search);
    const page = e.target.value;

    history.push(`/search?page=${page}&searchWord=${query.searchWord}&searchDivision=${query.searchDivision}`);
  };

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  getSearch = () => {
    const { history } = this.props;
    const { searchWord, searchDivision } = this.state;
    history.push(`/search?searchWord=${searchWord}&searchDivision=${searchDivision}`);
  };

  render() {
    const { searchCount, searchList, location } = this.props;
    const query = queryString.parse(location.search);
    const currentPage = query.page ? Number(query.page) : 1;
    const { searchDivision, searchWord } = this.state;
    return (
      <div className="search">
        <h3 className="only-pc">
          <span>
            &apos;
            {query.searchWord}
            &apos;
          </span>
          에 대한 총
          <span>
            {searchCount}
            {'건'}
          </span>
          의 검색결과
        </h3>
        <SearchBox
          searchWord={searchWord}
          searchDivision={searchDivision}
          handleChange={this.handleChange}
          placeholder="키워드"
          getSearch={this.getSearch}
        />
        <div className="border_line" />
        <h5 className="not-pc">
          {searchCount}
          {'건'}
        </h5>
        <div className="search__container--postlist">
          {searchList.map((post) => {
            let result;
            let imageURL = '';
            let path = '';
            if (post.board_url.division === 1) {
              path = 'free';
            } else if (post.board_url.division === 2) {
              path = 'luna';
            } else {
              path = 'dalgona';
            }
            try {
              result = JSON.parse(post.body);
              result.ops.some((element) => {
                if (element.insert.image) {
                  imageURL = element.insert.image;
                  return true;
                }
                return false;
              });
            } catch (e) {
              result = post.body;
            }
            return (
              <Link to={`/${path}/${post.board_url.board_url}/${post.id}`} key={post.id} className="search__item">
                <div className="search__item--left">
                  {imageURL !== '' && <img src={imageURL} alt="post" />}
                  <div className="search__item--info">
                    <div className="search__item--title">{post.title}</div>
                    <div className="not-pc">
                      <span>
                        {'조회수'}
                        {post.views}
                        {'|'}
                        {post.created_at}
                        {'|'}
                        {'추천'}
                        {post.recommend_count}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="search__item--right">
                  <div className="only-pc">
                    <span>
                      댓글
                      {post.reply_count}
                    </span>
                    <span>
                      조회수
                      {post.views}
                    </span>
                    <span>{post.created_at}</span>
                    <span>
                      추천
                      {post.recommend_count}
                    </span>
                  </div>
                  <div className="not-pc search__reply-count">{post.reply_count}</div>
                </div>
              </Link>
            );
          })}
        </div>
        <Pagination countList={searchCount} currentPage={currentPage} handlePage={this.handlePage} />
      </div>
    );
  }
}

export default Search;
