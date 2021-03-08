import React, { Component } from 'react';
import CommentList from 'components/common/comment/CommentList';
import heart from 'images/heart.png';
import moment from 'moment';
import './View.scss';

class View extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { link, postInfo, type } = this.props;
        console.log(postInfo);
        return (
            <div className="view">
                <div className="view__detail">
                    <span>
                        홈{'>'}
                        {type === `luna` ? `루나>${postInfo.board_url}` : `달고나>공지사항`}
                    </span>
                </div>
                <div className="view__title">
                    <span>{postInfo.title}</span>
                </div>
                <div className="view__info">
                    <div className="only-pc">
                        <span>{!postInfo.anonymous && postInfo.author && postInfo.author.nickname}</span>
                        <span>{moment(postInfo.created_at).format('YYYY/MM/DD HH:MM')}</span>
                        <span>조회수 100</span>
                    </div>
                    <span className="not-pc">조회수 {postInfo.views} | 21:20 | 추천 50</span>
                </div>
                <div className="view__content"></div>
                <div className="view__post">
                    <span>{postInfo.body}</span>
                </div>
            </div>
        );
    }
}

export default View;
