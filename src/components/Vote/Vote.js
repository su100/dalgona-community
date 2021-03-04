import React, { Component } from 'react';
import CommentList from 'components/common/comment/CommentList';
import VoteModal from 'components/common/VoteModal';
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
        return (
            <div className="vote">
                <div className="vote__detail">
                    <span>
                        홈 {'>'} 이슈 {'>'} 투표
                    </span>
                </div>
                <div className="vote__info">
                    <span className="vote__info-date">2021/01/01 12:00 ~ 2021/01/10 23:00</span>
                    <div className="vote__info-maininfo">
                        <span className="vote__info-maininfo-title">투표제목을 써주세요</span>
                        <div className="vote__info-maininfo-count">D-2</div>
                    </div>
                </div>
                <div className="vote__main">
                    <div className="vote__main__content">
                        {showModal && <VoteModal voteDuplicate={selectVote} handleShowModal={this.handleShowModal} />}
                        <div className="vote__main__content-first" onClick={this.onClickVote} id="first">
                            <div className="vote__main__content-first-circle"></div>
                            <span className="vote__main__content-first-title">LUNA</span>
                            <span className="vote__main__content-first-description">LUNALUNALUNALUNA</span>
                        </div>
                        <div className="vote__main__content-area">
                            <div className="only-pc">
                                <div className="vote__main__content-area-vs">
                                    <span>vs</span>
                                </div>
                            </div>
                            <div className="not-pc">
                                <div className="vote__main__content-area-vs">
                                    <span>현재 184표 차이</span>
                                </div>
                            </div>
                        </div>
                        <div className="vote__main__content-second" onClick={this.onClickVote} id="second">
                            <div className="vote__main__content-second-circle"></div>
                            <span className="vote__main__content-second-title">LUNA</span>
                            <span className="vote__main__content-second-description">LUNALUNALUNALUNA</span>
                        </div>
                    </div>
                    <div className="not-pc">
                        <div className="vote__main-description">
                            설면ㄴㅇ리ㅏㄴ어라ㅣㅇ너ㅏㅣㄴ어ㅣㅏㅇ너ㅣ나ㅓ라ㅣㅇ너라ㅣㄴ얼
                        </div>
                    </div>
                    <div className="vote__main-ratio">
                        <div className="vote__main-ratio left"></div>
                        <div className="vote__main-ratio right"></div>
                    </div>
                    <div className="only-pc">
                        <div className="vote__main-description">
                            설면ㄴㅇ리ㅏㄴ어라ㅣㅇ너ㅏㅣㄴ어ㅣㅏㅇ너ㅣ나ㅓ라ㅣㅇ너라ㅣㄴ얼
                        </div>
                    </div>
                </div>
                <div className="vote__comment"></div>
                <CommentList vote={true} commentList={this.state.commentList} isRecommend />
            </div>
        );
    }
}

export default Vote;
