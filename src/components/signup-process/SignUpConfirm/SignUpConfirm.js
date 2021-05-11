import React from 'react';
import step2 from 'images/step2.png';
import './SignUpConfirm.scss';

const SignUpConfirm = ({ handleCheck }) => (
  <div className="signupconfirm">
    <div className="signupconfirm__title">
      <span className="not-pc">02 </span>
      <span className="not-pc">본인확인</span>
      <span className="only-pc">본인인증</span>
    </div>
    <img className="signup-step" src={step2} alt="" />
    <div className="signupconfirm__content">
      회원가입을 위하여
      <br />
      고객님 명의의 휴대전화로
      <div className="br-m" />
      본인인증이 필요합니다.
    </div>
    <button type="button" className="signupconfirm__button" onClick={handleCheck}>
      휴대폰으로 본인확인 하기
    </button>
  </div>
);

export default SignUpConfirm;
