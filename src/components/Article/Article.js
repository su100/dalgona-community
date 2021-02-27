import React, { Component } from 'react';
import ArticleList from 'components/common/ArticleList';
import Pagination from 'components/common/Pagination';
import './Article.scss';

class Article extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchWord: '',
            keywordList: [{ word: '키워드' }, { word: '키워드' }, { word: '키워드' }, { word: '키워드' }],
            page: 1,
            articleCount: 23,
            articleList: [
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
        };
    }

    handlePage = (e) => {
        this.setState({ page: e.target.value });
    };

    searchKeyword = (e) => {
        const word = e.target.value;
        this.setState({ searchWord: word });
        console.log(word, '로 검색한 리스트 가져오기');
    };

    render() {
        return (
            <div className="article">
                <div>헤더</div>
                <div className="border_line" />
                <div className="article__keyword">
                    <h4>인기키워드</h4>
                    {this.state.keywordList.map((keyword, index) => {
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
                <ArticleList articleList={this.state.articleList} />
                <Pagination
                    countList={this.state.articleCount}
                    handlePage={this.handlePage}
                    currentPage={this.state.page}
                />
            </div>
        );
    }
}

export default Article;
