import React, { Component } from 'react';
import { validateEmail } from 'lib/api';

import './FindIdPw.scss';

class FindIdPw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'email',
      email: '',
      certification: '',
      username: '',
    };
  }

  handleType = (e) => {
    this.setState({ type: e.target.value });
  };

  handleInput = (e) => {
    console.log(e.target.value);
    this.setState({ [e.target.id]: e.target.value });
  };

  onClickCertification = () => {
    const { sendEmailForId, sendEmailForPw, idpw } = this.props;
    const { username, email } = this.state;

    if (!validateEmail(email)) {
      alert('올바른 이메일 형식을 입력해주세요.');
    } else if (idpw === 'id') {
      sendEmailForId(email);
    } else if (idpw === 'pw' && username === '') {
      alert('아이디를 입력해주세요');
    } else {
      sendEmailForPw(username, email);
    }
  };

  handleCheck = () => {
    /* 가맹점 식별코드 */
    const userCode = 'imp87136066';
    const { IMP } = window;
    const { goNextStage, setImpUid } = this.props;

    IMP.init(userCode);
    // IMP.certification(param, callback) 호출
    IMP.certification(
      {
        min_age: 14, // 만 14세이상
      },
      (rsp) => {
        // callback
        if (rsp.success) {
          // 본인인증 성공여부
          setImpUid(rsp.imp_uid);
          goNextStage();
          // 성공할 시 userConfirm 바꾸고 비번 바꾸는 창으로 이동
        } else {
          // 본인 인증 실패 시 로직,
          alert(`인증에 실패하였습니다. 에러: ${rsp.error_msg}`);
        }
      }
    );
  };

  goNext = () => {
    const { goNextStage, idpw } = this.props;
    const { type } = this.state;
    console.log(this.props);
    console.log(this.state);
    if (type === 'email') {
      console.log('인증 검사하기');
      console.log('인증된 경우 stage 다음으로');
      goNextStage();
    } else if (idpw === 'pw') {
      console.log('본인인증 modal 띄우기');
      console.log('본인인증 완료시 stage 다음으로');
      this.handleCheck();
    }
  };

  render() {
    const { idpw } = this.props;
    const { type, email, certification, username } = this.state;
    return (
      <div className="find-id-pw">
        <div className="find-id-pw__tab--method">
          <label htmlFor="email" className={type === 'email' ? 'find-id-pw__label active' : 'find-id-pw__label'}>
            <input
              type="radio"
              id="email"
              name="type"
              value="email"
              checked={type === 'email'}
              onChange={this.handleType}
            />
            이메일로 찾기
          </label>
          <label htmlFor="phone" className={type === 'phone' ? 'find-id-pw__label active' : 'find-id-pw__label'}>
            <input
              type="radio"
              id="phone"
              name="type"
              value="phone"
              checked={type === 'phone'}
              onChange={this.handleType}
            />
            본인인증으로 찾기
          </label>
        </div>
        <div className="find-id-pw__box">
          {type === 'email' && idpw === 'pw' && (
            <div className="find-id-pw__input">
              <input
                type="text"
                placeholder="아이디를 입력해주세요."
                id="username"
                value={username}
                onChange={this.handleInput}
              />
              <button className="username">인증</button>
            </div>
          )}
          {type === 'email' ? (
            <>
              <div className="find-id-pw__input">
                <input
                  type="text"
                  placeholder="이메일을 입력해주세요."
                  id="email"
                  value={email}
                  onChange={this.handleInput}
                />
                <button onClick={this.onClickCertification}>인증</button>
              </div>
              {idpw === 'pw' && (
                <div className="find-id-pw__input">
                  <input
                    type="text"
                    placeholder="인증번호를 입력해주세요."
                    id="certification"
                    value={certification}
                    onChange={this.handleInput}
                  />
                  <button>인증</button>
                </div>
              )}
            </>
          ) : (
            <p>
              {idpw === 'id' ? '아이디' : '비밀번호'}
              를 찾기 위해
              <br />
              고객님 명의의 휴대전화로
              <br />
              본인인증이 필요합니다.
            </p>
          )}
        </div>
        <button className="find-id-pw__button--submit" onClick={this.goNext}>
          확인
        </button>
      </div>
    );
  }
}

export default FindIdPw;
