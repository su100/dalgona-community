import React, { Component } from 'react';
import PostList from 'components/common/PostList';
import './Home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: [
                {
                    title: '제목입니다',
                    views: 33,
                    date: '02/15',
                    recommends: 3,
                    comments: 2,
                },
                {
                    title: '제목입니다',
                    views: 33,
                    date: '02/15',
                    recommends: 3,
                    comments: 2,
                    image:
                        'https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png',
                },
                {
                    title: '제목입니다',
                    views: 33,
                    date: '02/15',
                    recommends: 3,
                    comments: 2,
                    image:
                        'https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png',
                },
                {
                    title: '제목입니다',
                    views: 33,
                    date: '02/15',
                    recommends: 3,
                    comments: 2,
                    image:
                        'https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png',
                },
                {
                    title: '제목입니다',
                    views: 33,
                    date: '02/15',
                    recommends: 3,
                    comments: 2,
                    image:
                        'https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png',
                },
                {
                    title: '제목입니다',
                    views: 33,
                    date: '02/15',
                    recommends: 3,
                    comments: 2,
                    image:
                        'https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png',
                },
                {
                    title: '제목입니다',
                    views: 33,
                    date: '02/15',
                    recommends: 3,
                    comments: 2,
                    image:
                        'https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png',
                },
            ],
        };
    }

    render() {
        return (
            <div className="home">
                <PostList postList={this.state.postList} />
            </div>
        );
    }
}

export default Home;
