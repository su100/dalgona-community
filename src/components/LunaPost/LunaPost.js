import React, { Component } from 'react';
import CommentList from 'components/common/comment/CommentList';
import heart from 'images/heart.png';
import './LunaPost.scss';

class LunaPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            postList: [],
            commentList: [
                {
                    id: 1,
                    userImg: null,
                    username: '닉네임',
                    time: '03:13',
                    recommend: 3,
                    contents:
                        '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 ',
                    isAuthor: true,
                    isRecommended: false,
                },
                {
                    id: 2,
                    userImg: null,
                    username: '닉네임2',
                    time: '03:13',
                    recommend: 3,
                    contents: '댓글 내용',
                    isAuthor: false,
                    isRecommended: true,
                    image:
                        'https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png',
                },
                {
                    id: 3,
                    userImg: null,
                    username: '닉네임3',
                    time: '03:13',
                    recommend: 3,
                    contents: '댓글 내용',
                    isAuthor: false,
                    isRecommended: false,
                    reCommentList: [
                        {
                            id: 1,
                            userImg: null,
                            username: '대댓단사람1',
                            time: '03:13',
                            recommend: 3,
                            contents: '대댓글 내용',
                            isAuthor: false,
                            isRecommended: false,
                            image:
                                'https://programmers.co.kr/assets/bi-symbol-light-49a242793b7a8b540cfc3489b918e3bb2a6724f1641572c14c575265d7aeea38.png',
                        },
                        {
                            id: 2,
                            userImg: null,
                            username: '대댓사람2',
                            time: '03:13',
                            recommend: 3,
                            contents:
                                '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 ',
                            isAuthor: true,
                            isRecommended: true,
                        },
                    ],
                },
            ],
        };
    }

    render() {
        return (
            <div className="lunapost">
                <div className="lunapost__detail">
                    <span>
                        홈{'>'}루나{'>'}비투비
                    </span>
                </div>
                <div className="lunapost__title">
                    <span> 제목을 써주세요.</span>
                </div>
                <div className="lunapost__info">
                    <span>닉네임</span>
                    <span>02/01 21:01</span>
                    <span>조회수 100</span>
                </div>
                <div className="lunapost__content"></div>
                <div className="lunapost__post">
                    <span>글르르르ㅡ르르</span>
                </div>
                <div className="only-pc">
                    <div className="lunapost__postcount">
                        <div className="lunapost__postcount-recommend">
                            <span>추천</span>
                            <span>123</span>
                        </div>
                        <div className="lunapost__postcount-reply">
                            <span>댓글</span>
                            <span>123</span>
                        </div>
                    </div>
                </div>
                <div className="not-pc">
                    <div className="lunapost__postcount">
                        <img src={heart}></img>
                        <span>추천 6</span>
                    </div>
                </div>
                <CommentList commentList={this.state.commentList} isRecommend />
            </div>
        );
    }
}

export default LunaPost;
