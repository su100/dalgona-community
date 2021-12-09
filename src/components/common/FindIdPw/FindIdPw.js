import React, { Component } from 'react';
import { validateEmail } from 'lib/api';
import Modal from 'components/common/Modal';

import './FindIdPw.scss';

class FindIdPw extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'email',
      email: '',
      username: '',
      isModal: false,
      modalType: '',
      modalMessage: '',
    };
  }

  handleType = (e) => {
    this.setState({ type: e.target.value });
  };

  handleInput = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onClickCertification = (e) => {
    const { sendEmailForId, sendEmailForPw, idpw } = this.props;
    const { username, email } = this.state;

    if (!validateEmail(email)) {
      this.setState({ isModal: true, modalType: 'alert', modalMessage: '올바른 이메일 형식을 입력해주세요.' });
    } else if (idpw === 'id') {
      sendEmailForId(email);
      this.setState({ [e.target.id]: '' });
    } else if (idpw === 'pw' && username === '') {
      this.setState({ isModal: true, modalType: 'alert', modalMessage: '아이디를 입력해주세요' });
    } else {
      sendEmailForPw(username, email);
    }
  };

  handleCheck = () => {
    /* 가맹점 식별코드 */
    const userCode = 'imp87136066';
    const { IMP } = window;
    const { goNextStage, setImpUid, findIdByImpUid, idpw } = this.props;

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
          if (idpw === 'id') {
            findIdByImpUid(rsp.imp_uid);
          } else if (idpw === 'pw') {
            setImpUid(rsp.imp_uid);
            goNextStage();
          }
          // 성공할 시 userConfirm 바꾸고 비번 바꾸는 창으로 이동
        } else {
          // 본인 인증 실패 시 로직,
          this.setState({
            isModal: true,
            modalType: 'alert',
            modalMessage: `인증에 실패하였습니다. 에러: ${rsp.error_msg}`,
          });
        }
      }
    );
  };

  goNext = () => {
    const { goNextStage, idpw } = this.props;
    const { type } = this.state;
    if (type === 'email') {
      goNextStage();
    } else if (idpw === 'id' || idpw === 'pw') {
      this.handleCheck();
    }
  };

  closeModal = () => {
    // isModal, modalType, modalMessage 초기화
    this.setState({ isModal: false, modalType: '', modalMessage: '' });
  };

  render() {
    const { idpw } = this.props;
    const { type, email, username, isModal, modalType, modalMessage } = this.state;
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
              </div>
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
        <button
          className="find-id-pw__button--submit"
          onClick={type === 'email' ? this.onClickCertification : this.goNext}
        >
          확인
        </button>

        {isModal && <Modal type={modalType} message={modalMessage} closeModal={this.closeModal} />}
      </div>
    );
  }
}

export default FindIdPw;
