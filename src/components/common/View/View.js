import React, { Component } from 'react';
import CommentList from 'components/common/comment/CommentList';
import heart from 'images/heart.png';
import moment from 'moment';
import Editor from 'components/common/Editor';
import './View.scss';

class View extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { link, postInfo, type } = this.props;
        console.log(postInfo);
        const { location } = this.props;
        const path = location.pathname.split('/');
        return (
            <div className="view">
                <div className="view__detail">
                    <span>
                        홈{'>'}
                        {type === `luna` && `루나>${path[2]}`}
                        {type === `free` && `자유>${path[2]}`}
                        {type === `notice` && `달고나>공지사항`}
                        {type === `event` && `달고나>이벤트`}
                    </span>
                </div>
                <div className="view__title">
                    <span>{postInfo.title}</span>
                </div>
                <div className="view__info">
                    <div className="only-pc">
                        <span>{!postInfo.anonymous && postInfo.author && postInfo.author.nickname}</span>
                        <span>{moment(postInfo.created_at).format('YYYY/MM/DD HH:MM')}</span>
                        <span>조회수 {postInfo.views}</span>
                    </div>
                    <span className="not-pc">조회수 {postInfo.views} | 21:20 | 추천 50</span>
                </div>
                <div className="view__post">
                    <Editor readOnly contents={postInfo.body} />
                </div>
            </div>
        );
    }
}

export default View;
