import React, { Component } from 'react';
import CommentList from 'components/common/comment/CommentList';
import heart from 'images/heart.png';
import './View.scss';

class View extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { link } = this.props;
        return (
            <div className="view">
                <div className="view__detail">
                    <span>
                        홈{'>'}
                        {link === `notice` ? `달고나>공지사항` : `루나>비투비`}
                    </span>
                </div>
                <div className="view__title">
                    <span> 제목을 써주세요.</span>
                </div>
                <div className="view__info">
                    <div className="only-pc">
                        <span>닉네임</span>
                        <span>02/01 21:01</span>
                        <span>조회수 100</span>
                    </div>
                    <span className="not-pc">조회수 100 | 21:20 | 추천 50</span>
                </div>
                <div className="view__content"></div>
                <div className="view__post">
                    <span>TESTSTESTESTESTESTSE</span>
                </div>
            </div>
        );
    }
}

export default View;
