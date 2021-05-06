import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import FindIdPw from 'components/common/FindIdPw';
import './FindPw.scss';

class FindPw extends Component {
  constructor(props) {
    super(props);
    this.state = { stage: 1, pw1: '', pw2: '', imp_uid: '' };
  }

  goNextStage = () => {
    this.setState({ stage: 2 });
  };

  handlePw = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  setImpUid = (imp_uid) => {
    this.setState({ imp_uid });
  };

  pwCheck = () => {
    // input 값 일치하는지 체크
    const { history, accountFind, accountFindSuccess } = this.props;
    const { pw1, pw2, imp_uid } = this.state;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
    if (pw1 !== pw2) {
      alert('비밀번호가 일치하지 않습니다.');
    } else if (!passwordRegex.test(pw1)) {
      // 첫번째 input 조건 체크 영문자, 숫자, 특수문자 조합 8-20
      alert('비밀번호 형식을 다시 확인해주세요');
    } else {
      const formData = new FormData();
      formData.append('imp_uid', imp_uid);
      formData.append('new_password', pw2);
      accountFind(formData);
      if (accountFindSuccess) {
        history.push('/login');
      }
    }
  };

  render() {
    const { sendEmailForPw, accountFindSuccess } = this.props;
    const { stage, pw1, pw2 } = this.state;
    return (
      <div className="find-pw">
        <h2>아이디 비밀번호 찾기</h2>
        <div className="find-id-pw__tab">
          <Link to="/find/id">아이디 찾기</Link>
          <Link to="/find/pw" className="active">
            비밀번호 찾기
          </Link>
        </div>
        {stage === 1 ? (
          <FindIdPw
            idpw="pw"
            goNextStage={this.goNextStage}
            sendEmailForPw={sendEmailForPw}
            setImpUid={this.setImpUid}
          />
        ) : (
          <div className="find-pw--next">
            <p>비밀번호 변경</p>
            <input
              type="password"
              id="pw1"
              value={pw1}
              onChange={this.handlePw}
              placeholder="영문자, 숫자, 특수문자 조합 8-20자"
            />
            <input type="password" id="pw2" value={pw2} onChange={this.handlePw} placeholder="새 비밀번호 확인" />
            <button type="button" className="find-pw__button--finish" onClick={this.pwCheck}>
              확인
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default FindPw;
