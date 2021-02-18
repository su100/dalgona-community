import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import step4 from 'images/step4.png';
import './SignUpConfirm.scss';

const SignUpFinish = () => {
    return (
        <div className="signupfinish">
            <div className="signupfinish__title">
                <span>04 </span>
                <span>가입완료</span>
            </div>
            <img src={step4}></img>
            <div className="signupfinish__content">
                <span>회원가입이 완료되었습니다.</span>
            </div>
        </div>
    );
};

export default SignUpFinish;
