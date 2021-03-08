import React, { Component } from 'react';
import CommentList from 'components/common/comment/CommentList';
import VoteModal from 'components/common/VoteModal';
import moment from 'moment';
import './Vote.scss';

class Vote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            vote: [],
            selectVote: '',
            showModal: false,
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

    onClickVote = (e) => {
        this.setState({ selectVote: e.target.id });
        this.handleShowModal();
    };

    handleShowModal = (e) => {
        const { showModal } = this.state;
        this.setState({ showModal: !showModal });
    };

    render() {
        const { showModal, selectVote } = this.state;
        const { voteInfo } = this.props;
        console.log(voteInfo);
        return (
            <div className="vote">
                <div className="vote__detail">
                    <span>
                        홈 {'>'} 이슈 {'>'} 투표
                    </span>
                </div>
                <div className="vote__info">
                    <span className="vote__info-date">
                        {moment(voteInfo.start_datetime).format('YYYY/MM/DD HH:MM')}
                        {'~'}
                        {moment(voteInfo.end_datetime).format('YYYY/MM/DD HH:MM')}
                    </span>
                    <div className="vote__info-maininfo">
                        <span className="vote__info-maininfo-title">{voteInfo.title}</span>
                        <div className="vote__info-maininfo-count">D-{voteInfo.deadline}</div>
                    </div>
                </div>
                <div className="vote__main">
                    <div className="vote__main__content">
                        {showModal && <VoteModal voteDuplicate={selectVote} handleShowModal={this.handleShowModal} />}
                        <div className="vote__main__content-first" onClick={this.onClickVote} id="first">
                            <div className="vote__main__content-first-circle"></div>
                            <span className="vote__main__content-first-title">{voteInfo.voteitem[0].item_name}</span>
                            <span className="vote__main__content-first-description">
                                {voteInfo.voteitem[0].item_content}
                            </span>
                        </div>
                        <div className="vote__main__content-area">
                            <div className="only-pc">
                                <div className="vote__main__content-area-vs">
                                    <span>vs</span>
                                </div>
                            </div>
                            <div className="not-pc">
                                <div className="vote__main__content-area-vs">
                                    <span>현재 {voteInfo.vote_count}표 차이</span>
                                </div>
                            </div>
                        </div>
                        <div className="vote__main__content-second" onClick={this.onClickVote} id="second">
                            <div className="vote__main__content-second-circle"></div>
                            <span className="vote__main__content-second-title">{voteInfo.voteitem[1].item_name}</span>
                            <span className="vote__main__content-second-description">
                                {voteInfo.voteitem[1].item_content}
                            </span>
                        </div>
                    </div>
                    <div className="not-pc">
                        <div className="vote__main-description">{voteInfo.content}</div>
                    </div>
                    <div className="vote__main-ratio">
                        <div className="vote__main-ratio left"></div>
                        <div className="vote__main-ratio right"></div>
                    </div>
                    <div className="only-pc">
                        <div className="vote__main-description">{voteInfo.content}</div>
                    </div>
                </div>
                <div className="vote__comment"></div>
                <CommentList vote={true} commentList={this.state.commentList} isRecommend />
            </div>
        );
    }
}

export default Vote;
