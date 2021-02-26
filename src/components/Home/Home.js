import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/ko';
import BasicSlider from 'components/common/slider/BasicSlider';
import VoteItem from 'components/common/slider/VoteItem';
import refreshIcon from 'images/refresh.png';
import './Home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            favBoard: [
                { board_name: '아이유', board_url: '/iu' },
                { board_name: '청하', board_url: '/ch' },
                { board_name: '비투비', board_url: '/bt' },
            ],
            voteList: [
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
            hotboardType: 'all', //'luna' 'free'
            hotPostList: [
                {
                    id: 2,
                    title: '첫글',
                    board_url: {
                        board_url: 'test',
                        board_name: 'test_board',
                    },
                    views: 11,
                    created_at: '08:13',
                    recommend_count: 2,
                    body: '',
                },
                {
                    id: 4,
                    title: '글제목2',
                    board_url: {
                        board_url: 'test',
                        board_name: 'test_board',
                    },
                    views: 11,
                    created_at: '08:13',
                    recommend_count: 2,
                    body: '',
                },
                {
                    id: 5,
                    title: '3',
                    board_url: {
                        board_url: 'test',
                        board_name: 'test_board',
                    },
                    views: 11,
                    created_at: '08:13',
                    recommend_count: 2,
                    body: '',
                },
                {
                    id: 6,
                    title: '4',
                    board_url: {
                        board_url: 'test',
                        board_name: 'test_board',
                    },
                    views: 11,
                    created_at: '08:13',
                    recommend_count: 2,
                    body: '',
                },
                {
                    id: 7,
                    title: '글제목5',
                    board_url: {
                        board_url: 'test',
                        board_name: 'test_board',
                    },
                    views: 11,
                    created_at: '08:13',
                    recommend_count: 2,
                    body: '',
                },
                {
                    id: 8,
                    title: '글제목6',
                    board_url: {
                        board_url: 'test',
                        board_name: 'test_board',
                    },
                    views: 11,
                    created_at: '08:13',
                    recommend_count: 2,
                    body: '',
                },
            ],
            newsCount: 10,
            newsList: [
                {
                    title: '‘딸바보’ 박남정, 딸 박시은 아이돌 데뷔 반대했었다',
                    link: 'https://www.donga.com/news/Culture/article/all/20210203/105268143/1',
                    image: 'http://127.0.0.1:8000/media/news_image/donga2021-02-03-20-441.jpg',
                    date: '2021-02-03T20:29:00',
                },
                {
                    title: '‘딸바보’ 박남정, 딸 박시은 아이돌 데뷔 반대했었다',
                    link: 'https://www.donga.com/news/Culture/article/all/20210203/105268143/1',
                    image: 'http://127.0.0.1:8000/media/news_image/donga2021-02-03-20-441.jpg',
                    date: '2021-02-03T20:29:00',
                },
                {
                    title: '존박, 코로나19 완치 퇴원…“의료진 수고 덕분”',
                    link: 'https://www.donga.com/news/Entertainment/article/all/20210203/105265070/1',
                    image: 'http://127.0.0.1:8000/media/news_image/donga2021-02-03-20-442.jpg',
                    date: '2021-02-03T17:09:00',
                },
                {
                    title: '엘키, CLC 탈퇴…소속사와도 전속계약 해지',
                    link: 'https://www.yna.co.kr/view/AKR20210203149400005?section=entertainment/pop-song',
                    image: 'http://127.0.0.1:8000/media/news_image/yna2021-02-03-20-441.jpg',
                    date: '2021-02-03T17:01:00',
                },
                {
                    title: "밴드 새소년, 신곡 '자유'…유아인 티저영상 특별 출연",
                    link: 'https://www.yna.co.kr/view/AKR20210203145400005?section=entertainment/pop-song',
                    image: 'http://127.0.0.1:8000/media/news_image/yna2021-02-03-20-442.jpg',
                    date: '2021-02-03T16:51:00',
                },
                {
                    title: '채널A, 세계 부호 1위 일론 머스크 집중 조명 다큐 방영',
                    link: 'https://www.donga.com/news/Inter/article/all/20210203/105264158/2',
                    image: 'http://127.0.0.1:8000/media/news_image/donga2021-02-03-20-443.jpg',
                    date: '2021-02-03T16:40:00',
                },
                {
                    title: '래퍼 칠린호미, 공황장애 치료 위해 입원',
                    link: 'https://www.yna.co.kr/view/AKR20210203138900005?section=entertainment/pop-song',
                    image: 'http://127.0.0.1:8000/media/news_image/yna2021-02-03-20-443.jpg',
                    date: '2021-02-03T16:26:00',
                },
                {
                    title: '래퍼 칠린호미, 공황·불안장애 치료 위해 입원',
                    link: 'https://www.donga.com/news/Culture/article/all/20210203/105262469/1',
                    image: 'http://127.0.0.1:8000/media/news_image/donga2021-02-03-20-444.jpg',
                    date: '2021-02-03T15:45:00',
                },
                {
                    title: '김수민 아나운서, ‘TV 동물농장’ MC 합류',
                    link: 'https://www.donga.com/news/Culture/article/all/20210203/105260070/1',
                    image: 'http://127.0.0.1:8000/media/news_image/donga2021-02-03-20-445.jpg',
                    date: '2021-02-03T14:26:00',
                },
                {
                    title: "'와치 미' 부른 미국 래퍼 사일렌토, 사촌 살해 혐의로 체포",
                    link: 'https://www.yna.co.kr/view/AKR20210203101400005?section=entertainment/pop-song',
                    image: 'http://127.0.0.1:8000/media/news_image/yna2021-02-03-20-444.jpg',
                    date: '2021-02-03T14:11:00',
                },
                {
                    title: '[영상] \'미스트롯2\' 불공정 의혹 부인…"근거없는 사실과 억측 유감"',
                    link: 'https://www.yna.co.kr/view/AKR20210203084900704?section=entertainment/pop-song',
                    image: 'http://127.0.0.1:8000/media/news_image/yna2021-02-03-20-445.jpg',
                    date: '2021-02-03T12:02:00',
                },
            ],
            newsTime: moment().format('HH:mm'),
        };
    }

    setBoardType = (e) => {
        this.setState({ hotboardType: e.target.id });
    };

    hotPostRender = (postList) => {
        let rows = [];
        //3개씩 한줄에 넣기
        if (postList.length < 3) {
            let cols = [];
            for (let col = 0; col < postList.length; col++) {
                let post = postList[col];
                cols.push(
                    <Link
                        className="home__item--hotpost"
                        to={`/luna/${post.board_url.board_url}/${post.id}`}
                        key={post.id}
                    >
                        <p>{post.title}</p>
                        <img
                            src="https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png"
                            alt="post"
                        />
                    </Link>
                );
            }
            rows.push(<div className="home__row--hotpost">{cols}</div>);
        } else {
            for (let row = 0; row < 2; row++) {
                let cols = [];
                for (let col = 0; row * 3 + col < postList.length && col < 3; col++) {
                    let post = postList[row * 3 + col];
                    cols.push(
                        <Link
                            className="home__item--hotpost"
                            to={`/luna/${post.board_url.board_url}/${post.id}`}
                            key={post.id}
                        >
                            <p>{post.title}</p>
                            <img
                                src="https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png"
                                alt="post"
                            />
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

    newsRender = (newsList) => {
        let result = [];
        //5개 단위로 나누기
        let tmp = [];
        for (let i = 0; i < newsList.length; i++) {
            const news = newsList[i];
            tmp.push(
                <a href={news.link} target="_blank" rel="noreferrer" key={i} className="home__item--news">
                    <img src={news.image} alt="news" />
                    <div>
                        <h6>{news.title}</h6>
                        <p>{news.date}</p>
                    </div>
                </a>
            );
            if ((i + 1) % 5 === 0) {
                //5개 담았을 때
                result.push(
                    <div key={i} className="home__container--news">
                        {tmp}
                    </div>
                );
                tmp = [];
            }
        }
        return result;
    };
    render() {
        return (
            <div className="home">
                <BasicSlider autoplay speed={5000} infinite background="#dadada">
                    {this.state.voteList.map((vote) => {
                        return <VoteItem key={vote.id} id={vote.id} title={vote.title} item={vote.voteitem} />;
                    })}
                </BasicSlider>
                <section className="home__section--favboard">
                    <h4>즐겨찾는 게시판</h4>
                    {this.state.favBoard ? (
                        this.state.favBoard.map((board) => {
                            return (
                                <Link key={board.board_url} to={board.board_url}>
                                    {board.board_name}
                                </Link>
                            );
                        })
                    ) : (
                        <p>게시판 상단의 ☆을 눌러 즐겨찾는 게시판으로 설정해보세요!</p>
                    )}
                </section>
                <div className="border_line not-pc" />
                <section className="home__section--hot">
                    <div className="home__row--hot">
                        <h4>HOT 실시간 인기글</h4>
                        <div className="home__box--hot-type">
                            <button
                                id="all"
                                onClick={this.setBoardType}
                                className={this.state.hotboardType === 'all' ? 'active' : ''}
                            >
                                전체
                            </button>
                            <button
                                id="luna"
                                onClick={this.setBoardType}
                                className={this.state.hotboardType === 'luna' ? 'active' : ''}
                            >
                                루나
                            </button>
                            <button
                                id="free"
                                onClick={this.setBoardType}
                                className={this.state.hotboardType === 'free' ? 'active' : ''}
                            >
                                자유
                            </button>
                        </div>
                    </div>
                    <div className="only-pc">
                        <div className="home__container--hot">
                            {this.state.hotPostList.map((post, index) => {
                                return (
                                    <Link to={`/luna/${post.board_url.board_url}/${post.id}`} key={post.id}>
                                        <div className="home__item--hotpost--pc">
                                            <div>
                                                <img
                                                    src="https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png"
                                                    alt="post"
                                                />
                                            </div>
                                            <div>
                                                <h3>0{index + 1}</h3>
                                                <h6>{post.title}</h6>
                                                <p className="home--hot--detail">
                                                    <span>조회수 {post.views}</span>
                                                    <span>{post.created_at}</span>
                                                    <span>추천 {post.recommend_count}</span>
                                                </p>
                                                <p className="home--hot--contents">
                                                    게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글
                                                    내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글
                                                    내용게시글 내용게시글 내용게시글 내용게시글 내용게시글 내용게시글
                                                    내용게시글 내용게시글 내용
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                    <div className="not-pc">
                        <div className="home__container--hot">{this.hotPostRender(this.state.hotPostList)}</div>
                    </div>
                </section>
                <div className="border_line not-pc" />
                <section className="home__section--news">
                    <div className="home__row--news">
                        <h4>
                            실시간 연예뉴스
                            <span className="not-pc">
                                <button>
                                    <img src={refreshIcon} alt="refresh" />
                                    {this.state.newsTime}업데이트
                                </button>
                            </span>
                        </h4>
                        <div>
                            <span className="only-pc">
                                <button>
                                    <img src={refreshIcon} alt="refresh" />
                                    {this.state.newsTime}업데이트
                                </button>
                            </span>
                            <span>
                                <Link to="/article">더보기 &gt;</Link>
                            </span>
                        </div>
                    </div>
                    <div className="only-pc">
                        <div className="home__container--news">
                            {this.state.newsList.map((news, index) => {
                                return (
                                    <a
                                        href={news.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        key={index}
                                        className="home__item--news"
                                    >
                                        <img src={news.image} alt="news" />
                                        <div>
                                            <h6>{news.title}</h6>
                                            <p>{news.date}</p>
                                        </div>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </section>
                <div className="not-pc home__slider--news">
                    <BasicSlider>{this.newsRender(this.state.newsList)}</BasicSlider>
                </div>
            </div>
        );
    }
}

export default Home;
