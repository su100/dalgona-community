import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import step2 from 'images/step2.png';
import './SignUpConfirm.scss';

const SignUpConfirm = () => {
    return (
        <div className="signupconfirm">
            <div className="signupconfirm__title">
                <span>02 </span>
                <span>본인확인</span>
            </div>
            <img src={step2}></img>
            <div className="signupconfirm__content">
                <span>회원가입을 위하여</span>
                <span className="signupconfirm__content tablet">고객님 명의의 휴대전화로 본인인증이 필요합니다.</span>
                <span className="signupconfirm__content mobile">고객님 명의의 휴대전화로</span>
                <span className="signupconfirm__content mobile">본인인증이 필요합니다.</span>
            </div>
        </div>
    );
};

export default SignUpConfirm;
