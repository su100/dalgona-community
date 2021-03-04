import React, { Component } from 'react';
import CommentList from 'components/common/comment/CommentList';
import View from 'components/common/View';
import './NoticePost.scss';

class NoticePost extends Component {
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
            <div className="noticepost">
                <View link={`notice`} />
                <CommentList commentList={this.state.commentList} isRecommend />
            </div>
        );
    }
}

export default NoticePost;
