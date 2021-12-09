import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import FindIdPw from 'components/common/FindIdPw';
import Modal from 'components/common/Modal';
import './FindPw.scss';

class FindPw extends Component {
  constructor(props) {
    super(props);
    this.state = { stage: 1, pw1: '', pw2: '', imp_uid: '', isModal: false, modalType: '', modalMessage: '' };
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
    const { accountFind, resetPassWordEmail, pathname } = this.props;
    const { pw1, pw2, imp_uid } = this.state;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;
    const path = pathname.split('/');

    if (pw1 !== pw2) {
      this.setState({ isModal: true, modalType: 'alert', modalMessage: '비밀번호가 일치하지 않습니다.' });
    } else if (!passwordRegex.test(pw1)) {
      // 첫번째 input 조건 체크 영문자, 숫자, 특수문자 조합 8-20
      this.setState({ isModal: true, modalType: 'alert', modalMessage: '비밀번호 형식을 다시 확인해주세요' });
    } else if (path[1] === 'find') {
      const formData = new FormData();
      formData.append('imp_uid', imp_uid);
      formData.append('new_password', pw2);
      accountFind(formData);
    } else {
      const formData = new FormData();
      formData.append('new_password1', pw1);
      formData.append('new_password2', pw2);
      formData.append('uid', path[2]);
      formData.append('token', path[3]);
      resetPassWordEmail(path[2], path[3], formData);
    }
  };

  closeModal = () => {
    // isModal, modalType, modalMessage 초기화
    this.setState({ isModal: false, modalType: '', modalMessage: '' });
  };

  render() {
    const { sendEmailForPw, pathname } = this.props;
    const { stage, pw1, pw2, isModal, modalType, modalMessage } = this.state;
    const path = pathname.split('/');

    return (
      <div className="find-pw">
        <h2>아이디 비밀번호 찾기</h2>
        <div className="find-id-pw__tab">
          <Link to="/find/id">아이디 찾기</Link>
          <Link to="/find/pw" className="active">
            비밀번호 찾기
          </Link>
        </div>
        {stage === 1 && path[1] === 'find' ? (
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

        {isModal && <Modal type={modalType} message={modalMessage} closeModal={this.closeModal} />}
      </div>
    );
  }
}

export default FindPw;
