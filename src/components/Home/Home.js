import React, { Component } from 'react';
import PostList from 'components/common/PostList';
import CommentInput from 'components/common/comment/CommentInput';
import CommentList from 'components/common/comment/CommentList';
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
            isAnonymous: false,
            commentText: '',
            commentImg: null,
            previewURL: '',
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
                        },
                        {
                            id: 2,
                            userImg: null,
                            username: '대댓사람2',
                            time: '03:13',
                            recommend: 3,
                            contents:
                                '댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 댓글 내용 ',
                            isAuthor: false,
                            isRecommended: true,
                        },
                    ],
                },
            ],
        };
    }
    handleComment = (e) => {
        this.setState({ commentText: e.target.value });
    };

    handleAnonymous = (e) => {
        this.setState({ isAnonymous: e.target.checked });
    };

    setImage = (file) => {
        this.setState({ commentImg: file });
    };
    setPreview = (url) => {
        this.setState({ previewURL: url });
    };

    deleteImg = () => {
        this.setState({ commentImg: null, previewURL: '' });
    };

    render() {
        return (
            <div className="home">
                <PostList postList={this.state.postList} />
                <CommentInput
                    handleAnonymous={this.handleAnonymous}
                    isAnonymous={this.state.isAnonymous}
                    handleComment={this.handleComment}
                    commentText={this.state.commentText}
                    setImage={this.setImage}
                    setPreview={this.setPreview}
                    commentImg={this.state.commentImg}
                    previewURL={this.state.previewURL}
                    deleteImg={this.deleteImg}
                />

                <CommentList commentList={this.state.commentList} isRecommend />

                <CommentInput
                    handleAnonymous={this.handleAnonymous}
                    isAnonymous={this.state.isAnonymous}
                    handleComment={this.handleComment}
                    commentText={this.state.commentText}
                    setImage={this.setImage}
                    setPreview={this.setPreview}
                    commentImg={this.state.commentImg}
                    previewURL={this.state.previewURL}
                    deleteImg={this.deleteImg}
                />
            </div>
        );
    }
}

export default Home;
