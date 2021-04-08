import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';
import ArticleList from 'components/common/ArticleList';
import BasicSlider from 'components/common/slider/BasicSlider';
import HotPostCard from 'components/common/HotPostCard';
import VoteItem from 'components/common/slider/VoteItem';
import refreshIcon from 'images/refresh.png';
import './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateHotVoteList: [
        {
          title: '당신의 루나에게 투표하세요!',
          voteitem: [
            {
              id: 0,
              item_image: null,
            },
            {
              id: 1,
              item_image: null,
            },
          ],
        },
      ],
      hotboardType: '', // 'luna' 'free'
      newsTime: moment().format('HH:mm'),
    };
  }

  setBoardType = (e) => {
    // HOT 실시간 인기글 type 설정: 전체(), 루나(luna), 자유(free)
    this.setState({ hotboardType: e.target.id }, this.getHotPostList);
  };

  getHotPostList = () => {
    // HOT 실시간 인기글 목록 가져오기
    const { getHotPostList } = this.props;
    const { hotboardType } = this.state;
    getHotPostList(hotboardType);
  };

  hotPostRender = (postList) => {
    const rows = [];
    // 3개씩 한줄에 넣기
    if (postList.length < 3) {
      const cols = [];
      for (let col = 0; col < postList.length; col++) {
        const post = postList[col];
        let result;
        let imageURL = '';
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
        cols.push(
          <Link
            className="home__item--hotpost"
            to={`/${post.board_url.division === 2 ? 'luna' : 'free'}/${post.board_url.board_url}/${post.id}`}
            key={post.id}
          >
            {imageURL === '' ? (
              <div className="home__item--hotpost--text">
                <p>{post.title}</p>
              </div>
            ) : (
              <img src={imageURL} alt="post" />
            )}
          </Link>
        );
      }
      rows.push(
        <div className="home__row--hotpost" key="1">
          {cols}
        </div>
      );
    } else {
      for (let row = 0; row < 2; row++) {
        const cols = [];
        for (let col = 0; row * 3 + col < postList.length && col < 3; col++) {
          const post = postList[row * 3 + col];
          let result;
          let imageURL = '';
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
          cols.push(
            <Link
              className="home__item--hotpost"
              to={`/${post.board_url.division === 2 ? 'luna' : 'free'}/${post.board_url.board_url}/${post.id}`}
              key={post.id}
            >
              {imageURL === '' ? (
                <div className="home__item--hotpost--text">
                  <p>{post.title}</p>
                </div>
              ) : (
                <img src={imageURL} alt="post" />
              )}
            </Link>
          );
        }
        rows.push(
          <div key={row} className="home__row--hotpost">
            {cols}
          </div>
        );
      }
    }

    return rows;
  };

  updateNews = () => {
    // 실시간 연예뉴스 업데이트: 업데이트 시간 기록, 목록 가져오기
    const { getNewsList } = this.props;
    this.setState({ newsTime: moment().format('HH:mm') }, getNewsList);
  };

  newsRender = (newsList) => {
    const result = [];
    const tmp = newsList.slice();
    // 5개 단위로 나누기
    const count = Math.ceil(tmp.length / 5);
    for (let i = 0; i < count; i++) {
      const article = tmp.splice(0, 5);
      result.push(<ArticleList key={i} articleList={article} />);
    }
    return result;
  };

  render() {
    const { bookmarkList, hotPostList, newsList, hotVoteList } = this.props;
    const { stateHotVoteList, hotboardType, newsTime } = this.state;
    let hotVote = '';
    if (hotVoteList.length > 0) {
      hotVote = hotVoteList;
    } else {
      hotVote = stateHotVoteList;
    }
    return (
      <div className="home">
        <BasicSlider autoplay speed={5000} infinite background="#dadada">
          {hotVote.map((vote) => (
            <VoteItem key={vote.title} id={vote.id} title={vote.title} voteitem={vote.voteitem} />
          ))}
        </BasicSlider>
        <section className="home__section--favboard">
          <h4>즐겨찾는 게시판</h4>
          {bookmarkList.length > 0 ? (
            bookmarkList.map((board) => (
              <Link to={`/${board.division === 2 ? 'luna' : 'free'}/${board.board_url}`} key={board.board_url}>
                {board.board_name}
              </Link>
            ))
          ) : (
            <p>게시판 상단의 ☆을 눌러 즐겨찾는 게시판으로 설정해보세요!</p>
          )}
        </section>
        <div className="border_line not-pc" />
        <section className="home__section--hot">
          <div className="home__row--hot">
            <h4>HOT 실시간 인기글</h4>
            <div className="home__box--hot-type">
              <button type="button" id="" onClick={this.setBoardType} className={hotboardType === '' ? 'active' : ''}>
                전체
              </button>
              <button
                type="button"
                id="luna"
                onClick={this.setBoardType}
                className={hotboardType === 'luna' ? 'active' : ''}
              >
                루나
              </button>
              <button
                type="button"
                id="free"
                onClick={this.setBoardType}
                className={hotboardType === 'free' ? 'active' : ''}
              >
                자유
              </button>
            </div>
          </div>
          <div className="only-pc">
            <div className="home__container--hot">
              {hotPostList.length > 0 &&
                hotPostList.map((post, index) => <HotPostCard key={post.id} index={index} post={post} />)}
            </div>
          </div>
          <div className="not-pc">
            <div className="home__container--hot">{this.hotPostRender(hotPostList)}</div>
          </div>
        </section>
        <div className="border_line not-pc" />
        <section className="home__section--news">
          <div className="home__row--news">
            <h4>
              실시간 연예뉴스
              <span className="not-pc">
                <button type="button" onClick={this.updateNews}>
                  <img src={refreshIcon} alt="refresh" />
                  {newsTime}
                  업데이트
                </button>
              </span>
            </h4>
            <div>
              <span className="only-pc">
                <button type="button" onClick={this.updateNews}>
                  <img src={refreshIcon} alt="refresh" />
                  {newsTime}
                  업데이트
                </button>
              </span>
              <span>
                <Link to="/article">더보기 &gt;</Link>
              </span>
            </div>
          </div>
          <div className="only-pc">
            <ArticleList key="pc" articleList={newsList} />
          </div>
        </section>
        <div className="not-pc home__slider--news">
          <BasicSlider>{this.newsRender(newsList)}</BasicSlider>
        </div>
      </div>
    );
  }
}

export default Home;
