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
        const { voteInfo, voteReplyList } = this.props;
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
                            <span className="vote__main__content-first-title">
                                {voteInfo && voteInfo.voteitem && voteInfo.voteitem[0].item_name}
                            </span>
                            <span className="vote__main__content-first-description">
                                {voteInfo && voteInfo.voteitem && voteInfo.voteitem[0].item_content}
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
                            {voteInfo.board_image === null ? (
                                <div className="vote__main__content-second-circle"></div>
                            ) : (
                                <img src={voteInfo.board_image}></img>
                            )}
                            <span className="vote__main__content-second-title">
                                {voteInfo && voteInfo.voteitem && voteInfo.voteitem[1].item_name}
                            </span>
                            <span className="vote__main__content-second-description">
                                {voteInfo && voteInfo.voteitem && voteInfo.voteitem[1].item_content}
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
                {voteReplyList !== undefined && (
                    <CommentList
                        vote={true}
                        commentList={voteReplyList}
                        voteid={this.props.voteid}
                        postVoteReply={this.props.postVoteReply}
                        updateVoteReply={this.props.updateVoteReply}
                        deleteVoteReply={this.props.deleteVoteReply}
                        postVoteRereply={this.props.postVoteRereply}
                        updateVoteRereply={this.props.updateVoteRereply}
                        deleteVoteRereply={this.props.deleteVoteRereply}
                        replyRecommend={this.props.replyRecommend}
                        reReplyRecommend={this.props.reReplyRecommend}
                        isRecommend
                    />
                )}
            </div>
        );
    }
}

export default Vote;
