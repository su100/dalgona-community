import React from 'react';
import { Link } from 'react-router-dom';
import step4 from 'images/step4.png';
import biglogo from 'images/biglogo.png';
import './SignUpFinish.scss';

const SignUpFinish = () => (
  <div className="signupfinish">
    <div className="only-pc">
      <div className="signupfinish__title">
        <span className="only-pc">가입완료!</span>
      </div>
      <div className="signupfinish__img">
        <img className="signup-step" src={step4} alt="" />
      </div>
      <div className="signupfinish__img">
        <img src={biglogo} alt="" />
      </div>
      <div className="signupfinish__description">
        <span>달고나에 오신걸 환영합니다!</span>
        <br />
        <span>루나의 세계로 당신을 초대할게요</span>
      </div>
      <div className="signupfinish__button">
        <div className="signupfinish__button button">
          <Link to="/">홈으로 이동</Link>
        </div>
      </div>
    </div>
    <div className="not-pc">
      <div className="signupfinish__title">
        <span>04 </span>
        <span>가입완료</span>
      </div>
      <div className="signupfinish__img">
        <img className="signup-step" src={step4} alt="" />
      </div>
      <div className="signupfinish__content">
        <span>회원가입이 완료되었습니다.</span>
      </div>
    </div>
  </div>
);

export default SignUpFinish;
