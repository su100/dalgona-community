import React, { Component } from 'react';
import CommentList from 'components/common/comment/CommentList';
import heart from 'images/heart.png';
import './View.scss';

class View extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="view">
                <div className="view__detail">
                    <span>
                        홈{'>'}루나{'>'}비투비
                    </span>
                </div>
                <div className="view__title">
                    <span> 제목을 써주세요.</span>
                </div>
                <div className="view__info">
                    <span>닉네임</span>
                    <span>02/01 21:01</span>
                    <span>조회수 100</span>
                </div>
                <div className="view__content"></div>
                <div className="view__post">
                    <span>글르르르ㅡ르르</span>
                </div>
                <div className="only-pc">
                    <div className="view__postcount">
                        <div className="view__postcount-recommend">
                            <span>추천</span>
                            <span>123</span>
                        </div>
                        <div className="view__postcount-reply">
                            <span>댓글</span>
                            <span>123</span>
                        </div>
                    </div>
                </div>
                <div className="not-pc">
                    <div className="view__postcount">
                        <img src={heart}></img>
                        <span>추천 6</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default View;
