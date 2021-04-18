import React, { Component } from 'react';
import SignUpAgree from 'components/signup-process/SignUpAgree';
import SignUpConfirm from 'components/signup-process/SignUpConfirm';
import SignUpInfo from 'components/signup-process/SignUpInfo';
import SignUpFinish from 'components/signup-process/SignUpFinish';

import './SignUp.scss';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 'agree',
      agreeConfirm: false,
      userConfirm: false,
    };
  }

  onClickNext = () => {
    const { history, user_success } = this.props;
    const { currentPage, agreeConfirm, userConfirm } = this.state;
    if (currentPage === 'agree') {
      if (agreeConfirm) this.setState({ currentPage: 'confirm' });
      else alert('동의가 필요합니다');
    } else if (currentPage === 'confirm') {
      // if문으로 본인인증 완료된 상태인지 변수로 판단해
      // 본인인증 완료상태면
      if (userConfirm && user_success) {
        this.setState({ currentPage: 'info' });
      } else {
        // 본인인증 미완료면 비활성화
        alert('본인 인증이 미완료 상태입니다.');
      }
    } else if (currentPage === 'info') {
      this.setState({ currentPage: 'finish' });
    } else {
      history.push('/');
    }
  };

  handleCheck = () => {
    /* 가맹점 식별코드 */
    const userCode = 'imp87136066';
    const { IMP } = window;
    const { checkUser } = this.props;
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
          this.setState({ userConfirm: true });
          // 백엔드로 이미 가입된 사람인지 확인
          checkUser(rsp.imp_uid, this.onClickNext);
        } else {
          // 본인 인증 실패 시 로직,
          alert(`인증에 실패하였습니다. 에러: ${rsp.error_msg}`);
        }
      }
    );
  };

  handleAgreeConfirm = () => {
    const { agreeConfirm } = this.state;
    this.setState({ agreeConfirm: !agreeConfirm });
  };

  render() {
    const { currentPage, agreeConfirm } = this.state;
    const {
      checkedUser,
      userNameUnique,
      emailUnique,
      nicknameUnique,
      setUnique,
      signup_success,
      signUpSuccess,
      signUp,
      checkUser,
      checkUsername,
      checkEmail,
      checkNickname,
    } = this.props;

    return (
      <div className="signup">
        <div className="not-pc signup__title">회원가입</div>
        {currentPage === 'agree' && (
          <SignUpAgree handleAgreeConfirm={this.handleAgreeConfirm} agreeConfirm={agreeConfirm} />
        )}
        {currentPage === 'confirm' && <SignUpConfirm handleCheck={this.handleCheck} checkUser={checkUser} />}
        {currentPage === 'info' && (
          <SignUpInfo
            checkedUser={checkedUser}
            userNameUnique={userNameUnique}
            emailUnique={emailUnique}
            nicknameUnique={nicknameUnique}
            signUp={signUp}
            checkUsername={checkUsername}
            checkEmail={checkEmail}
            checkNickname={checkNickname}
            setUnique={setUnique}
            onClickNext={this.onClickNext}
            signup_success={signup_success}
            signUpSuccess={signUpSuccess}
          />
        )}
        {currentPage === 'finish' && (
          <div>
            <SignUpFinish />
            <div className="not-pc">
              <button type="button" className="signup__button" onClick={this.onClickNext}>
                다음
              </button>
            </div>
          </div>
        )}
        {currentPage !== 'info' && currentPage !== 'finish' && (
          <button type="button" className="signup__button" onClick={this.onClickNext}>
            다음
          </button>
        )}
      </div>
    );
  }
}

export default SignUp;
