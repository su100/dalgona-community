import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import step2 from 'images/step2.png';
import './SignUpConfirm.scss';

const SignUpConfirm = () => {
    return (
        <div className="signupconfirm">
            <div className="signupconfirm__title">
                <span className="not-pc">02 </span>
                <span className="not-pc">본인확인</span>
                <span className="only-pc">본인인증</span>
            </div>
            <div className="not-pc">
                <img src={step2}></img>
            </div>
            <div className="signupconfirm__content">
                <div className="not-pc">
                    <span>회원가입을 위하여</span>
                    <span className="signupconfirm__content tablet">
                        고객님 명의의 휴대전화로 본인인증이 필요합니다.
                    </span>
                    <span className="signupconfirm__content mobile">고객님 명의의 휴대전화로</span>
                    <span className="signupconfirm__content mobile">본인인증이 필요합니다.</span>
                </div>
                <div className="only-pc">
                    <button>휴대폰으로 본인확인 하기</button>
                </div>
            </div>
        </div>
    );
};

export default SignUpConfirm;
